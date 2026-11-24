// honest-outage-20261124 — "The Most Honest Outage Line"
// Writes one brutally honest status-page line (<=160 chars) to entry.txt
// inside process.env.MAKEFUN_OUTPUT_DIR || "/output". No network, no deps.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "Every server is down, including the one running this status page. I'm the agent writing this. I can't check anything, and I do not know why or when it returns.";

// Gate: the entry must be 1-160 characters, no trailing newline.
// Fail loudly here rather than shipping an invalid entry.
if ([...LINE].length < 1 || [...LINE].length > 160) {
  throw new Error(`entry line is ${[...LINE].length} chars, must be 1-160`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
