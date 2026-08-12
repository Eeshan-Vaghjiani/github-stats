// @ts-check

import { renderActivityGraph } from "../src/cards/activity-graph.js";
import {
  CACHE_TTL,
  resolveCacheSeconds,
  setCacheHeaders,
  setErrorCacheHeaders,
} from "../src/common/cache.js";
import { guardAccess } from "../src/common/access.js";
import {
  MissingParamError,
  retrieveSecondaryMessage,
} from "../src/common/error.js";
import { parseBoolean } from "../src/common/ops.js";
import { renderError } from "../src/common/render.js";
import { fetchContributionCalendar } from "../src/fetchers/contributions.js";

// @ts-ignore
export default async (req, res) => {
  const {
    username: usernameParam,
    user,
    hide_border,
    border_radius,
    border_color,
    text_color,
    bg_color: backgroundColor,
    background,
    title_color,
    color,
    line,
    point,
    area,
    theme,
    cache_seconds,
  } = req.query;
  const username = usernameParam || user;
  const bg_color = backgroundColor || background;

  res.setHeader("Content-Type", "image/svg+xml");

  const access = guardAccess({
    res,
    id: username,
    type: "username",
    colors: {
      title_color: color || title_color,
      text_color,
      bg_color,
      border_color,
      theme,
    },
  });
  if (!access.isPassed) {
    return access.result;
  }

  try {
    const stats = await fetchContributionCalendar(username);
    const cacheSeconds = resolveCacheSeconds({
      requested: parseInt(cache_seconds, 10),
      def: CACHE_TTL.ACTIVITY_GRAPH.DEFAULT,
      min: CACHE_TTL.ACTIVITY_GRAPH.MIN,
      max: CACHE_TTL.ACTIVITY_GRAPH.MAX,
    });
    setCacheHeaders(res, cacheSeconds);

    return res.send(
      renderActivityGraph(stats, {
        hide_border: parseBoolean(hide_border),
        border_radius,
        border_color,
        text_color,
        bg_color,
        title_color,
        color,
        line,
        point,
        area,
        theme,
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
          title_color: color || title_color,
          text_color,
          bg_color,
          border_color,
          theme,
          show_repo_link: !(err instanceof MissingParamError),
        },
      }),
    );
  }
};
