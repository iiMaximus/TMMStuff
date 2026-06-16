const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const generatedDir = path.join(root, "generated");
const outputPath = path.join(root, "data", "questions.json");

const requiredBatchFiles = [
  "module-a-cards.json",
  "module-b-cards.json",
  "crypto-design-cards.json",
  "os-trust-iot-cards.json"
];

const optionalBatchFiles = [
  "module-a-completion-cards.json",
  "module-b-completion-cards.json",
  "crypto-design-completion-cards.json",
  "os-trust-completion-cards.json",
  "iot-completion-cards.json"
];

const cards = [];

function integrateBatch(file) {
  const filePath = path.join(generatedDir, file);
  const batch = JSON.parse(fs.readFileSync(filePath, "utf8"));
  if (!Array.isArray(batch)) throw new Error(`${file} is not an array`);
  batch.forEach((card) => {
    const { id, ...withoutId } = card;
    cards.push({
      id: cards.length + 1,
      ...withoutId
    });
  });
}

requiredBatchFiles.forEach(integrateBatch);
optionalBatchFiles
  .filter((file) => fs.existsSync(path.join(generatedDir, file)))
  .forEach(integrateBatch);

fs.writeFileSync(outputPath, `${JSON.stringify(cards, null, 2)}\n`);
console.log(`Integrated ${cards.length} cards into ${path.relative(root, outputPath)}.`);
