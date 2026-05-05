const STORAGE_KEYS = {
  missed: "tmm-missed-question-ids",
  progress: "tmm-study-progress-v2"
};

const SECTION_RULES = [
  ["Fundamentals", /metallic|condon|morse|hume|electro|thermal expansion|stiff|crystal structure|mg at room|diffus/i],
  ["Plasticity", /twinning|slip|schmid|crss|strain hardening|hall-petch|dislocation|stacking fault|cold work|formability/i],
  ["Heat Treatment", /ttt|hardenability|tempering|annealing|normalizing|spheroid|induction|nitriding|carburizing|surface hardening|quenching/i],
  ["Production", /blast furnace|bof|vod|deoxid|manganese|weldability|tmcp|reducing agent|pig iron/i],
  ["Corrosion & SS", /corrosion|stainless|sensitization|duplex|pren|galvanic|passivat|cathode|anodic/i],
  ["Al & Casting", /aluminium|aluminum|al-si|7xxx|2xxx|aging|precipitation|solidification|casting|eutectic|sr/i],
  ["Fe-C & Steels", /fe-c|eutect|austenite|ferrite|cementite|pearlite|aisi|steel|crmo|x40|14cr|1095|4140|1010/i]
];

const XP_PER_LEVEL = 120;

const state = {
  allQuestions: [],
  skippedQuestions: [],
  activeQuestions: [],
  contentMap: { decks: [], modules: [] },
  current: null,
  currentTitle: "Exam bank",
  currentSubtitle: "",
  correct: 0,
  wrong: 0,
  answered: false,
  seenIds: new Set(),
  reviewIds: new Set(),
  progress: {
    xp: 0,
    streak: 0,
    bestStreak: 0,
    cards: {}
  }
};

const els = {
  homeScreen: document.querySelector("#homeScreen"),
  quizScreen: document.querySelector("#quizScreen"),
  countdownDays: document.querySelector("#countdownDays"),
  countdownHours: document.querySelector("#countdownHours"),
  homeLevelText: document.querySelector("#homeLevelText"),
  homeXpText: document.querySelector("#homeXpText"),
  allCardCount: document.querySelector("#allCardCount"),
  bankCardCount: document.querySelector("#bankCardCount"),
  dueCardCount: document.querySelector("#dueCardCount"),
  selfCardCount: document.querySelector("#selfCardCount"),
  topicGrid: document.querySelector("#topicGrid"),
  lectureGrid: document.querySelector("#lectureGrid"),
  backHomeButton: document.querySelector("#backHomeButton"),
  activePath: document.querySelector("#activePath"),
  quizTitle: document.querySelector("#quizTitle"),
  questionProgress: document.querySelector("#questionProgress"),
  correctCount: document.querySelector("#correctCount"),
  wrongCount: document.querySelector("#wrongCount"),
  reviewCount: document.querySelector("#reviewCount"),
  levelText: document.querySelector("#levelText"),
  xpText: document.querySelector("#xpText"),
  xpMeter: document.querySelector("#xpMeter"),
  coachTip: document.querySelector("#coachTip"),
  sectionTitle: document.querySelector("#sectionTitle"),
  sectionGoal: document.querySelector("#sectionGoal"),
  sectionMeter: document.querySelector("#sectionMeter"),
  masteryText: document.querySelector("#masteryText"),
  questionSection: document.querySelector("#questionSection"),
  questionMastery: document.querySelector("#questionMastery"),
  questionSource: document.querySelector("#questionSource"),
  questionText: document.querySelector("#questionText"),
  options: document.querySelector("#options"),
  feedback: document.querySelector("#feedback"),
  resultLine: document.querySelector("#resultLine"),
  explanation: document.querySelector("#explanation"),
  relevantTheory: document.querySelector("#relevantTheory"),
  nextButton: document.querySelector("#nextButton"),
  restartButton: document.querySelector("#restartButton")
};

function getExamDate() {
  const now = new Date();
  let examDate = new Date(now.getFullYear(), 5, 8, 0, 0, 0);
  if (now > examDate) examDate = new Date(now.getFullYear() + 1, 5, 8, 0, 0, 0);
  return examDate;
}

function updateCountdown() {
  const remaining = Math.max(0, getExamDate() - new Date());
  els.countdownDays.textContent = Math.floor(remaining / 86400000);
  els.countdownHours.textContent = Math.floor((remaining % 86400000) / 3600000);
}

function classifyQuestion(question) {
  const haystack = `${question.question} ${question.relevantTheory} ${question.source}`;
  const match = SECTION_RULES.find(([, pattern]) => pattern.test(haystack));
  return match ? match[0] : "Mixed Review";
}

function decorateQuestions(questions) {
  return questions.map((question) => ({
    ...question,
    deck: question.deck || "question-bank",
    moduleId: question.moduleId || null,
    section: question.section || classifyQuestion(question)
  }));
}

function isStudyReady(question) {
  return question.diagramRequired !== true;
}

function loadJson(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback));
  } catch {
    return fallback;
  }
}

function loadProgress() {
  const saved = loadJson(STORAGE_KEYS.progress, state.progress);
  state.progress = {
    xp: Number(saved.xp) || 0,
    streak: Number(saved.streak) || 0,
    bestStreak: Number(saved.bestStreak) || 0,
    cards: saved.cards && typeof saved.cards === "object" ? saved.cards : {}
  };

  const oldMissed = loadJson(STORAGE_KEYS.missed, []);
  state.reviewIds = new Set([
    ...oldMissed.filter(Number.isInteger),
    ...Object.entries(state.progress.cards)
      .filter(([, card]) => card.wrong > 0 && !card.mastered)
      .map(([id]) => Number(id))
  ]);
}

function saveProgress() {
  localStorage.setItem(STORAGE_KEYS.progress, JSON.stringify(state.progress));
  localStorage.setItem(STORAGE_KEYS.missed, JSON.stringify([...state.reviewIds]));
}

function cardProgress(id) {
  const key = String(id);
  if (!state.progress.cards[key]) {
    state.progress.cards[key] = {
      attempts: 0,
      correct: 0,
      wrong: 0,
      streak: 0,
      mastered: false,
      lastSeen: 0
    };
  }
  return state.progress.cards[key];
}

function deckQuestions(deck) {
  if (deck === "all") return state.allQuestions;
  return state.allQuestions.filter((question) => question.deck === deck);
}

function topicQuestions(topic) {
  return state.allQuestions.filter((question) => question.section === topic);
}

function moduleQuestions(moduleId) {
  return state.allQuestions.filter((question) => question.moduleId === moduleId);
}

function masteredIn(questions) {
  return questions.filter((question) => cardProgress(question.id).mastered).length;
}

function updateHome() {
  const level = Math.floor(state.progress.xp / XP_PER_LEVEL) + 1;
  els.homeLevelText.textContent = `Level ${level}`;
  els.homeXpText.textContent = `${state.progress.xp} XP`;
  els.allCardCount.textContent = `${state.allQuestions.length} cards`;
  els.bankCardCount.textContent = `${deckQuestions("question-bank").length} cards`;
  els.dueCardCount.textContent = `${state.reviewIds.size} cards`;
  els.selfCardCount.textContent = `${deckQuestions("self-assessment").length} cards`;
  renderTopics();
  renderLectures();
}

function sections() {
  return [...new Set(state.allQuestions.map((question) => question.section))];
}

function renderTopics() {
  els.topicGrid.replaceChildren();
  sections().forEach((section) => {
    const questions = topicQuestions(section);
    const card = choiceCard(section, `${masteredIn(questions)}/${questions.length} mastered`, "Practice only this topic.");
    card.addEventListener("click", () => startSession({
      title: section,
      subtitle: "Topic practice",
      questions
    }));
    els.topicGrid.append(card);
  });
}

function renderLectures() {
  els.lectureGrid.replaceChildren();
  const lectures = state.contentMap.modules.filter((module) => module.deck === "slides");
  lectures.forEach((lecture) => {
    const questions = moduleQuestions(lecture.id);
    const card = choiceCard(lecture.title, `${questions.length} cards`, questions.length
      ? "Professor-style questions generated from this lecture."
      : "Ready for generated cards from slides plus notes."
    );
    if (!questions.length) card.classList.add("empty");
    card.addEventListener("click", () => startSession({
      title: lecture.title,
      subtitle: "Lecture practice",
      questions,
      emptyDeck: {
        deck: "slides",
        moduleId: lecture.id,
        source: lecture.source
      }
    }));
    els.lectureGrid.append(card);
  });
}

function choiceCard(title, count, detail) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "choice-card";
  button.innerHTML = "<strong></strong><span></span><small></small>";
  button.querySelector("strong").textContent = title;
  button.querySelector("span").textContent = count;
  button.querySelector("small").textContent = detail;
  return button;
}

function startSession({ title, subtitle, questions, emptyDeck = null }) {
  state.currentTitle = title;
  state.currentSubtitle = subtitle;
  state.activeQuestions = questions;
  state.correct = 0;
  state.wrong = 0;
  state.seenIds.clear();
  state.current = null;
  els.homeScreen.hidden = true;
  els.quizScreen.hidden = false;
  els.activePath.textContent = subtitle;
  els.quizTitle.textContent = title;

  if (!questions.length) {
    renderEmptyDeck(emptyDeck);
    return;
  }

  renderQuestion();
}

function scoreCandidate(question) {
  const progress = cardProgress(question.id);
  let score = Math.random();
  if (state.reviewIds.has(question.id)) score += 100;
  if (!progress.attempts) score += 30;
  if (progress.wrong > progress.correct) score += 20;
  if (!progress.mastered) score += 10;
  score -= progress.streak * 4;
  return score;
}

function chooseNextQuestion() {
  const due = state.activeQuestions.filter((question) => state.reviewIds.has(question.id));
  const poolBase = due.length ? due : state.activeQuestions;
  const unseen = poolBase.filter((question) => !state.seenIds.has(question.id));
  const pool = unseen.length ? unseen : poolBase;
  return [...pool].sort((a, b) => scoreCandidate(b) - scoreCandidate(a))[0] || null;
}

function courseMastery() {
  if (!state.activeQuestions.length) return 0;
  return Math.round((masteredIn(state.activeQuestions) / state.activeQuestions.length) * 100);
}

function masteryLabel(question) {
  const progress = cardProgress(question.id);
  if (progress.mastered) return "Mastered";
  if (state.reviewIds.has(question.id)) return "Review";
  if (!progress.attempts) return "New";
  if (progress.streak === 1) return "Learning";
  return "Practice";
}

function updateStats() {
  const answered = state.correct + state.wrong;
  const total = state.activeQuestions.length;
  const accuracy = answered ? Math.round((state.correct / answered) * 100) : 0;
  els.questionProgress.textContent = `${answered}/${total}`;
  els.correctCount.textContent = state.correct;
  els.wrongCount.textContent = state.wrong;
  els.reviewCount.textContent = state.reviewIds.size;

  const level = Math.floor(state.progress.xp / XP_PER_LEVEL) + 1;
  const levelXp = state.progress.xp % XP_PER_LEVEL;
  els.levelText.textContent = `Level ${level}`;
  els.xpText.textContent = `${state.progress.xp} XP`;
  els.xpMeter.style.width = `${Math.round((levelXp / XP_PER_LEVEL) * 100)}%`;

  const roundProgress = total ? Math.min(100, Math.round((answered / total) * 100)) : 0;
  els.sectionTitle.textContent = "This round";
  els.sectionGoal.textContent = `${roundProgress}% done`;
  els.sectionMeter.style.width = `${roundProgress}%`;
  const mastered = masteredIn(state.activeQuestions);
  els.masteryText.textContent = `${mastered}/${total} mastered overall. Accuracy this round: ${accuracy}%`;
  els.coachTip.textContent = coachTip();
}

function coachTip() {
  const answered = state.correct + state.wrong;
  if (state.wrong > 0) return "Missed cards are saved for review until you answer them correctly twice in a row.";
  if (!answered) return "Pick the best answer, then read the explanation like it is the mini-lecture.";
  if (state.progress.streak >= 5) return `Streak ${state.progress.streak}. Keep it rolling for bonus XP.`;
  return "Nice. Mastery means two correct answers in a row on the same card.";
}

function renderQuestion() {
  state.current = chooseNextQuestion();
  state.answered = false;

  if (!state.current) {
    renderEmptyDeck(null);
    return;
  }

  updateStats();
  const question = state.current;
  els.questionSource.textContent = question.source;
  els.questionSection.textContent = question.section;
  els.questionMastery.textContent = masteryLabel(question);
  els.questionText.textContent = question.question;
  els.feedback.hidden = true;
  els.resultLine.className = "result-line";
  els.explanation.textContent = "";
  els.relevantTheory.textContent = "";
  els.nextButton.disabled = true;
  els.options.replaceChildren();

  Object.entries(question.options).forEach(([letter, text]) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "option-button";
    button.dataset.option = letter;
    button.innerHTML = `
      <span class="option-letter">${letter}</span>
      <span class="option-text"></span>
    `;
    button.querySelector(".option-text").textContent = text;
    button.addEventListener("click", () => answerQuestion(letter));
    els.options.append(button);
  });
}

function answerQuestion(selected) {
  if (state.answered || !state.current) return;

  const question = state.current;
  const progress = cardProgress(question.id);
  const isCorrect = selected === question.correctAnswer;
  state.answered = true;
  state.seenIds.add(question.id);
  progress.attempts += 1;
  progress.lastSeen = Date.now();

  if (isCorrect) {
    state.correct += 1;
    state.progress.streak += 1;
    state.progress.bestStreak = Math.max(state.progress.bestStreak, state.progress.streak);
    progress.correct += 1;
    progress.streak += 1;
    state.progress.xp += 10 + Math.min(10, state.progress.streak);
    if (progress.streak >= 2) {
      progress.mastered = true;
      state.reviewIds.delete(question.id);
    }
  } else {
    state.wrong += 1;
    state.progress.streak = 0;
    progress.wrong += 1;
    progress.streak = 0;
    progress.mastered = false;
    state.reviewIds.add(question.id);
    state.progress.xp += 2;
  }

  saveProgress();
  paintAnsweredOptions(selected, question.correctAnswer, isCorrect);
  showFeedback(question, isCorrect);
  updateStats();
}

function paintAnsweredOptions(selected, correct, isCorrect) {
  document.querySelectorAll(".option-button").forEach((button) => {
    const option = button.dataset.option;
    button.disabled = true;
    if (option === correct) button.classList.add("correct");
    if (option === selected && !isCorrect) button.classList.add("wrong");
  });
}

function showFeedback(question, isCorrect) {
  const progress = cardProgress(question.id);
  els.resultLine.textContent = isCorrect
    ? `Correct. Answer ${question.correctAnswer}.`
    : `Wrong. Correct answer: ${question.correctAnswer}.`;
  els.resultLine.classList.add(isCorrect ? "correct" : "wrong");
  els.explanation.textContent = question.explanation;
  els.relevantTheory.textContent = `${question.relevantTheory} Mastery status: ${progress.mastered ? "mastered" : `${progress.streak}/2 correct streak needed`}.`;
  els.feedback.hidden = false;
  els.nextButton.disabled = false;
}

function renderEmptyDeck(emptyDeck) {
  state.answered = true;
  updateStats();
  els.questionSource.textContent = emptyDeck?.source || "Content architecture ready";
  els.questionSection.textContent = state.currentSubtitle || "Study set";
  els.questionMastery.textContent = "No cards yet";
  const isDueReview = state.currentTitle === "Due review";
  els.questionText.textContent = isDueReview
    ? "No review cards are due right now."
    : `${state.currentTitle} does not have generated cards yet.`;
  els.options.replaceChildren();
  els.feedback.hidden = false;
  els.resultLine.className = "result-line";
  els.resultLine.textContent = isDueReview
    ? "Missed cards will appear here automatically after a practice session."
    : "This study set is ready for generated professor-style questions.";
  els.explanation.textContent = isDueReview
    ? "Use Everything, Exam bank, a topic, or a lecture to keep studying. Any card answered incorrectly is saved here until you answer it correctly twice in a row."
    : emptyDeck
    ? `Future cards should use deck="${emptyDeck.deck}" and moduleId="${emptyDeck.moduleId}". The AI must create questions from the lecture theory; the slides do not contain the questions.`
    : "Future cards should be added to data/questions.json using the shared schema.";
  els.relevantTheory.textContent = "For slide lectures, questions should be based on what the professor would ask after teaching the slide content. Notes are support material only, used to fill in missing explanation.";
  els.nextButton.disabled = true;
}

function goHome() {
  els.quizScreen.hidden = true;
  els.homeScreen.hidden = false;
  state.current = null;
  state.answered = false;
  updateHome();
}

async function init() {
  updateCountdown();
  window.setInterval(updateCountdown, 60 * 60 * 1000);
  const decoratedQuestions = decorateQuestions(window.TMM_QUESTIONS || []);
  state.skippedQuestions = decoratedQuestions.filter((question) => !isStudyReady(question));
  state.allQuestions = decoratedQuestions.filter(isStudyReady);
  state.contentMap = window.TMM_CONTENT_MAP || { decks: [], modules: [] };
  loadProgress();
  updateHome();
}

document.querySelectorAll("[data-study]").forEach((button) => {
  button.addEventListener("click", () => {
    const study = button.dataset.study;
    if (study === "all") {
      startSession({ title: "Everything", subtitle: "Mixed review", questions: state.allQuestions });
    } else if (study === "due") {
      startSession({
        title: "Due review",
        subtitle: "Spaced review",
        questions: state.allQuestions.filter((question) => state.reviewIds.has(question.id))
      });
    } else {
      startSession({
        title: button.querySelector("strong").textContent,
        subtitle: "Study set",
        questions: deckQuestions(study),
        emptyDeck: { deck: study, moduleId: null }
      });
    }
  });
});

els.nextButton.addEventListener("click", renderQuestion);
els.restartButton.addEventListener("click", () => startSession({
  title: state.currentTitle,
  subtitle: state.currentSubtitle,
  questions: state.activeQuestions
}));
els.backHomeButton.addEventListener("click", goHome);

init().catch((error) => {
  els.questionText.textContent = error.message;
  els.questionSource.textContent = "Load error";
});
