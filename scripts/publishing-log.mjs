import fs from "node:fs";
import path from "node:path";

const LOG_FILE = path.join(
  process.env.HOME,
  "Vaults",
  "Kaoverse",
  "KORE",
  "SITES",
  "TOOLS & NOTES",
  "Publishing.Log.md"
);

function formatTimestamp() {
  const now = new Date();
  const pad = value => String(value).padStart(2, "0");

  return `${now.getFullYear()}.${pad(now.getMonth() + 1)}.${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
}

function escapeCell(value) {
  return String(value ?? "")
    .replace(/\|/g, "&#124;")
    .replace(/\r?\n/g, " ")
    .trim();
}

export function logPublishing({
  site,
  process,
  title,
  slug,
  images = [],
  result
}) {
  const row = [
    formatTimestamp(),
    site,
    process,
    title,
    slug,
    images.length
      ? [...new Set(images)].join(", ")
      : "—",
    result
  ].map(escapeCell);

  const existing = fs.readFileSync(LOG_FILE, "utf8");
  const separator = existing.endsWith("\n") ? "" : "\n";

  fs.appendFileSync(
    LOG_FILE,
    `${separator}| ${row.join(" | ")} |\n`,
    "utf8"
  );
}