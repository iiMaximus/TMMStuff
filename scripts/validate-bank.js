const fs = require("fs");

const QUESTIONS_PATH = "data/questions.json";
const CONTENT_MAP_PATH = "data/content-map.json";
const OPTION_KEYS = ["A", "B", "C", "D"];
const VALID_DECKS = new Set(["question-bank", "slides", "self-assessment"]);
const VALID_SOURCE_TYPES = new Set(["past-exam", "slides", "self-assessment"]);
const VALID_DIFFICULTIES = new Set(["easy", "medium", "hard"]);
const VALID_CARD_TYPES = new Set(["definition", "trap", "application", "calculation", "process-chain"]);
const METADATA_ENFORCED_AFTER_ID = 70;

function readJson(path) {
  return JSON.parse(fs.readFileSync(path, "utf8"));
}

function words(text) {
  return String(text || "").trim().split(/\s+/).filter(Boolean).length;
}

function warn(warnings, id, message) {
  warnings.push(`Q${id}: ${message}`);
}

const questions = readJson(QUESTIONS_PATH);
const contentMap = readJson(CONTENT_MAP_PATH);
const moduleIds = new Set((contentMap.modules || []).map((module) => module.id));
const seenIds = new Set();
const errors = [];
const warnings = [];
const legacyMetadataGaps = {
  section: 0,
  sourceType: 0,
  difficulty: 0,
  cardType: 0,
  trapTags: 0,
  diagramRequired: 0
};

if (!Array.isArray(questions)) {
  errors.push(`${QUESTIONS_PATH} must contain a JSON array.`);
}

(Array.isArray(questions) ? questions : []).forEach((question, index) => {
  const label = question && question.id ? question.id : `at index ${index}`;

  if (!Number.isInteger(question.id)) errors.push(`Question ${label}: id must be an integer.`);
  if (seenIds.has(question.id)) errors.push(`Question ${label}: duplicate id.`);
  seenIds.add(question.id);

  ["question", "correctAnswer", "explanation", "relevantTheory", "source"].forEach((field) => {
    if (typeof question[field] !== "string" || !question[field].trim()) {
      errors.push(`Question ${label}: missing non-empty ${field}.`);
    }
  });

  if (!question.options || typeof question.options !== "object" || Array.isArray(question.options)) {
    errors.push(`Question ${label}: options must be an object.`);
  } else {
    const optionKeys = Object.keys(question.options).sort();
    if (JSON.stringify(optionKeys) !== JSON.stringify(OPTION_KEYS)) {
      errors.push(`Question ${label}: options must contain exactly A, B, C, and D.`);
    }
    OPTION_KEYS.forEach((key) => {
      if (typeof question.options[key] !== "string" || !question.options[key].trim()) {
        errors.push(`Question ${label}: option ${key} must be non-empty.`);
      }
    });
  }

  if (!OPTION_KEYS.includes(question.correctAnswer)) {
    errors.push(`Question ${label}: correctAnswer must be A, B, C, or D.`);
  }

  const deck = question.deck || "question-bank";
  if (!VALID_DECKS.has(deck)) {
    errors.push(`Question ${label}: deck "${deck}" is not valid.`);
  }

  if (question.moduleId && !moduleIds.has(question.moduleId)) {
    errors.push(`Question ${label}: moduleId "${question.moduleId}" is not in ${CONTENT_MAP_PATH}.`);
  }

  if (deck !== "question-bank" && !question.moduleId) {
    warn(warnings, label, "new slide/self-assessment cards should include moduleId.");
  }

  const enforceMetadata = Number.isInteger(question.id) && question.id > METADATA_ENFORCED_AFTER_ID;

  if (!question.section) {
    if (enforceMetadata) warn(warnings, label, "section metadata missing; app will infer topic by regex.");
    else legacyMetadataGaps.section += 1;
  }
  if (!question.sourceType) {
    if (enforceMetadata) warn(warnings, label, "sourceType missing.");
    else legacyMetadataGaps.sourceType += 1;
  }
  if (question.sourceType && !VALID_SOURCE_TYPES.has(question.sourceType)) {
    warn(warnings, label, `sourceType "${question.sourceType}" is not one of ${[...VALID_SOURCE_TYPES].join(", ")}.`);
  }
  if (!question.difficulty) {
    if (enforceMetadata) warn(warnings, label, "difficulty missing.");
    else legacyMetadataGaps.difficulty += 1;
  }
  if (question.difficulty && !VALID_DIFFICULTIES.has(question.difficulty)) {
    warn(warnings, label, `difficulty "${question.difficulty}" is not one of easy, medium, hard.`);
  }
  if (!question.cardType) {
    if (enforceMetadata) warn(warnings, label, "cardType missing.");
    else legacyMetadataGaps.cardType += 1;
  }
  if (question.cardType && !VALID_CARD_TYPES.has(question.cardType)) {
    warn(warnings, label, `cardType "${question.cardType}" is not a supported card type.`);
  }
  if (!Array.isArray(question.trapTags)) {
    if (enforceMetadata) warn(warnings, label, "trapTags should be an array.");
    else legacyMetadataGaps.trapTags += 1;
  }
  if (typeof question.diagramRequired !== "boolean") {
    if (enforceMetadata) warn(warnings, label, "diagramRequired should be true or false.");
    else legacyMetadataGaps.diagramRequired += 1;
  }

  if (!question.diagramRequired && words(question.explanation) < 35) warn(warnings, label, "explanation may be too short.");
  if (!question.diagramRequired && words(question.relevantTheory) < 20) warn(warnings, label, "relevantTheory may be too short.");
  if (/figure|shown in the diagram|from the diagram|cooling curve|phase diagram|ttt diagram|r-region|j-point|h-region|r-field|c-temperature/i.test(question.question) && question.diagramRequired !== true) {
    warn(warnings, label, "question appears to depend on a missing figure/diagram but diagramRequired is not true.");
  }
});

const summary = {
  questions: Array.isArray(questions) ? questions.length : 0,
  decks: [...new Set((Array.isArray(questions) ? questions : []).map((q) => q.deck || "question-bank"))],
  modules: moduleIds.size,
  errors: errors.length,
  warnings: warnings.length
};

console.log(JSON.stringify(summary, null, 2));

const legacyGapCount = Object.values(legacyMetadataGaps).reduce((sum, count) => sum + count, 0);
if (legacyGapCount) {
  console.warn(`\nLegacy metadata gaps for ids <= ${METADATA_ENFORCED_AFTER_ID}:`);
  Object.entries(legacyMetadataGaps)
    .filter(([, count]) => count)
    .forEach(([field, count]) => console.warn(`- ${field}: ${count}`));
}

if (warnings.length) {
  console.warn("\nWarnings:");
  warnings.slice(0, 60).forEach((message) => console.warn(`- ${message}`));
  if (warnings.length > 60) console.warn(`- ... ${warnings.length - 60} more warnings`);
}

if (errors.length) {
  console.error("\nErrors:");
  errors.forEach((message) => console.error(`- ${message}`));
  process.exit(1);
}
