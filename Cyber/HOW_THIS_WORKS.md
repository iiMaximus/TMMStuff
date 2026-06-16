# How The Cyber Study Site Works

The Cyber site is a static flashcard app. It can be opened directly from `Cyber/index.html` and does not need a build step.

## Student Flow

- The home screen shows the exam countdown, global progress, recommended practice, and the course modules.
- Students can study everything, review missed cards, pick a module, or pick a specific lecture.
- Each session shows one multiple-choice card at a time.
- Answer feedback always includes:
  - whether the answer was correct,
  - why each option is right or wrong,
  - relevant theory that teaches the broader concept.

## Adaptive Review

Progress is stored in browser local storage:

- correct and wrong counts,
- XP and streak,
- each card's correct streak,
- cards due for review after a miss.

A card is considered mastered after two correct answers in a row. Missed cards come back later, but the app avoids immediately repeating the same card when enough alternatives exist.

## Files

- `index.html`: app structure
- `styles.css`: visual design
- `app.js`: quiz logic and local progress
- `data/content-map.json`: module and lecture organization
- `data/questions.json`: source of truth for cards
- `data/questions.js`: generated browser-compatible copy
- `scripts/validate-bank.js`: data validation

