#!/usr/bin/env node
/**
 * Asset, reference, and deadweight check for Scout Uniform Guide.
 * Runs with plain Node.js so CI and local checks do not depend on a build tool.
 */
const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const ROOT = path.resolve(__dirname, "..");
const MAX_SINGLE_FILE = 1024 * 1024;
const errors = [];

function fail(message) {
  errors.push(message);
}

function walk(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else out.push(path.relative(ROOT, full).replace(/\\/g, "/"));
  }
  return out;
}

function checkSyntax(file) {
  try {
    execFileSync(process.execPath, ["--check", path.join(ROOT, file)], { stdio: "pipe" });
  } catch (err) {
    fail(`Invalid JavaScript syntax in ${file}:\n${err.stderr?.toString() || err.message}`);
  }
}

for (const jsFile of ["app.js", "data.js", "locale-en.js", "scripts/check.js", "scripts/lint.js", "scripts/to-avif.js", "build-site.mjs"]) {
  if (fs.existsSync(path.join(ROOT, jsFile))) checkSyntax(jsFile);
}

const sourceFiles = ["index.html", "app.js", "data.js", "locale-en.js", "manifest.webmanifest"];
const referencedAssets = new Set();
const referencedIcons = new Set();

for (const file of sourceFiles) {
  const text = fs.readFileSync(path.join(ROOT, file), "utf8");
  for (const match of text.matchAll(/assets\/[A-Za-z0-9_./-]+\.(?:avif|png|svg|webp|ico|jpg|jpeg)/g)) {
    referencedAssets.add(match[0]);
  }
  for (const match of text.matchAll(/icons\/[A-Za-z0-9_./-]+\.(?:png|ico|svg)/g)) {
    referencedIcons.add(match[0]);
  }
}

const dataText = fs.readFileSync(path.join(ROOT, "data.js"), "utf8");
for (const match of dataText.matchAll(/(?:handbookImage|uniformCrop)\([^,]+,\s*"([^"]+)"/g)) {
  referencedAssets.add(`assets/reference/${match[1]}.avif`);
}
const appText = fs.readFileSync(path.join(ROOT, "app.js"), "utf8");
for (const match of appText.matchAll(/localBadge\("([^"]+)"/g)) {
  referencedAssets.add(`assets/badges/${match[1]}.webp`);
}

for (const asset of referencedAssets) {
  if (!fs.existsSync(path.join(ROOT, asset))) {
    fail(`Missing referenced asset: ${asset}`);
  }
}
for (const icon of referencedIcons) {
  if (!fs.existsSync(path.join(ROOT, icon))) {
    fail(`Missing referenced icon: ${icon}`);
  }
}

const actualAssets = walk(path.join(ROOT, "assets")).filter(file => !file.endsWith("/README.md") && file !== "assets/README.md");
for (const asset of actualAssets) {
  if (!referencedAssets.has(asset)) {
    fail(`Unreferenced file in assets/: ${asset}`);
  }
  if (/^assets\/(items|reference)\/.*\.(png|jpe?g)$/i.test(asset)) {
    fail(`Raster asset should be AVIF instead of PNG/JPEG: ${asset}`);
  }
}

const actualIcons = walk(path.join(ROOT, "icons"));
for (const icon of actualIcons) {
  if (!referencedIcons.has(icon)) {
    fail(`Unreferenced file in icons/: ${icon}`);
  }
  if (!/^icons\/.*\.(png|ico)$/i.test(icon)) {
    fail(`Icon in icons/ must be PNG or ICO per G11: ${icon}`);
  }
}

const manifest = JSON.parse(fs.readFileSync(path.join(ROOT, "manifest.webmanifest"), "utf8"));
for (const icon of manifest.icons || []) {
  const cleanSrc = icon.src.split("?")[0];
  if (!fs.existsSync(path.join(ROOT, cleanSrc))) {
    fail(`Missing manifest icon: ${cleanSrc}`);
  }
}

const indexHtml = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
for (const match of indexHtml.matchAll(/<(?:link|img)[^>]+(?:href|src)="([^"]+)"/g)) {
  const target = match[1].split("?")[0];
  if (/^(https?:|data:|mailto:|#)/.test(target)) continue;
  if (!fs.existsSync(path.join(ROOT, target))) {
    fail(`Missing index.html asset: ${target}`);
  }
}

let trackedFiles = [];
try {
  trackedFiles = execFileSync("git", ["ls-files"], { cwd: ROOT, encoding: "utf8" })
    .split("\n")
    .filter(Boolean)
    .filter(file => fs.existsSync(path.join(ROOT, file)));
} catch {
  trackedFiles = walk(ROOT).filter(file => !file.startsWith(".git/") && !file.startsWith("node_modules/") && !file.startsWith("dist/"));
}

const junkPatterns = [/(^|\/)\.DS_Store$/, /\.(?:bak|tmp|orig|old|log)$/i, /(^|\/)Thumbs\.db$/];
for (const file of trackedFiles) {
  if (junkPatterns.some(pattern => pattern.test(file))) {
    fail(`Deadweight file tracked by git: ${file}`);
  }
  const size = fs.statSync(path.join(ROOT, file)).size;
  if (size > MAX_SINGLE_FILE) {
    fail(`File exceeds 1 MB limit (${size} bytes): ${file}`);
  }
}

if (errors.length) {
  console.error("Asset and deadweight check failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`PASS: ${referencedAssets.size} assets + ${referencedIcons.size} icons verified, ${trackedFiles.length} tracked files clean.`);
