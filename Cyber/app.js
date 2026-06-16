const STORAGE_KEYS = {
  progress: "cyber-study-progress-v1"
};

const MASTERED_STREAK = 2;
const XP_PER_CORRECT = 10;
const XP_PER_LEVEL = 120;
const RECENT_GAP = 3;

const state = {
  contentMap: window.CYBER_CONTENT_MAP || { exam: {}, decks: [], modules: [] },
  allQuestions: [],
  activeQuestions: [],
  current: null,
  currentDeck: "all",
  currentTitle: "Mixed Cyber drill",
  currentSubtitle: "",
  answered: false,
  correct: 0,
  wrong: 0,
  seenIds: new Set(),
  recentIds: [],
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
  countdownMinutes: document.querySelector("#countdownMinutes"),
  countdownLabel: document.querySelector("#countdownLabel"),
  continueButton: document.querySelector("#continueButton"),
  totalProgress: document.querySelector("#totalProgress"),
  homeXp: document.querySelector("#homeXp"),
  homeLevel: document.querySelector("#homeLevel"),
  dueCount: document.querySelector("#dueCount"),
  bestStreak: document.querySelector("#bestStreak"),
  lectureCardCount: document.querySelector("#lectureCardCount"),
  reviewCardCount: document.querySelector("#reviewCardCount"),
  allCardCount: document.querySelector("#allCardCount"),
  moduleGrid: document.querySelector("#moduleGrid"),
  homeButton: document.querySelector("#homeButton"),
  activePath: document.querySelector("#activePath"),
  quizTitle: document.querySelector("#quizTitle"),
  questionProgress: document.querySelector("#questionProgress"),
  correctCount: document.querySelector("#correctCount"),
  wrongCount: document.querySelector("#wrongCount"),
  streakCount: document.querySelector("#streakCount"),
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

function loadProgress() {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.progress);
    if (stored) state.progress = { ...state.progress, ...JSON.parse(stored) };
  } catch {
    saveProgress();
  }
}

function saveProgress() {
  localStorage.setItem(STORAGE_KEYS.progress, JSON.stringify(state.progress));
}

function getExamDate() {
  const exam = state.contentMap.exam || {};
  const now = new Date();
  let target = new Date(
    now.getFullYear(),
    Number.isInteger(exam.monthIndex) ? exam.monthIndex : 5,
    Number.isInteger(exam.day) ? exam.day : 26,
    Number.isInteger(exam.hour) ? exam.hour : 0,
    Number.isInteger(exam.minute) ? exam.minute : 0,
    0
  );
  if (now > target) {
    target = new Date(
      now.getFullYear() + 1,
      Number.isInteger(exam.monthIndex) ? exam.monthIndex : 5,
      Number.isInteger(exam.day) ? exam.day : 26,
      Number.isInteger(exam.hour) ? exam.hour : 0,
      Number.isInteger(exam.minute) ? exam.minute : 0,
      0
    );
  }
  return target;
}

function updateCountdown() {
  const remaining = Math.max(0, getExamDate() - new Date());
  els.countdownDays.textContent = Math.floor(remaining / 86400000);
  els.countdownHours.textContent = Math.floor((remaining % 86400000) / 3600000);
  els.countdownMinutes.textContent = Math.floor((remaining % 3600000) / 60000);
  els.countdownLabel.textContent = `until ${state.contentMap.exam?.dateLabel || "June 26"}`;
}

function normalizeQuestions() {
  state.allQuestions = (window.CYBER_QUESTIONS || []).map((question) => ({
    deck: "slides",
    sourceType: "slides",
    difficulty: "medium",
    cardType: "definition",
    trapTags: [],
    ...question
  }));
}

function cardProgress(id) {
  if (!state.progress.cards[id]) {
    state.progress.cards[id] = {
      correct: 0,
      wrong: 0,
      correctStreak: 0,
      due: false,
      lastSeen: 0
    };
  }
  return state.progress.cards[id];
}

function isMastered(question) {
  return cardProgress(question.id).correctStreak >= MASTERED_STREAK;
}

function isDue(question) {
  const progress = cardProgress(question.id);
  return progress.due || progress.wrong > progress.correct;
}

function questionsForModule(moduleId) {
  return state.allQuestions.filter((question) => question.moduleId === moduleId);
}

function questionsForLecture(lectureId) {
  return state.allQuestions.filter((question) => question.lectureId === lectureId);
}

function moduleMeta(moduleId) {
  return state.contentMap.modules.find((module) => module.id === moduleId);
}

function lectureMeta(lectureId) {
  for (const module of state.contentMap.modules) {
    const lecture = module.lectures.find((item) => item.id === lectureId);
    if (lecture) return { ...lecture, module };
  }
  return null;
}

function masteredCount(questions) {
  return questions.filter(isMastered).length;
}

function levelFromXp(xp) {
  return Math.floor(xp / XP_PER_LEVEL) + 1;
}

function percent(part, total) {
  if (!total) return 0;
  return Math.round((part / total) * 100);
}

function shuffle(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function formatCount(count, label) {
  return `${count} ${label}${count === 1 ? "" : "s"}`;
}

function updateHomeStats() {
  const total = state.allQuestions.length;
  const mastered = masteredCount(state.allQuestions);
  const due = state.allQuestions.filter(isDue).length;
  const slideCount = state.allQuestions.filter((question) => question.deck === "slides").length;

  els.totalProgress.textContent = `${mastered}/${total}`;
  els.homeXp.textContent = `${state.progress.xp} XP`;
  els.homeLevel.textContent = `level ${levelFromXp(state.progress.xp)}`;
  els.dueCount.textContent = due;
  els.bestStreak.textContent = state.progress.bestStreak;
  els.lectureCardCount.textContent = `${formatCount(slideCount, "card")} ready`;
  els.reviewCardCount.textContent = `${formatCount(due, "card")} waiting`;
  els.allCardCount.textContent = `${formatCount(total, "card")} total`;
}

function renderModules() {
  els.moduleGrid.innerHTML = "";
  state.contentMap.modules.forEach((module) => {
    const moduleQuestions = questionsForModule(module.id);
    const mastered = masteredCount(moduleQuestions);
    const completion = percent(mastered, moduleQuestions.length);
    const card = document.createElement("article");
    card.className = "module-card";
    card.innerHTML = `
      <div class="module-title-row">
        <h3>${module.title}</h3>
        <span class="module-count">${mastered}/${moduleQuestions.length}</span>
      </div>
      <p>${module.description}</p>
      <div class="progress-line" aria-label="${completion}% mastered"><span style="width:${completion}%"></span></div>
      <div class="lecture-list"></div>
    `;

    card.addEventListener("click", () => {
      if (moduleQuestions.length) startSession(moduleQuestions, module.title, module.section, "module");
    });

    const lectureList = card.querySelector(".lecture-list");
    module.lectures.forEach((lecture) => {
      const lectureQuestions = questionsForLecture(lecture.id);
      const lectureMastered = masteredCount(lectureQuestions);
      const chip = document.createElement("button");
      chip.className = "lecture-chip";
      chip.type = "button";
      chip.innerHTML = `
        <strong>${lecture.title}</strong>
        <small>${lectureMastered}/${lectureQuestions.length} mastered</small>
      `;
      chip.addEventListener("click", (event) => {
        event.stopPropagation();
        if (lectureQuestions.length) startSession(lectureQuestions, lecture.title, module.title, "lecture");
      });
      lectureList.append(chip);
    });

    els.moduleGrid.append(card);
  });
}

function showHome() {
  els.quizScreen.hidden = true;
  els.homeScreen.hidden = false;
  renderModules();
  updateHomeStats();
}

function showQuiz() {
  els.homeScreen.hidden = true;
  els.quizScreen.hidden = false;
}

function sortForStudy(questions) {
  return [...questions].sort((a, b) => {
    const aProgress = cardProgress(a.id);
    const bProgress = cardProgress(b.id);
    const aScore = (aProgress.due ? -30 : 0) + aProgress.correctStreak * 8 + aProgress.lastSeen;
    const bScore = (bProgress.due ? -30 : 0) + bProgress.correctStreak * 8 + bProgress.lastSeen;
    return aScore - bScore;
  });
}

function startSession(questions, title, subtitle = "", deck = "all") {
  const ready = questions.filter(Boolean);
  state.activeQuestions = sortForStudy(ready);
  state.currentDeck = deck;
  state.currentTitle = title;
  state.currentSubtitle = subtitle;
  state.correct = 0;
  state.wrong = 0;
  state.answered = false;
  state.seenIds = new Set();
  state.recentIds = [];

  els.quizTitle.textContent = title;
  els.activePath.textContent = subtitle || "Cyber";
  showQuiz();
  nextQuestion();
}

function startByDeck(deck) {
  if (deck === "due") {
    const dueQuestions = state.allQuestions.filter(isDue);
    startSession(dueQuestions.length ? dueQuestions : state.allQuestions, "Review mistakes", "Adaptive review", "due");
    return;
  }

  if (deck === "slides") {
    const firstUnfinished = state.contentMap.modules.find((module) => masteredCount(questionsForModule(module.id)) < questionsForModule(module.id).length);
    if (firstUnfinished) {
      startSession(questionsForModule(firstUnfinished.id), firstUnfinished.title, "Lecture path", "slides");
      return;
    }
  }

  startSession(shuffle(state.allQuestions), "Mixed Cyber drill", "Everything", "all");
}

function chooseNextQuestion() {
  if (!state.activeQuestions.length) return null;

  const unseen = state.activeQuestions.filter((question) => !state.seenIds.has(question.id));
  const pool = unseen.length ? unseen : state.activeQuestions;
  const spaced = pool.filter((question) => !state.recentIds.includes(question.id));
  const candidates = spaced.length ? spaced : pool;

  return sortForStudy(candidates)[0] || candidates[0];
}

function nextQuestion() {
  const question = chooseNextQuestion();
  if (!question) {
    renderEmptyState();
    return;
  }

  state.current = question;
  state.answered = false;
  state.seenIds.add(question.id);
  state.recentIds.push(question.id);
  if (state.recentIds.length > RECENT_GAP) state.recentIds.shift();

  const progress = cardProgress(question.id);
  progress.lastSeen = Date.now();
  saveProgress();

  renderQuestion(question);
}

function renderEmptyState() {
  els.questionProgress.textContent = "0/0";
  els.questionSection.textContent = "No cards yet";
  els.questionMastery.textContent = "Waiting";
  els.questionSource.textContent = "";
  els.questionText.textContent = "No cards are available for this session yet.";
  els.options.innerHTML = "";
  els.feedback.hidden = true;
  els.nextButton.disabled = true;
  updateSessionStats();
}

function renderQuestion(question) {
  const progress = cardProgress(question.id);
  const module = moduleMeta(question.moduleId);
  const lecture = lectureMeta(question.lectureId);
  const optionEntries = shuffle(Object.entries(question.options).map(([key, text]) => ({ key, text })));

  els.questionProgress.textContent = `${Math.min(state.seenIds.size, state.activeQuestions.length)}/${state.activeQuestions.length}`;
  els.questionSection.textContent = question.section || module?.section || "Cyber";
  els.questionMastery.textContent = progress.correctStreak >= MASTERED_STREAK ? "Mastered" : progress.due ? "Coming back" : "New";
  els.questionSource.textContent = question.source || lecture?.source || module?.title || "";
  els.questionText.textContent = question.question;
  els.options.innerHTML = "";
  els.feedback.hidden = true;
  els.feedback.className = "feedback";
  els.nextButton.disabled = true;

  optionEntries.forEach((option) => {
    const button = document.createElement("button");
    button.className = "option-button";
    button.type = "button";
    button.dataset.key = option.key;
    button.innerHTML = `<span>${option.key}</span><span>${option.text}</span>`;
    button.addEventListener("click", () => answerQuestion(option.key));
    els.options.append(button);
  });

  updateSessionStats();
}

function answerQuestion(selectedKey) {
  if (state.answered || !state.current) return;
  state.answered = true;

  const question = state.current;
  const correct = selectedKey === question.correctAnswer;
  const progress = cardProgress(question.id);

  if (correct) {
    state.correct += 1;
    state.progress.xp += XP_PER_CORRECT;
    state.progress.streak += 1;
    state.progress.bestStreak = Math.max(state.progress.bestStreak, state.progress.streak);
    progress.correct += 1;
    progress.correctStreak += 1;
    if (progress.correctStreak >= MASTERED_STREAK) progress.due = false;
  } else {
    state.wrong += 1;
    state.progress.streak = 0;
    progress.wrong += 1;
    progress.correctStreak = 0;
    progress.due = true;
  }

  saveProgress();
  renderAnswer(selectedKey, correct);
  updateSessionStats();
  updateHomeStats();
}

function renderAnswer(selectedKey, correct) {
  const question = state.current;
  [...els.options.querySelectorAll(".option-button")].forEach((button) => {
    button.disabled = true;
    if (button.dataset.key === question.correctAnswer) button.classList.add("correct");
    if (button.dataset.key === selectedKey && !correct) button.classList.add("wrong");
  });

  els.resultLine.textContent = correct
    ? `Correct. Answer ${question.correctAnswer}.`
    : `Wrong. Correct answer: ${question.correctAnswer}.`;
  els.explanation.textContent = question.explanation || "No explanation yet.";
  els.relevantTheory.textContent = question.relevantTheory || "No relevant theory yet.";
  els.feedback.className = `feedback ${correct ? "correct" : "wrong"}`;
  els.feedback.hidden = false;
  els.nextButton.disabled = false;
}

function updateSessionStats() {
  els.correctCount.textContent = state.correct;
  els.wrongCount.textContent = state.wrong;
  els.streakCount.textContent = state.progress.streak;
}

function wireEvents() {
  document.querySelectorAll("[data-study]").forEach((button) => {
    button.addEventListener("click", () => startByDeck(button.dataset.study));
  });

  els.continueButton.addEventListener("click", () => startByDeck("slides"));
  els.homeButton.addEventListener("click", showHome);
  els.nextButton.addEventListener("click", nextQuestion);
  els.restartButton.addEventListener("click", () => startSession(state.activeQuestions, state.currentTitle, state.currentSubtitle, state.currentDeck));
}

function init() {
  loadProgress();
  normalizeQuestions();
  wireEvents();
  renderModules();
  updateHomeStats();
  updateCountdown();
  setInterval(updateCountdown, 30000);
}

init();

