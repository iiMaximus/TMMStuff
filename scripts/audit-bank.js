const questions = require("../data/questions.json");
const contentMap = require("../data/content-map.json");
const fs = require("fs");
const path = require("path");

const visible = questions.filter((question) => question.diagramRequired !== true);
const optionLetters = ["A", "B", "C", "D"];

function wordCount(text) {
  return String(text || "").trim().split(/\s+/).filter(Boolean).length;
}

function normalize(text) {
  return String(text || "").toLowerCase().replace(/\s+/g, " ").trim();
}

function countBy(items, keyFn) {
  return items.reduce((acc, item) => {
    const key = keyFn(item);
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
}

const duplicateQuestions = [];
const seenQuestions = new Map();
const duplicateOptionCards = [];
const weakCards = [];
const diagramLeaks = [];
const staleLectureRefs = [];
const sourceOnlyStyle = [];
const sourceMissingFiles = [];

function collectFiles(dir, prefix = "") {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  return entries.flatMap((entry) => {
    const relativePath = path.join(prefix, entry.name);
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) return collectFiles(fullPath, relativePath);
    return relativePath.replaceAll(path.sep, "/");
  });
}

const sourceFiles = collectFiles(path.join(__dirname, ".."))
  .filter((file) => /\.(pdf|png|txt)$/i.test(file))
  .filter((file) => !file.startsWith(".git/"));

for (const question of questions) {
  const normalizedQuestion = normalize(question.question).replace(/[^a-z0-9]+/g, " ");
  if (seenQuestions.has(normalizedQuestion)) {
    duplicateQuestions.push([seenQuestions.get(normalizedQuestion), question.id, question.question]);
  } else {
    seenQuestions.set(normalizedQuestion, question.id);
  }

  const options = optionLetters.map((letter) => normalize(question.options?.[letter]));
  if (new Set(options).size !== optionLetters.length) duplicateOptionCards.push(question.id);

  if (!question.diagramRequired) {
    const explanationWords = wordCount(question.explanation);
    const theoryWords = wordCount(question.relevantTheory);
    if (explanationWords < 35 || theoryWords < 20) {
      weakCards.push({
        id: question.id,
        explanationWords,
        theoryWords,
        question: question.question
      });
    }

    if (/\b(figure|shown below|see graph|from the graph|from the curve|from the diagram|r-region|j-point|h-region)\b/i.test(question.question)) {
      diagramLeaks.push({ id: question.id, question: question.question });
    }
  }

  if (question.moduleId && /Lecture 1 Intro/.test(question.source || "") && question.moduleId !== "lecture-1-intro") {
    staleLectureRefs.push(question.id);
  }

  if (/style sample only/i.test(question.source || "") && !/slides&docs|Self-assesment|notes-split|TMM\.txt/.test(question.source || "")) {
    sourceOnlyStyle.push(question.id);
  }

  const sourceParts = String(question.source || "")
    .split(";")
    .map((part) => part.trim())
    .filter(Boolean);
  for (const sourcePart of sourceParts) {
    if (!sourceFiles.some((file) => sourcePart.includes(file))) {
      sourceMissingFiles.push({ id: question.id, source: sourcePart });
    }
  }
}

const slideModules = contentMap.modules.filter((module) => module.deck === "slides");
const lectureCoverage = slideModules.map((module) => {
  const cards = visible.filter((question) => question.moduleId === module.id);
  return {
    id: module.id,
    title: module.title,
    cards: cards.length,
    byType: countBy(cards, (question) => question.cardType),
    byDifficulty: countBy(cards, (question) => question.difficulty)
  };
});

const result = {
  totals: {
    stored: questions.length,
    visible: visible.length,
    skippedDiagramRequired: questions.length - visible.length
  },
  storedCorrectAnswerDistribution: countBy(questions, (question) => question.correctAnswer),
  note: "Explanations are letter-specific. The app shuffles visual option order but hides original A-D letters until feedback, then reveals them so explanations remain aligned.",
  decks: countBy(visible, (question) => question.deck),
  cardTypes: countBy(visible, (question) => question.cardType),
  difficulties: countBy(visible, (question) => question.difficulty),
  lectureCoverage,
  issues: {
    duplicateQuestions,
    duplicateOptionCards,
    weakCards,
    diagramLeaks,
    staleLectureRefs,
    sourceOnlyStyle,
    sourceMissingFiles
  }
};

console.log(JSON.stringify(result, null, 2));

const issueCount = Object.values(result.issues).reduce((sum, list) => sum + list.length, 0);
if (issueCount > 0) process.exitCode = 1;
