// @ts-check

import { renderStreakCard } from "../src/cards/streak-card.js";
import { guardAccess } from "../src/common/access.js";
import {
  CACHE_TTL,
  resolveCacheSeconds,
  setCacheHeaders,
  setErrorCacheHeaders,
} from "../src/common/cache.js";
import {
  MissingParamError,
  retrieveSecondaryMessage,
} from "../src/common/error.js";
import { parseBoolean } from "../src/common/ops.js";
import { renderError } from "../src/common/render.js";
import { fetchStreak } from "../src/fetchers/streak-fetcher.js";

// @ts-ignore
export default async (req, res) => {
  const {
    username: usernameParam,
    user,
    hide_border,
    theme,
    cache_seconds,
    border_radius,
    border_color,
    text_color,
    bg_color: backgroundColor,
    background,
    title_color,
    icon_color,
    ring_color: ringColorParam,
    ring,
    fire_color: fireColorParam,
    fire,
    curr_streak_label_color: streakLabelColorParam,
    curr_streak_num_color: currentNumberColorParam,
    side_labels_color: sideLabelsColorParam,
    side_nums_color: sideNumbersColorParam,
    dates_color: datesColorParam,
    currStreakLabel,
    currStreakNum,
    sideLabels,
    sideNums,
    dates,
  } = req.query;
  const username = usernameParam || user;
  const bg_color = backgroundColor || background;
  const ring_color = ringColorParam || ring;
  const fire_color = fireColorParam || fire;
  const curr_streak_label_color = streakLabelColorParam || currStreakLabel;
  const fallbackTextColor =
    text_color || currStreakNum || sideNums || sideLabels;
  const curr_streak_num_color = currentNumberColorParam || currStreakNum;
  const side_labels_color = sideLabelsColorParam || sideLabels;
  const side_nums_color = sideNumbersColorParam || sideNums;
  const dates_color = datesColorParam || dates;

  res.setHeader("Content-Type", "image/svg+xml");

  const access = guardAccess({
    res,
    id: username,
    type: "username",
    colors: {
      title_color,
      text_color: fallbackTextColor,
      bg_color,
      border_color,
      theme,
    },
  });
  if (!access.isPassed) {
    return access.result;
  }

  try {
    const stats = await fetchStreak(username);
    const cacheSeconds = resolveCacheSeconds({
      requested: parseInt(cache_seconds, 10),
      def: CACHE_TTL.STREAK_CARD.DEFAULT,
      min: CACHE_TTL.STREAK_CARD.MIN,
      max: CACHE_TTL.STREAK_CARD.MAX,
    });
    setCacheHeaders(res, cacheSeconds);

    return res.send(
      renderStreakCard(stats, {
        hide_border: parseBoolean(hide_border),
        theme: theme || "default",
        border_radius,
        border_color,
        text_color: fallbackTextColor,
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
      }),
    );
  } catch (err) {
    setErrorCacheHeaders(res);
    return res.send(
      renderError({
        message:
          err instanceof Error ? err.message : "An unknown error occurred",
        secondaryMessage:
          err instanceof Error ? retrieveSecondaryMessage(err) : undefined,
        renderOptions: {
          title_color,
          text_color: fallbackTextColor,
          bg_color,
          border_color,
          theme,
          show_repo_link: !(err instanceof MissingParamError),
        },
      }),
    );
  }
};
