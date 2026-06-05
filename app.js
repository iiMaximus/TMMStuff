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
const RECENT_CARD_GAP = 3;
const OPTION_MARKERS = ["1", "2", "3", "4"];
const GRAPH_DECK = "graph-questions";
const LECTURE_PLAN_START = new Date(2026, 4, 20);
const LECTURE_BREAK_INTERVAL = 4;
const LECTURE_FINAL_BREAK_START_INDEX = 13;
const DAY_MS = 24 * 60 * 60 * 1000;
const DATE_FORMATTER = new Intl.DateTimeFormat(undefined, {
  month: "short",
  day: "numeric"
});
const TTT_TUTORIAL_STEPS = [
  {
    id: "map",
    kicker: "Step 1",
    title: "Read the map before reading the path.",
    text: "A TTT diagram starts from fully austenitized steel. The vertical axis is temperature, the horizontal axis is time, and the C-shaped curves tell you when austenite starts and finishes transforming at a given temperature.",
    bullets: [
      "Above the start curve, the structure is still austenite, A.",
      "A1 is the eutectoid/austenite-pearlite reference line used in the professor's TTT questions.",
      "Ms, M90 and Mf are martensite reference lines, not equilibrium Fe-C phase boundaries."
    ],
    rule: "First name the field. Do not jump straight to the final answer until you know whether the path is still in A, inside product + A, or below Ms.",
    path: "M125 60 L250 60",
    point: [250, 60],
    label: ["100% A before transformation", 266, 54],
    badge: "Start with austenite",
    focus: "No product has formed until a start curve is crossed."
  },
  {
    id: "start-finish",
    kicker: "Step 2",
    title: "Crossing a start curve means product plus remaining austenite.",
    text: "The left C-curve is the start of transformation and the right curve or percentage line is completion. If the path enters but does not finish a region, only part of the austenite has transformed.",
    bullets: [
      "Inside the pearlite field, write P + A until pearlite is complete.",
      "Inside a ferrite field, write F + A until ferrite formation finishes.",
      "If a cooling path leaves the field early, the remaining A continues to the next lower reaction."
    ],
    rule: "The professor often asks for field names like P+A or M+A. The +A is the leftover austenite, not a new stable room-temperature phase.",
    path: "M125 60 L125 150 L280 150",
    point: [280, 150],
    label: ["P + remaining A", 300, 142],
    badge: "Partial transformation",
    focus: "Product amount is controlled by how far and how long the path sits inside the region."
  },
  {
    id: "bainite",
    kicker: "Step 3",
    title: "Place bainite between pearlite and martensite.",
    text: "Bainite forms below the pearlite region and above Ms. The course/exam labels usually split it into upper bainite, BU, at higher bainitic temperature and lower bainite, BL, closer to Ms.",
    bullets: [
      "BU is the higher-temperature bainite product.",
      "BL is the lower-temperature bainite product and is commonly grouped near martensite in exam mixtures.",
      "The bainitic bay is a delay/notch in the TTT curves; exam traps link it to fast nucleation but slow growth or to alloying elements such as Cr, Mo or Ni in the shown steel."
    ],
    rule: "If the path holds in the bainite range, call the transformed part BU or BL by height on the diagram. Carry any untransformed A onward.",
    path: "M125 60 L125 282 L245 282 L245 374",
    point: [245, 282],
    label: ["Partial bainite hold", 260, 272],
    badge: "Bainite range",
    focus: "Higher bainite field gives BU; lower bainite field gives BL."
  },
  {
    id: "martensite",
    kicker: "Step 4",
    title: "Below Ms, remaining austenite becomes martensite only partly.",
    text: "Martensite is diffusionless. It begins at Ms and increases as temperature falls toward M90 or Mf. If the path does not transform all austenite, the rest is residual or retained austenite, AR.",
    bullets: [
      "M means martensite formed from the austenite still left when the path crossed Ms.",
      "M + AR means some austenite transformed to martensite and some remained.",
      "More carbon and austenitizing alloying elements can lower Ms and increase residual austenite."
    ],
    rule: "Do not convert the whole steel to martensite if some austenite already became P, F or B earlier. Martensite only comes from the austenite still remaining.",
    path: "M125 60 L125 365 L390 365",
    point: [390, 365],
    label: ["M + AR", 408, 356],
    badge: "Quench below Ms",
    focus: "Residual austenite is the untransformed remainder at room temperature."
  },
  {
    id: "fractions",
    kicker: "Step 5",
    title: "For percentage questions, keep a running balance.",
    text: "The professor's diagram questions are usually approximate. You read a fraction from the curve or labeled path, subtract it from the remaining austenite, and then continue to the next segment.",
    bullets: [
      "Start at 100% A.",
      "If 50% becomes P, only the remaining 50% can later become BL, M or AR.",
      "Final answers often look like 50%P + 45%TM+BL + 5%AR because the path produced products in stages."
    ],
    rule: "The right answer is the best approximate mixture from the path, not the prettiest exact calculation. If the prompt says neglect below 5%, omit tiny products.",
    path: "M125 60 L125 150 L250 150 L250 292 L265 292 L265 374",
    point: [265, 292],
    label: ["Stage 2: BL/TM", 286, 280],
    badge: "Staged answer",
    focus: "Each product consumes only the austenite available at that moment."
  },
  {
    id: "traps",
    kicker: "Step 6",
    title: "Watch the professor's recurring traps.",
    text: "The graph questions mix TTT reading with Fe-C symbols, steel names and shorthand region labels. Most wrong answers come from treating every A as final austenite or forgetting which critical line is being shown.",
    bullets: [
      "A1, A3 and Acm are different critical lines; do not choose the familiar one automatically.",
      "P is pearlite, a ferrite + cementite microconstituent, not a single phase.",
      "Ni can lower Ms; hardenability promoters shift transformation curves to longer times, often down-right in the exam wording."
    ],
    rule: "Read the exact figure label first. Region names like R, G or C are not universal; they mean whatever field that label touches in the shown diagram.",
    path: "M125 60 L125 118 L356 118 M125 60 L125 340 L560 340",
    point: [560, 340],
    label: ["Labels depend on the exact figure", 474, 332],
    badge: "Exam traps",
    focus: "Use the diagram's fields, not memorized letter names."
  }
];

const state = {
  allQuestions: [],
  graphQuestions: [],
  skippedQuestions: [],
  activeQuestions: [],
  contentMap: { decks: [], modules: [] },
  current: null,
  currentDeck: null,
  currentTitle: "Exam bank",
  currentSubtitle: "",
  shuffleQuestions: false,
  correct: 0,
  wrong: 0,
  answered: false,
  seenIds: new Set(),
  recentIds: [],
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
  tutorialScreen: document.querySelector("#tutorialScreen"),
  countdownDays: document.querySelector("#countdownDays"),
  countdownHours: document.querySelector("#countdownHours"),
  countdownMinutes: document.querySelector("#countdownMinutes"),
  homeLevelText: document.querySelector("#homeLevelText"),
  homeXpText: document.querySelector("#homeXpText"),
  allCardCount: document.querySelector("#allCardCount"),
  bankCardCount: document.querySelector("#bankCardCount"),
  dueCardCount: document.querySelector("#dueCardCount"),
  selfCardCount: document.querySelector("#selfCardCount"),
  graphCardCount: document.querySelector("#graphCardCount"),
  dailyPlanBanner: document.querySelector("#dailyPlanBanner"),
  dailyBannerKicker: document.querySelector("#dailyBannerKicker"),
  dailyBannerTitle: document.querySelector("#dailyBannerTitle"),
  dailyBannerText: document.querySelector("#dailyBannerText"),
  dailyBannerButton: document.querySelector("#dailyBannerButton"),
  topicGrid: document.querySelector("#topicGrid"),
  lectureGrid: document.querySelector("#lectureGrid"),
  selfGrid: document.querySelector("#selfGrid"),
  lectureFocusButton: document.querySelector("#lectureFocusButton"),
  lecturePicker: document.querySelector("#lecturePicker"),
  tttTutorialButton: document.querySelector("#tttTutorialButton"),
  tutorialHomeButton: document.querySelector("#tutorialHomeButton"),
  tutorialStepButtons: document.querySelectorAll("[data-ttt-step]"),
  tutorialKicker: document.querySelector("#tutorialKicker"),
  tutorialStepTitle: document.querySelector("#tutorialStepTitle"),
  tutorialStepText: document.querySelector("#tutorialStepText"),
  tutorialStepList: document.querySelector("#tutorialStepList"),
  tutorialProfessorRule: document.querySelector("#tutorialProfessorRule"),
  tutorialPathLine: document.querySelector("#tutorialPathLine"),
  tutorialPathGhost: document.querySelector("#tutorialPathGhost"),
  tutorialPathPoint: document.querySelector("#tutorialPathPoint"),
  tutorialPathLabel: document.querySelector("#tutorialPathLabel"),
  tutorialPathBadge: document.querySelector("#tutorialPathBadge"),
  tutorialLegendFocus: document.querySelector("#tutorialLegendFocus"),
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
  questionVisual: document.querySelector("#questionVisual"),
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
  let examDate = new Date(now.getFullYear(), 5, 17, 0, 0, 0);
  if (now > examDate) examDate = new Date(now.getFullYear() + 1, 5, 17, 0, 0, 0);
  return examDate;
}

function updateCountdown() {
  const remaining = Math.max(0, getExamDate() - new Date());
  els.countdownDays.textContent = Math.floor(remaining / 86400000);
  els.countdownHours.textContent = Math.floor((remaining % 86400000) / 3600000);
  els.countdownMinutes.textContent = Math.floor((remaining % 3600000) / 60000);
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
  if (deck === GRAPH_DECK) return state.graphQuestions;
  if (deck === "all") return state.allQuestions;
  return state.allQuestions.filter((question) => question.deck === deck);
}

function formatSource(source) {
  return String(source || "")
    .split(";")
    .map((part) => {
      const trimmed = part.trim();
      const slash = trimmed.lastIndexOf("/");
      return slash >= 0 ? trimmed.slice(slash + 1) : trimmed;
    })
    .join("; ");
}

function shuffledOptionEntries(options) {
  const entries = Object.entries(options);
  for (let index = entries.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [entries[index], entries[swapIndex]] = [entries[swapIndex], entries[index]];
  }
  return entries;
}

function shuffledQuestions(questions) {
  const shuffled = [...questions];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }
  return shuffled;
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

function lectureModules() {
  return state.contentMap.modules.filter((module) => module.deck === "slides");
}

function startOfDay(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function lectureDueDate(index) {
  const breakDays = Math.floor((index + 1) / LECTURE_BREAK_INTERVAL);
  const finalBreakDays = index >= LECTURE_FINAL_BREAK_START_INDEX ? 1 : 0;
  return new Date(LECTURE_PLAN_START.getTime() + (index + breakDays + finalBreakDays) * DAY_MS);
}

function lectureScheduleStatus(dueDate, complete) {
  if (complete) return { text: "Done", state: "done" };
  const today = startOfDay(new Date());
  const dueDay = startOfDay(dueDate);
  if (today.getTime() > dueDay.getTime()) return { text: "You're behind", state: "behind" };
  if (today.getTime() === dueDay.getTime()) return { text: "Due today", state: "today" };
  return { text: "Upcoming", state: "upcoming" };
}

function addLectureSchedule(card, dueDate, complete) {
  const status = lectureScheduleStatus(dueDate, complete);
  const schedule = document.createElement("div");
  schedule.className = `lecture-schedule ${status.state}`;

  const due = document.createElement("span");
  due.textContent = `Due ${DATE_FORMATTER.format(dueDate)}`;

  const badge = document.createElement("strong");
  badge.textContent = status.text;

  schedule.append(due, badge);
  card.append(schedule);
}

function lecturePlanItem(lecture, index) {
  const questions = moduleQuestions(lecture.id);
  const mastered = masteredIn(questions);
  return {
    lecture,
    questions,
    mastered,
    complete: questions.length > 0 && mastered === questions.length,
    dueDate: lectureDueDate(index)
  };
}

function shortLectureTitle(title) {
  const match = String(title).match(/Lecture\s+\d+/i);
  return match ? match[0] : "lecture";
}

function startLectureSession(item, subtitle = "Lecture practice") {
  startSession({
    title: item.lecture.title,
    subtitle,
    questions: item.questions,
    emptyDeck: {
      deck: "slides",
      moduleId: item.lecture.id,
      source: item.lecture.source
    }
  });
}

function renderDailyPlanBanner() {
  const today = startOfDay(new Date()).getTime();
  const dueItems = lectureModules()
    .map((lecture, index) => lecturePlanItem(lecture, index))
    .filter((item) => item.questions.length && !item.complete && startOfDay(item.dueDate).getTime() <= today);
  const target = dueItems[0];

  if (!target) {
    els.dailyPlanBanner.hidden = true;
    return;
  }

  const targetDay = startOfDay(target.dueDate).getTime();
  const isBehind = today > targetDay;
  const remaining = target.questions.length - target.mastered;
  els.dailyPlanBanner.hidden = false;
  els.dailyPlanBanner.classList.toggle("is-behind", isBehind);
  els.dailyBannerKicker.textContent = isBehind
    ? `${dueItems.length} overdue ${dueItems.length === 1 ? "lecture" : "lectures"}`
    : "Today's target";
  els.dailyBannerTitle.textContent = isBehind
    ? "Yo, you gotta catch up on this."
    : "Yo, today's lecture is still waiting.";
  els.dailyBannerText.textContent = `${target.lecture.title}: ${target.mastered}/${target.questions.length} locked in, ${remaining} to go. Due ${DATE_FORMATTER.format(target.dueDate)}.`;
  els.dailyBannerButton.textContent = `Start ${shortLectureTitle(target.lecture.title)}`;
  els.dailyBannerButton.onclick = () => startLectureSession(target, isBehind ? "Catch-up lecture" : "Today's lecture");
}

function updateHome() {
  const level = Math.floor(state.progress.xp / XP_PER_LEVEL) + 1;
  els.homeLevelText.textContent = `Level ${level}`;
  els.homeXpText.textContent = `${state.progress.xp} XP`;
  els.allCardCount.textContent = `${state.allQuestions.length} cards`;
  els.bankCardCount.textContent = `${deckQuestions("question-bank").length} cards`;
  els.dueCardCount.textContent = `${state.reviewIds.size} cards`;
  els.selfCardCount.textContent = `${deckQuestions("self-assessment").length} cards`;
  els.graphCardCount.textContent = `${deckQuestions(GRAPH_DECK).length} cards`;
  renderDailyPlanBanner();
  renderTopics();
  renderLectures();
  renderSelfAssessments();
}

function sections() {
  return [...new Set(state.allQuestions.map((question) => question.section))];
}

function renderTopics() {
  els.topicGrid.replaceChildren();
  sections().forEach((section) => {
    const questions = topicQuestions(section);
    const card = choiceCard(section, `${masteredIn(questions)}/${questions.length} locked in`, "Target this area.");
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
  lectureModules().forEach((lecture, index) => {
    const item = lecturePlanItem(lecture, index);
    const countText = item.questions.length
      ? `${item.mastered}/${item.questions.length} locked in`
      : "0 cards";
    const detailText = item.questions.length
      ? `${item.questions.length} cards total`
      : "Waiting for cards.";
    const card = choiceCard(lecture.title, countText, detailText);
    if (!item.questions.length) card.classList.add("empty");
    addLectureSchedule(card, item.dueDate, item.complete);
    card.addEventListener("click", () => startLectureSession(item));
    els.lectureGrid.append(card);
  });
}

function renderSelfAssessments() {
  els.selfGrid.replaceChildren();
  const modules = state.contentMap.modules.filter((module) => module.deck === "self-assessment");
  modules.forEach((module) => {
    const questions = moduleQuestions(module.id);
    const mastered = masteredIn(questions);
    const card = choiceCard(module.title, questions.length
      ? `${mastered}/${questions.length} locked in`
      : "0 cards", questions.length
      ? `${questions.length} cards total`
      : "Waiting for cards."
    );
    if (!questions.length) card.classList.add("empty");
    card.addEventListener("click", () => startSession({
      title: module.title,
      subtitle: "Self-assessment",
      questions,
      emptyDeck: {
        deck: "self-assessment",
        moduleId: module.id,
        source: module.source
      }
    }));
    els.selfGrid.append(card);
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

function renderTutorialStep(index) {
  const step = TTT_TUTORIAL_STEPS[index] || TTT_TUTORIAL_STEPS[0];
  els.tutorialScreen.dataset.step = step.id;
  els.tutorialStepButtons.forEach((button) => {
    const isActive = Number(button.dataset.tttStep) === index;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-selected", String(isActive));
  });

  els.tutorialKicker.textContent = step.kicker;
  els.tutorialStepTitle.textContent = step.title;
  els.tutorialStepText.textContent = step.text;
  els.tutorialStepList.replaceChildren();
  step.bullets.forEach((bullet) => {
    const item = document.createElement("li");
    item.textContent = bullet;
    els.tutorialStepList.append(item);
  });
  els.tutorialProfessorRule.textContent = step.rule;
  els.tutorialPathLine.setAttribute("d", step.path);
  els.tutorialPathGhost.setAttribute("d", step.path);
  els.tutorialPathPoint.setAttribute("cx", step.point[0]);
  els.tutorialPathPoint.setAttribute("cy", step.point[1]);
  els.tutorialPathLabel.textContent = step.label[0];
  els.tutorialPathLabel.setAttribute("x", step.label[1]);
  els.tutorialPathLabel.setAttribute("y", step.label[2]);
  els.tutorialPathBadge.textContent = step.badge;
  els.tutorialLegendFocus.textContent = step.focus;
}

function showTutorial(index = 0) {
  els.homeScreen.hidden = true;
  els.quizScreen.hidden = true;
  els.tutorialScreen.hidden = false;
  renderTutorialStep(index);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function startSession({ title, subtitle, questions, emptyDeck = null, deck = null, shuffleQuestions = false }) {
  state.currentTitle = title;
  state.currentSubtitle = subtitle;
  state.currentDeck = deck;
  state.shuffleQuestions = shuffleQuestions;
  state.activeQuestions = shuffleQuestions ? shuffledQuestions(questions) : questions;
  state.correct = 0;
  state.wrong = 0;
  state.seenIds.clear();
  state.recentIds = [];
  state.current = null;
  els.homeScreen.hidden = true;
  els.tutorialScreen.hidden = true;
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
  if (state.reviewIds.has(question.id)) score += 35;
  if (!progress.attempts) score += 26;
  if (progress.wrong > progress.correct) score += 18;
  if (!progress.mastered) score += 10;
  score -= progress.streak * 8;
  return score;
}

function chooseNextQuestion() {
  const recent = new Set(state.recentIds.slice(-RECENT_CARD_GAP));
  const spaced = state.activeQuestions.filter((question) => !recent.has(question.id));
  const poolBase = spaced.length ? spaced : state.activeQuestions;
  const unseen = poolBase.filter((question) => !state.seenIds.has(question.id));
  const pool = unseen.length ? unseen : poolBase;
  if (state.currentDeck === "question-bank") return chooseWeightedRandomQuestion(pool);
  return [...pool].sort((a, b) => scoreCandidate(b) - scoreCandidate(a))[0] || null;
}

function chooseWeightedRandomQuestion(pool) {
  const scored = pool.map((question) => ({
    question,
    weight: Math.max(1, scoreCandidate(question))
  }));
  const total = scored.reduce((sum, item) => sum + item.weight, 0);
  let pick = Math.random() * total;

  for (const item of scored) {
    pick -= item.weight;
    if (pick <= 0) return item.question;
  }

  return scored[scored.length - 1]?.question || null;
}

function svgElement(name, attrs = {}) {
  const element = document.createElementNS("http://www.w3.org/2000/svg", name);
  Object.entries(attrs).forEach(([key, value]) => element.setAttribute(key, value));
  return element;
}

function addSvgText(svg, text, x, y, className, anchor = "middle") {
  const label = svgElement("text", { x, y, class: className, "text-anchor": anchor });
  label.textContent = text;
  svg.append(label);
  return label;
}

function graphTicks(range, count = 4) {
  const [min, max] = range;
  const step = (max - min) / count;
  return Array.from({ length: count + 1 }, (_, index) => ({
    value: min + step * index,
    label: Number.isInteger(min + step * index)
      ? String(min + step * index)
      : (min + step * index).toFixed(2).replace(/0+$/, "").replace(/\.$/, "")
  }));
}

function graphPointMapper(visual, width, height, margin) {
  const [xMin, xMax] = visual.xRange;
  const [yMin, yMax] = visual.yRange;
  const plotWidth = width - margin.left - margin.right;
  const plotHeight = height - margin.top - margin.bottom;

  return {
    x: (value) => margin.left + ((value - xMin) / (xMax - xMin)) * plotWidth,
    y: (value) => margin.top + (1 - (value - yMin) / (yMax - yMin)) * plotHeight
  };
}

function renderQuestionVisual(visual) {
  els.questionVisual.replaceChildren();

  if (!visual) {
    els.questionVisual.hidden = true;
    return;
  }

  if (visual.type === "image") {
    const figure = document.createElement("figure");
    const caption = document.createElement("figcaption");
    const image = document.createElement("img");
    image.src = visual.src;
    image.alt = visual.alt || visual.title || "Question diagram";
    image.loading = "lazy";
    caption.textContent = visual.title || "Question diagram";
    figure.append(caption, image);
    els.questionVisual.append(figure);
    els.questionVisual.hidden = false;
    return;
  }

  if (visual.type !== "svg-graph") {
    els.questionVisual.hidden = true;
    return;
  }

  const width = 680;
  const height = 360;
  const margin = { top: 34, right: 24, bottom: 56, left: 68 };
  const map = graphPointMapper(visual, width, height, margin);
  const figure = document.createElement("figure");
  const caption = document.createElement("figcaption");
  const svg = svgElement("svg", {
    viewBox: `0 0 ${width} ${height}`,
    role: "img",
    "aria-label": visual.title || "Question graph"
  });

  caption.textContent = visual.title || "Question graph";
  figure.append(caption, svg);

  svg.append(svgElement("rect", {
    x: margin.left,
    y: margin.top,
    width: width - margin.left - margin.right,
    height: height - margin.top - margin.bottom,
    class: "graph-plot"
  }));

  const xAxisY = height - margin.bottom;
  const yAxisX = margin.left;
  svg.append(svgElement("line", { x1: yAxisX, y1: margin.top, x2: yAxisX, y2: xAxisY, class: "graph-axis" }));
  svg.append(svgElement("line", { x1: yAxisX, y1: xAxisY, x2: width - margin.right, y2: xAxisY, class: "graph-axis" }));

  (visual.xTicks || graphTicks(visual.xRange)).forEach((tick) => {
    const x = map.x(tick.value);
    svg.append(svgElement("line", { x1: x, y1: xAxisY, x2: x, y2: xAxisY + 5, class: "graph-axis" }));
    addSvgText(svg, tick.label, x, xAxisY + 20, "graph-tick");
  });

  (visual.yTicks || graphTicks(visual.yRange)).forEach((tick) => {
    const y = map.y(tick.value);
    svg.append(svgElement("line", { x1: yAxisX - 5, y1: y, x2: yAxisX, y2: y, class: "graph-axis" }));
    addSvgText(svg, tick.label, yAxisX - 10, y + 4, "graph-tick", "end");
  });

  (visual.series || []).forEach((series) => {
    if (series.kind !== "polyline") return;
    const points = series.points.map(([x, y]) => `${map.x(x)},${map.y(y)}`).join(" ");
    svg.append(svgElement("polyline", { points, class: `graph-line ${series.className || ""}`.trim() }));
  });

  (visual.markers || []).forEach((marker) => {
    const x = map.x(marker.x);
    const y = map.y(marker.y);
    svg.append(svgElement("circle", { cx: x, cy: y, r: marker.r ?? 5, class: `graph-marker ${marker.className || ""}`.trim() }));
    addSvgText(svg, marker.label, x + (marker.dx ?? 12), y + (marker.dy ?? -10), "graph-marker-label", marker.anchor || "start");
  });

  (visual.labels || []).forEach((label) => {
    addSvgText(svg, label.text, map.x(label.x), map.y(label.y), `graph-label ${label.className || ""}`.trim(), label.anchor || "middle");
  });

  addSvgText(svg, visual.xLabel || "x", width / 2, height - 14, "graph-axis-label");
  const yLabel = addSvgText(svg, visual.yLabel || "y", 16, height / 2, "graph-axis-label");
  yLabel.setAttribute("transform", `rotate(-90 16 ${height / 2})`);

  els.questionVisual.append(figure);
  els.questionVisual.hidden = false;
}

function courseMastery() {
  if (!state.activeQuestions.length) return 0;
  return Math.round((masteredIn(state.activeQuestions) / state.activeQuestions.length) * 100);
}

function masteryLabel(question) {
  const progress = cardProgress(question.id);
  if (progress.mastered) return "Locked in";
  if (state.reviewIds.has(question.id)) return "Coming back";
  if (!progress.attempts) return "New";
  if (progress.streak === 1) return "Almost";
  return "Learning";
}

function updateStats() {
  const answered = state.correct + state.wrong;
  const total = state.activeQuestions.length;
  const accuracy = answered ? Math.round((state.correct / answered) * 100) : 0;
  els.questionProgress.textContent = `${answered}/${total}`;
  els.correctCount.textContent = state.correct;
  els.wrongCount.textContent = state.wrong;
  els.reviewCount.textContent = state.activeQuestions.filter((question) => state.reviewIds.has(question.id)).length;

  const level = Math.floor(state.progress.xp / XP_PER_LEVEL) + 1;
  const levelXp = state.progress.xp % XP_PER_LEVEL;
  els.levelText.textContent = `Level ${level}`;
  els.xpText.textContent = `${state.progress.xp} XP`;
  els.xpMeter.style.width = `${Math.round((levelXp / XP_PER_LEVEL) * 100)}%`;

  const roundProgress = total ? Math.min(100, Math.round((answered / total) * 100)) : 0;
  els.sectionTitle.textContent = "Round progress";
  els.sectionGoal.textContent = `${roundProgress}% done`;
  els.sectionMeter.style.width = `${roundProgress}%`;
  const mastered = masteredIn(state.activeQuestions);
  els.masteryText.textContent = `This set: ${mastered}/${total} locked in. Accuracy: ${accuracy}%`;
  els.coachTip.textContent = coachTip();
}

function coachTip() {
  const answered = state.correct + state.wrong;
  if (state.wrong > 0) return "Missed cards will return soon, after a few other cards give your memory room to work.";
  if (!answered) return "Choose an answer first. The explanation is the mini-lecture.";
  if (state.progress.streak >= 5) return `Streak ${state.progress.streak}. Keep it rolling for bonus XP.`;
  return "Nice. A card locks in after two correct answers on separate appearances.";
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
  els.questionSource.textContent = formatSource(question.source);
  els.questionSection.textContent = question.section;
  els.questionMastery.textContent = masteryLabel(question);
  els.questionText.textContent = question.question;
  renderQuestionVisual(question.visual);
  els.feedback.hidden = true;
  els.resultLine.className = "result-line";
  els.explanation.textContent = "";
  els.relevantTheory.textContent = "";
  els.nextButton.disabled = true;
  els.options.replaceChildren();

  shuffledOptionEntries(question.options).forEach(([letter, text], index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "option-button";
    button.dataset.option = letter;
    button.innerHTML = `
      <span class="option-letter">${OPTION_MARKERS[index]}</span>
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
  state.recentIds.push(question.id);
  if (state.recentIds.length > RECENT_CARD_GAP * 2) state.recentIds.shift();
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
    button.querySelector(".option-letter").textContent = option;
    if (option === correct) button.classList.add("correct");
    if (option === selected && !isCorrect) button.classList.add("wrong");
  });
}

function showFeedback(question, isCorrect) {
  els.resultLine.textContent = isCorrect
    ? `Correct. Answer ${question.correctAnswer}.`
    : `Wrong. Correct answer: ${question.correctAnswer}.`;
  els.resultLine.classList.add(isCorrect ? "correct" : "wrong");
  els.explanation.textContent = question.explanation;
  els.relevantTheory.textContent = question.relevantTheory;
  els.feedback.hidden = false;
  els.nextButton.disabled = false;
}

function renderEmptyDeck(emptyDeck) {
  state.answered = true;
  updateStats();
  els.questionSource.textContent = emptyDeck?.source ? formatSource(emptyDeck.source) : "Content architecture ready";
  els.questionSection.textContent = state.currentSubtitle || "Study set";
  els.questionMastery.textContent = "No cards yet";
  const isDueReview = state.currentTitle === "Due review";
  els.questionText.textContent = isDueReview
    ? "No review cards are due right now."
    : `${state.currentTitle} does not have generated cards yet.`;
  els.options.replaceChildren();
  renderQuestionVisual(null);
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
  els.tutorialScreen.hidden = true;
  els.homeScreen.hidden = false;
  state.current = null;
  state.answered = false;
  updateHome();
}

async function init() {
  updateCountdown();
  window.setInterval(updateCountdown, 60 * 1000);
  const decoratedQuestions = decorateQuestions(window.TMM_QUESTIONS || []);
  state.skippedQuestions = decoratedQuestions.filter((question) => !isStudyReady(question));
  const readyQuestions = decoratedQuestions.filter(isStudyReady);
  state.graphQuestions = readyQuestions.filter((question) => question.deck === GRAPH_DECK);
  state.allQuestions = readyQuestions.filter((question) => question.deck !== GRAPH_DECK);
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
      const isPastExam = study === "question-bank";
      const isSelfAssessment = study === "self-assessment";
      const isGraph = study === GRAPH_DECK;
      startSession({
        title: button.querySelector("strong").textContent,
        subtitle: isPastExam ? "Past exam bank" : isSelfAssessment ? "Self-test bank" : isGraph ? "Graph practice" : "Study set",
        questions: deckQuestions(study),
        deck: study,
        shuffleQuestions: isPastExam,
        emptyDeck: { deck: study, moduleId: null }
      });
    }
  });
});

els.nextButton.addEventListener("click", renderQuestion);
els.restartButton.addEventListener("click", () => startSession({
  title: state.currentTitle,
  subtitle: state.currentSubtitle,
  questions: state.activeQuestions,
  deck: state.currentDeck,
  shuffleQuestions: state.shuffleQuestions
}));
els.backHomeButton.addEventListener("click", goHome);
els.tutorialHomeButton.addEventListener("click", goHome);
els.tttTutorialButton.addEventListener("click", () => showTutorial());
els.tutorialStepButtons.forEach((button) => {
  button.addEventListener("click", () => renderTutorialStep(Number(button.dataset.tttStep)));
});
els.lectureFocusButton.addEventListener("click", () => {
  els.lecturePicker.open = true;
  els.lecturePicker.scrollIntoView({ behavior: "smooth", block: "start" });
});

init().catch((error) => {
  els.questionText.textContent = error.message;
  els.questionSource.textContent = "Load error";
});
