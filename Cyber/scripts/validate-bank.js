const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const questionsPath = path.join(root, "data", "questions.json");
const contentPath = path.join(root, "data", "content-map.json");

const questions = JSON.parse(fs.readFileSync(questionsPath, "utf8"));
const contentMap = JSON.parse(fs.readFileSync(contentPath, "utf8"));
const moduleIds = new Set(contentMap.modules.map((module) => module.id));
const lectureIds = new Set(contentMap.modules.flatMap((module) => module.lectures.map((lecture) => lecture.id)));
const ids = new Set();
const questionTexts = new Set();
const errors = [];

const required = [
  "id",
  "deck",
  "moduleId",
  "lectureId",
  "section",
  "sourceType",
  "difficulty",
  "cardType",
  "trapTags",
  "question",
  "options",
  "correctAnswer",
  "explanation",
  "relevantTheory",
  "source"
];

questions.forEach((question, index) => {
  required.forEach((field) => {
    if (!(field in question)) errors.push(`Question ${index + 1} missing ${field}`);
  });

  if (ids.has(question.id)) errors.push(`Duplicate id ${question.id}`);
  ids.add(question.id);

  const normalizedQuestion = String(question.question || "").trim().toLowerCase().replace(/\s+/g, " ");
  if (questionTexts.has(normalizedQuestion)) errors.push(`Duplicate question text at id ${question.id}`);
  questionTexts.add(normalizedQuestion);

  if (question.id !== index + 1) errors.push(`Question id ${question.id} should be ${index + 1}`);

  if (!moduleIds.has(question.moduleId)) errors.push(`Question ${question.id} has unknown moduleId ${question.moduleId}`);
  if (!lectureIds.has(question.lectureId)) errors.push(`Question ${question.id} has unknown lectureId ${question.lectureId}`);

  const optionKeys = question.options ? Object.keys(question.options).sort().join("") : "";
  if (optionKeys !== "ABCD") errors.push(`Question ${question.id} must have options A-D`);
  if (!["A", "B", "C", "D"].includes(question.correctAnswer)) errors.push(`Question ${question.id} has invalid correctAnswer`);
  if (!Array.isArray(question.trapTags)) errors.push(`Question ${question.id} trapTags must be an array`);
  if ((question.explanation || "").length < 40) errors.push(`Question ${question.id} explanation is too short`);
  if ((question.relevantTheory || "").length < 40) errors.push(`Question ${question.id} relevantTheory is too short`);
});

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`Validated ${questions.length} Cyber cards.`);
