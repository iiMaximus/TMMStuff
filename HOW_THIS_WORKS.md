# How The TMM Study Website Works

The site is a static adaptive quiz app. It works from `file:///Users/maksym/Desktop/apps/TMM/index.html`, so it cannot depend on a backend.

## Current Architecture

- `index.html`: app layout and UI regions.
- `styles.css`: compact responsive styling.
- `app.js`: adaptive study logic, XP, mastery, deck filtering, spaced review.
- `data/questions.json`: canonical question/card bank.
- `data/questions.js`: generated mirror of the JSON for direct `file://` loading.
- `data/content-map.json`: catalog of decks and modules.
- `data/content-map.js`: generated mirror for direct `file://` loading.

## User Flow

The user starts from a home screen and can choose:

- `Everything`: adaptive practice across every generated card.
- `Exam bank`: the current past-exam MCQ bank.
- `Due review`: only cards previously answered incorrectly and not yet remastered.
- `Self-assessment`: cards generated from professor self-assessment prompts.
- topic practice, such as Plasticity or Corrosion, once cards exist in that section.
- lecture practice, where each slide lecture appears as its own module.

Within the Slides path, modules are lectures. Notes are not a user-facing path; they are supporting evidence used by agents when generating lecture cards.

## Learning Logic

The app tracks progress in `localStorage`.

Each card has:

- attempts
- correct count
- wrong count
- current correct streak
- mastered status
- last seen time

A card is mastered after two correct answers in a row. If it is answered wrong, it enters due review and stays there until mastered.

Cards marked with `"diagramRequired": true` are kept in the data file but skipped by all normal study paths. Use that flag for past-exam questions that refer to missing phase diagrams, cooling curves, labeled regions, or other figures.

Question selection inside a session is adaptive:

- due review cards inside the chosen set are prioritized first
- unseen cards are preferred before repeats
- weak cards are weighted above already-mastered cards
- cards answered correctly several times are shown less often

XP:

- Correct answers give XP.
- Streaks give small bonus XP.
- Wrong answers give tiny XP so effort is still counted.
- XP and level are motivational only; mastery is what matters.

## Content Philosophy

This website should be enough to learn the course, not just memorize answers. The cards are the main study material: a student should understand the contents of the lecture by working through the cards, even if they did not attend the lecture.

Every card should therefore contain:

1. The professor-style question.
2. Four options with realistic traps.
3. The correct answer.
4. A full explanation of why each option is right/wrong.
5. The relevant theory in plain language, with enough context to teach the lecture concept.
6. Exact source reference.

The `explanation` should focus on the current question. The `relevantTheory` should generalize the idea so the student can answer related exam variants.

## Slide Conversion Strategy

Slides are vague by design and do not contain ready-made questions. Do not create shallow cards from slide bullets alone.

The AI must create original professor-style questions from what the lecture is teaching. The goal is to predict what the professor would test after explaining the slide, not to copy text from the slide.

For every lecture module:

1. Read the lecture slides.
2. Identify definitions, formulas, diagrams, transformations, process-property links, and named mechanisms.
3. Search `notes-split/` for matching terms and explanations. The notes are not cleanly aligned to lecture numbers, so agents must identify the relevant pages themselves.
4. Read a representative sample from `PAST_EXAMS/` to imitate the professor's MCQ wording, common NOT TRUE traps, and difficulty level.
5. Fill in the spoken lecture logic from the notes, while keeping the card assigned to the lecture module.
6. Generate a mixture of:
   - direct definition cards
   - NOT TRUE / FALSE trap cards
   - process-microstructure-property cards
   - calculation/decoding cards where relevant
   - application selection cards

If a slide has a diagram but no explanation, avoid asking "what is region R?" unless the card itself explains or reproduces the needed context. Instead, ask the underlying concept.

## Future Content Plan

Recommended work order:

1. Finish converting remaining non-diagram past exam questions.
2. Convert self-assessment prompts into deep explanation cards.
3. Convert slides lecture by lecture, using notes to fill gaps.
4. Convert student notes into reinforcement cards for weak topics.
5. Optionally create diagram-specific decks with embedded images/screenshots later. Until then, mark diagram-dependent cards as `diagramRequired: true` so they stay out of normal practice.

Large content batches should stay small enough to review. A good target is 10-20 cards per agent pass, then validate and skim before adding more. A whole lecture may end up with about 25-40 cards, or more for longer lectures, but agents should build that in batches so quality does not drift.

When multiple agents work at once, they should write separate batch files under `generated/`. The master agent then reviews and merges those cards into `data/questions.json`, regenerates `data/questions.js`, and validates the bank.

## Regenerating Browser Data

After editing `data/questions.json` or `data/content-map.json`, regenerate JS mirrors:

```bash
/Users/maksym/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node -e "const fs=require('fs'); const data=fs.readFileSync('data/questions.json','utf8'); JSON.parse(data); fs.writeFileSync('data/questions.js','window.TMM_QUESTIONS = '+data+';\\n'); const map=fs.readFileSync('data/content-map.json','utf8'); JSON.parse(map); fs.writeFileSync('data/content-map.js','window.TMM_CONTENT_MAP = '+map+';\\n');"
```

Then validate:

```bash
/Users/maksym/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3 -m json.tool data/questions.json >/dev/null
/Users/maksym/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3 -m json.tool data/content-map.json >/dev/null
/Users/maksym/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node --check data/questions.js
/Users/maksym/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node --check data/content-map.js
/Users/maksym/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node --check app.js
/Users/maksym/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node scripts/validate-bank.js
```
