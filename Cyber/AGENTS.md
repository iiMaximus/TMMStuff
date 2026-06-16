# Cyber Study Site Agent Instructions

This project is a local adaptive study website for the cybersecurity exam. It follows the same study logic as the TMM site, but the content is cybersecurity-specific and lives under `Cyber/`.

## Source Priorities

Use course material in this order:

1. Lecture PDFs in `Cyber/Material(*)/`
2. Top-level Cyber lecture PDFs such as `Cyber/Module-G_IoT-Security.pdf`
3. Supporting folders such as `Cyber/topic-c-phishing/`, only when they clarify a lecture concept

Do not use internet facts unless explicitly requested. The lecture terminology wins.

## Card Standard

Cards are the main study material. A student should be able to understand the course concepts by working through the cards, even if they did not attend the lecture.

Good cards:

- Ask one clear cybersecurity concept or scenario.
- Use four plausible options.
- Explain why the correct answer is right and why the other options are wrong.
- Include a useful `relevantTheory` section that teaches the underlying idea.
- Cite the lecture PDF and slide/page when available.
- Balance correct-answer letters across a batch.

Bad cards:

- Test tiny slide trivia with no teaching value.
- Use generic internet cybersecurity wording instead of lecture wording.
- Say only that an answer is correct without explaining the distractors.

## Data Model

Integrated cards live in `Cyber/data/questions.json`. The browser loads `Cyber/data/questions.js`, generated from the JSON for `file://` compatibility.

Each card should use:

```json
{
  "id": 1,
  "deck": "slides",
  "moduleId": "module-a-foundations",
  "lectureId": "module-a-l1-why-cybersecurity",
  "section": "Foundations",
  "sourceType": "slides",
  "difficulty": "easy",
  "cardType": "definition",
  "trapTags": ["CIA", "risk"],
  "question": "Question text",
  "options": {
    "A": "Option A",
    "B": "Option B",
    "C": "Option C",
    "D": "Option D"
  },
  "correctAnswer": "A",
  "explanation": "Why A is right and why B, C and D are wrong.",
  "relevantTheory": "The theory a student needs to answer similar questions.",
  "source": "Cyber/Material(1)/Module-A_L1_Why-Cybersecurity.pdf, slide/page X"
}
```

## Batch Workflow

When multiple agents work in parallel, do not edit `Cyber/data/questions.json` directly. Write your batch as a raw JSON array under `Cyber/generated/`. The master agent will assign ids and integrate the files.

After integration, run:

```bash
/Users/maksym/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node Cyber/scripts/validate-bank.js
/Users/maksym/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node --check Cyber/app.js
/Users/maksym/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node --check Cyber/data/questions.js
```

