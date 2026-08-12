// @ts-check

import { Card } from "../common/Card.js";
import { getCardColors, isValidHexColor } from "../common/color.js";

const CHART = { left: 62, top: 32, width: 810, height: 205 };

const colorOrFallback = (color, fallback) =>
  isValidHexColor(color) ? `#${color}` : fallback;

const dateLabel = (date) => new Date(`${date}T00:00:00Z`).getUTCDate();

const escapeXml = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

/**
 * Render a dark, line-based contribution graph matching the profile dashboard.
 *
 * @param {{name?: string, username?: string, totalContributions?: number, days?: Array<{date: string, count: number}>}} stats Contribution data.
 * @param {{hide_border?: boolean, border_radius?: string, border_color?: string, text_color?: string, bg_color?: string, title_color?: string, color?: string, line?: string, point?: string, area?: string, theme?: string}} options Card options.
 * @returns {string} SVG markup.
 */
const renderActivityGraph = (stats = {}, options = {}) => {
  const { name, username, totalContributions = 0, days = [] } = stats;
  const {
    hide_border = false,
    border_radius,
    border_color,
    text_color,
    bg_color,
    title_color,
    color,
    line,
    point,
    area,
    theme = "default",
  } = options;

  const colors = getCardColors({
    title_color: color || title_color,
    text_color,
    icon_color: "",
    bg_color,
    border_color,
    ring_color: "",
    theme,
  });
  const gridColor = colorOrFallback(color, "#00b894");
  const lineColor = colorOrFallback(line, "#006d77");
  const pointColor = colorOrFallback(point, "#ffffff");
  const areaFillColor = colorOrFallback(area, lineColor);
  const areaOpacity = area ? "0.3" : "0.25";
  const displayName = name || username || "GitHub";
  const title = `${displayName}'s Contribution Graph`;

  const card = new Card({
    width: 900,
    height: 345,
    border_radius: border_radius || "4.5",
    customTitle: "",
    colors,
  });
  card.setHideBorder(hide_border);
  card.setHideTitle(true);
  card.setAccessibilityLabel({
    title,
    desc: `${totalContributions} contributions in the last year`,
  });
  card.setCSS(`
    .graph-title { font: 600 14px 'Segoe UI', Ubuntu, Sans-Serif; }
    .axis-label { font: 400 10px 'Segoe UI', Ubuntu, Sans-Serif; }
    .axis-number { font: 400 9px 'Segoe UI', Ubuntu, Sans-Serif; }
  `);

  const chartDays = days.slice(-31);
  const maxValue = Math.max(1, ...chartDays.map((day) => day.count));
  const requestedMax = Math.max(40, Math.ceil(maxValue / 5) * 5);
  const yStep = requestedMax <= 40 ? 5 : Math.ceil(requestedMax / 8 / 5) * 5;
  const maxY = yStep * Math.ceil(requestedMax / yStep);
  const xStep =
    chartDays.length > 1 ? CHART.width / (chartDays.length - 1) : CHART.width;
  const y = (count) => CHART.top + CHART.height - (count / maxY) * CHART.height;
  const x = (index) => CHART.left + index * xStep;

  const horizontalGrid = Array.from(
    { length: Math.floor(maxY / yStep) + 1 },
    (_, index) => {
      const value = yStep * index;
      const yPos = y(value);
      return `<line x1="${CHART.left}" y1="${yPos}" x2="${CHART.left + CHART.width}" y2="${yPos}" stroke="${gridColor}" stroke-opacity="0.26" stroke-dasharray="2 5" />
      <text class="axis-number" x="${CHART.left - 10}" y="${yPos + 3}" text-anchor="end" fill="${gridColor}">${value}</text>`;
    },
  ).join("");

  const verticalGrid = chartDays
    .map((day, index) => {
      const xPos = x(index);
      return `<line x1="${xPos}" y1="${CHART.top}" x2="${xPos}" y2="${CHART.top + CHART.height}" stroke="${gridColor}" stroke-opacity="0.16" stroke-dasharray="2 5" />`;
    })
    .join("");

  const points = chartDays.map((day, index) => `${x(index)},${y(day.count)}`);
  const linePath = points.length ? `M ${points.join(" L ")}` : "";
  const areaPath = points.length
    ? `M ${CHART.left},${CHART.top + CHART.height} L ${points.join(" L ")} L ${x(chartDays.length - 1)},${CHART.top + CHART.height} Z`
    : "";
  const dots = chartDays
    .map((day, index) => {
      const xPos = x(index);
      const yPos = y(day.count);
      return `<circle cx="${xPos}" cy="${yPos}" r="4.2" fill="${pointColor}" stroke="${lineColor}" stroke-width="1.5"><title>${day.count} contributions on ${escapeXml(day.date)}</title></circle>`;
    })
    .join("");
  const xLabels = chartDays
    .map((day, index) => {
      return `<text class="axis-number" x="${x(index)}" y="${CHART.top + CHART.height + 16}" text-anchor="middle" fill="${gridColor}">${dateLabel(day.date)}</text>`;
    })
    .join("");

  return card.render(`
    <g transform="translate(0, 0)">
      <text class="graph-title" x="450" y="0" text-anchor="middle" fill="${gridColor}">${escapeXml(title)}</text>
      <text class="axis-label" x="24" y="${CHART.top + CHART.height / 2}" text-anchor="middle" transform="rotate(-90 24 ${CHART.top + CHART.height / 2})" fill="${gridColor}">Contributions</text>
      ${horizontalGrid}
      ${verticalGrid}
      ${areaPath ? `<path d="${areaPath}" fill="${areaFillColor}" fill-opacity="${areaOpacity}" />` : ""}
      ${linePath ? `<path d="${linePath}" fill="none" stroke="${lineColor}" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" />` : ""}
      ${dots}
      ${xLabels}
      <text class="axis-label" x="${CHART.left + CHART.width / 2}" y="${CHART.top + CHART.height + 34}" text-anchor="middle" fill="${gridColor}">Days</text>
    </g>
  `);
};

export { renderActivityGraph };
export default renderActivityGraph;
