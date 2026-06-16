const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const dataDir = path.join(root, "data");

function syncJsonToWindow(jsonName, jsName, globalName) {
  const jsonPath = path.join(dataDir, jsonName);
  const jsPath = path.join(dataDir, jsName);
  const raw = fs.readFileSync(jsonPath, "utf8");
  const parsed = JSON.parse(raw);
  fs.writeFileSync(jsPath, `window.${globalName} = ${JSON.stringify(parsed, null, 2)};\n`);
}

syncJsonToWindow("questions.json", "questions.js", "CYBER_QUESTIONS");
syncJsonToWindow("content-map.json", "content-map.js", "CYBER_CONTENT_MAP");

console.log("Synced Cyber data JS files.");

