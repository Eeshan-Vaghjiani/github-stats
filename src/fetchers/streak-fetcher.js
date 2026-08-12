// @ts-check

import { fetchContributionCalendar } from "./contributions.js";

const DAY_IN_MS = 24 * 60 * 60 * 1000;

const toDateString = (date) => new Date(date).toISOString().slice(0, 10);

const previousDate = (date) =>
  toDateString(new Date(`${date}T00:00:00Z`).getTime() - DAY_IN_MS);

const nextDate = (date) =>
  toDateString(new Date(`${date}T00:00:00Z`).getTime() + DAY_IN_MS);

/**
 * Calculates the current and longest consecutive contribution streaks.
 *
 * @param {Array<{date: string, count: number}>} days Calendar days.
 * @param {Date=} now Date used to calculate the current streak.
 * @returns {{currentStreak: number, longestStreak: number, currentStreakStart?: string, currentStreakEnd?: string, longestStreakStart?: string, longestStreakEnd?: string}} Calculated streaks.
 */
const calculateStreaks = (days, now = new Date()) => {
  const sortedDays = [...days].sort((a, b) => a.date.localeCompare(b.date));
  const counts = new Map(sortedDays.map((day) => [day.date, day.count]));

  let longestStreak = 0;
  let longestStreakStart;
  let longestStreakEnd;
  let activeStreak = 0;
  let activeStart;
  let previous;

  for (const day of sortedDays) {
    const isConsecutive = previous && day.date === nextDate(previous);
    if (day.count > 0) {
      if (isConsecutive && activeStreak > 0) {
        activeStreak++;
      } else {
        activeStreak = 1;
        activeStart = day.date;
      }

      if (activeStreak > longestStreak) {
        longestStreak = activeStreak;
        longestStreakStart = activeStart;
        longestStreakEnd = day.date;
      }
    } else {
      activeStreak = 0;
      activeStart = undefined;
    }
    previous = day.date;
  }

  const today = toDateString(now);
  const endsToday = counts.get(today) > 0;
  const currentStreakEnd = endsToday ? today : previousDate(today);
  if (counts.get(currentStreakEnd) <= 0) {
    return {
      longestStreak,
      longestStreakStart,
      longestStreakEnd,
      currentStreak: 0,
    };
  }

  let currentStreak = 0;
  let streakDate = currentStreakEnd;
  while (counts.get(streakDate) > 0) {
    currentStreak++;
    streakDate = previousDate(streakDate);
  }

  return {
    currentStreak,
    longestStreak,
    currentStreakStart: nextDate(streakDate),
    currentStreakEnd,
    longestStreakStart,
    longestStreakEnd,
  };
};

/**
 * Fetch streak statistics for a user.
 *
 * @param {string} username GitHub username.
 * @returns {Promise<object>} Streak data.
 */
const fetchStreak = async (username) => {
  const calendar = await fetchContributionCalendar(username);
  return {
    ...calendar,
    ...calculateStreaks(calendar.days),
  };
};

export { calculateStreaks, fetchStreak };
export default fetchStreak;
