// @ts-check

import { getCardColors, isValidHexColor } from "../common/color.js";

const colorOrFallback = (color, fallback) =>
  isValidHexColor(color) ? `#${color}` : fallback;

const escapeXml = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const formatDate = (date, includeYear = false) => {
  if (!date) {
    return "";
  }
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    ...(includeYear ? { year: "numeric" } : {}),
    timeZone: "UTC",
  });
};

const formatDateRange = (start, end) => {
  if (!start || !end) {
    return "No active streak";
  }
  const startDate = new Date(`${start}T00:00:00Z`);
  const endDate = new Date(`${end}T00:00:00Z`);
  const startText = formatDate(
    start,
    startDate.getUTCFullYear() !== endDate.getUTCFullYear(),
  );
  const endText = formatDate(
    end,
    startDate.getUTCFullYear() !== endDate.getUTCFullYear(),
  );
  return `${startText} - ${endText}`;
};

/**
 * Render a contribution streak card.
 *
 * @param {{name?: string, username?: string, totalContributions?: number, firstContribution?: string, currentStreak?: number, longestStreak?: number, currentStreakStart?: string, currentStreakEnd?: string, longestStreakStart?: string, longestStreakEnd?: string}} stats Streak statistics.
 * @param {{hide_border?: boolean, theme?: string, border_radius?: string, border_color?: string, text_color?: string, bg_color?: string, title_color?: string, icon_color?: string, ring_color?: string, fire_color?: string, curr_streak_label_color?: string, curr_streak_num_color?: string, side_labels_color?: string, side_nums_color?: string, dates_color?: string}} options Card options.
 * @returns {string} SVG markup.
 */
const renderStreakCard = (stats = {}, options = {}) => {
  const {
    name,
    username,
    totalContributions = 0,
    firstContribution,
    currentStreak = 0,
    longestStreak = 0,
    currentStreakStart,
    currentStreakEnd,
    longestStreakStart,
    longestStreakEnd,
  } = stats;
  const {
    hide_border = false,
    theme = "default",
    border_radius,
    border_color,
    text_color,
    bg_color,
    title_color,
    icon_color,
    ring_color,
    fire_color,
    curr_streak_label_color,
    curr_streak_num_color,
    side_labels_color,
    side_nums_color,
    dates_color,
  } = options;

  const colors = getCardColors({
    title_color,
    text_color,
    icon_color,
    bg_color,
    border_color,
    ring_color,
    theme,
  });
  const ringColor = colorOrFallback(ring_color, colors.ringColor);
  const fireColor = colorOrFallback(fire_color, "#fb8500");
  const streakLabelColor = colorOrFallback(curr_streak_label_color, ringColor);
  const currentNumberColor = colorOrFallback(
    curr_streak_num_color,
    colors.textColor,
  );
  const sideLabelColor = colorOrFallback(side_labels_color, colors.textColor);
  const sideNumberColor = colorOrFallback(side_nums_color, colors.textColor);
  const dateColor = colorOrFallback(dates_color, colors.textColor);
  const bgFill =
    typeof colors.bgColor === "object" ? "url(#gradient)" : colors.bgColor;
  const displayName = name || username || "GitHub";
  const totalContributionsLabel =
    Number(totalContributions).toLocaleString("en-US");
  const totalDateLabel = firstContribution
    ? `${formatDate(firstContribution, true)} - Present`
    : "Last 365 days";
  const currentDateLabel = formatDateRange(
    currentStreakStart,
    currentStreakEnd,
  );
  const longestDateLabel = formatDateRange(
    longestStreakStart,
    longestStreakEnd,
  );
  const borderRadius = border_radius || "4.5";
  const borderOpacity = hide_border ? 0 : 1;
  const gradient =
    typeof colors.bgColor === "object"
      ? `
          <linearGradient
            id="gradient"
            gradientUnits="userSpaceOnUse"
            gradientTransform="rotate(${colors.bgColor[0]})"
          >
            ${colors.bgColor
              .slice(1)
              .map((grad, index, gradients) => {
                const offset =
                  gradients.length > 1
                    ? (index * 100) / (gradients.length - 1)
                    : 0;
                return `<stop offset="${offset}%" stop-color="#${grad}" />`;
              })
              .join("")}
          </linearGradient>`
      : "";

  return `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      style="isolation: isolate"
      viewBox="0 0 495 195"
      width="495px"
      height="195px"
      direction="ltr"
      role="img"
      aria-labelledby="titleId descId"
    >
      <title id="titleId">${escapeXml(displayName)}'s GitHub Streak</title>
      <desc id="descId">${currentStreak} day current streak, ${longestStreak} day longest streak, and ${totalContributions} all-time contributions</desc>
      <style>
        @keyframes currstreak {
          0% { font-size: 3px; opacity: 0.2; }
          80% { font-size: 34px; opacity: 1; }
          100% { font-size: 28px; opacity: 1; }
        }
        @keyframes fadein {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        .stat-number {
          font: 700 28px "Segoe UI", Ubuntu, sans-serif;
        }
        .stat-label {
          font: 400 14px "Segoe UI", Ubuntu, sans-serif;
        }
        .stat-label-strong {
          font: 700 14px "Segoe UI", Ubuntu, sans-serif;
        }
        .stat-date {
          font: 400 12px "Segoe UI", Ubuntu, sans-serif;
        }
      </style>
      <defs>
        <clipPath id="outer_rectangle">
          <rect width="495" height="195" rx="${borderRadius}" />
        </clipPath>
        <mask id="mask_out_ring_behind_fire">
          <rect width="495" height="195" fill="white" />
          <ellipse cx="247.5" cy="32" rx="13" ry="18" fill="black" />
        </mask>
        ${gradient}
      </defs>
      <g clip-path="url(#outer_rectangle)">
        <rect
          stroke="${colors.borderColor}"
          stroke-opacity="${borderOpacity}"
          fill="${bgFill}"
          rx="${borderRadius}"
          x="0.5"
          y="0.5"
          width="494"
          height="194"
        />
        <line x1="165" y1="28" x2="165" y2="170" stroke="${sideLabelColor}" stroke-width="1" />
        <line x1="330" y1="28" x2="330" y2="170" stroke="${sideLabelColor}" stroke-width="1" />

        <g transform="translate(82.5, 48)">
          <text x="0" y="32" class="stat-number" text-anchor="middle" fill="${sideNumberColor}" style="opacity: 0; animation: fadein 0.5s linear forwards 0.6s">${totalContributionsLabel}</text>
        </g>
        <g transform="translate(82.5, 84)">
          <text x="0" y="32" class="stat-label" text-anchor="middle" fill="${sideLabelColor}" style="opacity: 0; animation: fadein 0.5s linear forwards 0.7s">Total Contributions</text>
        </g>
        <g transform="translate(82.5, 114)">
          <text x="0" y="32" class="stat-date" text-anchor="middle" fill="${dateColor}" style="opacity: 0; animation: fadein 0.5s linear forwards 0.8s">${totalDateLabel}</text>
        </g>

        <g transform="translate(247.5, 108)">
          <text x="0" y="32" class="stat-label-strong" text-anchor="middle" fill="${streakLabelColor}" style="opacity: 0; animation: fadein 0.5s linear forwards 0.9s">Current Streak</text>
        </g>
        <g transform="translate(247.5, 145)">
          <text x="0" y="21" class="stat-date" text-anchor="middle" fill="${dateColor}" style="opacity: 0; animation: fadein 0.5s linear forwards 0.9s">${currentDateLabel}</text>
        </g>
        <g mask="url(#mask_out_ring_behind_fire)">
          <circle cx="247.5" cy="71" r="40" fill="none" stroke="${ringColor}" stroke-width="5" style="opacity: 0; animation: fadein 0.5s linear forwards 0.4s" />
        </g>
        <g transform="translate(247.5, 19.5)" stroke-opacity="0" style="opacity: 0; animation: fadein 0.5s linear forwards 0.6s">
          <path d="M -12 -0.5 L 15 -0.5 L 15 23.5 L -12 23.5 L -12 -0.5 Z" fill="none" />
          <path d="M 1.5 0.67 C 1.5 0.67 2.24 3.32 2.24 5.47 C 2.24 7.53 0.89 9.2 -1.17 9.2 C -3.23 9.2 -4.79 7.53 -4.79 5.47 L -4.76 5.11 C -6.78 7.51 -8 10.62 -8 13.99 C -8 18.41 -4.42 22 0 22 C 4.42 22 8 18.41 8 13.99 C 8 8.6 5.41 3.79 1.5 0.67 Z M -0.29 19 C -2.07 19 -3.51 17.6 -3.51 15.86 C -3.51 14.24 -2.46 13.1 -0.7 12.74 C 1.07 12.38 2.9 11.53 3.92 10.16 C 4.31 11.45 4.51 12.81 4.51 14.2 C 4.51 16.85 2.36 19 -0.29 19 Z" fill="${fireColor}" />
        </g>
        <g transform="translate(247.5, 48)">
          <text x="0" y="32" class="stat-number" text-anchor="middle" fill="${currentNumberColor}" style="animation: currstreak 0.6s linear forwards">${currentStreak}</text>
        </g>

        <g transform="translate(412.5, 48)">
          <text x="0" y="32" class="stat-number" text-anchor="middle" fill="${sideNumberColor}" style="opacity: 0; animation: fadein 0.5s linear forwards 1.2s">${longestStreak}</text>
        </g>
        <g transform="translate(412.5, 84)">
          <text x="0" y="32" class="stat-label" text-anchor="middle" fill="${sideLabelColor}" style="opacity: 0; animation: fadein 0.5s linear forwards 1.3s">Longest Streak</text>
        </g>
        <g transform="translate(412.5, 114)">
          <text x="0" y="32" class="stat-date" text-anchor="middle" fill="${dateColor}" style="opacity: 0; animation: fadein 0.5s linear forwards 1.4s">${longestDateLabel}</text>
        </g>
      </g>
    </svg>
  `;
};

export { renderStreakCard };
export default renderStreakCard;
