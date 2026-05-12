# TMM Study Site Agent Instructions

This project is a local adaptive study website for the Technology of Metallic Materials exam. Multiple agents may work in parallel, each owning one source family or lecture/module. Do not edit another agent's assigned module unless asked.

## Source Priorities

Use course material in this order:

1. Lecture slides in `slides&docs/`
2. Professor self-assessment questions in `Self-assesment questions/`
3. Past exam wording in `PAST_EXAMS/`
4. Student notes in `notes-split/` as support material, especially for slide lectures
5. Tutorial recaps only if explicitly requested later

Do not use internet facts unless explicitly asked. The professor's terminology wins even when it is awkwardly phrased.

## Website Data Model

Generated cards live in `data/questions.json`. The browser also loads `data/questions.js`, which is generated from the JSON for `file://` compatibility.

Every card must follow the existing schema and may add optional metadata:

```json
{
  "id": 71,
  "deck": "slides",
  "moduleId": "lecture-2-metals",
  "section": "Fundamentals",
  "sourceType": "slides",
  "difficulty": "medium",
  "cardType": "trap",
  "trapTags": ["Hume-Rothery", "atomic size factor"],
  "diagramRequired": false,
  "question": "Text...",
  "options": {
    "A": "Option...",
    "B": "Option...",
    "C": "Option...",
    "D": "Option..."
  },
  "correctAnswer": "A",
  "explanation": "Detailed breakdown of why A is right and why B, C, and D are wrong.",
  "relevantTheory": "Concise but complete theory needed to understand the concept.",
  "source": "slides&docs/Lecture 2 Metals.pdf, slide/page X; notes-split/...pdf, page Y"
}
```

Required optional metadata for new work:

- `deck`: one of `question-bank`, `slides`, `self-assessment`
- `moduleId`: use the matching id in `data/content-map.json`
- `section`: course topic shown on the home screen, such as `Plasticity`, `Fe-C & Steels`, `Corrosion & SS`, `Heat Treatment`, `Production`, `Al & Casting`, or `Fundamentals`
- `sourceType`: one of `past-exam`, `slides`, `self-assessment`
- `difficulty`: one of `easy`, `medium`, `hard`
- `cardType`: one of `definition`, `trap`, `application`, `calculation`, `process-chain`
- `trapTags`: short array of traps or concepts tested
- `diagramRequired`: `true` when the card cannot stand alone without an included diagram; normal website sessions automatically skip these cards

Existing older cards may omit this metadata, but all new large-batch work should include it so the website does not depend on brittle topic guessing.

Correct-answer letters should be balanced across a generated batch. Do not make every correct answer `A`; aim for a natural spread across `A`, `B`, `C`, and `D`, while keeping the explanation letters aligned with the options. The app randomizes the visual option order before answering and reveals the original letters during feedback, but balanced source data is still preferred.

## Deck Ownership

Suggested parallel assignments:

- Past exam agent: `deck="question-bank"`, continue converting non-diagram past exam questions.
- Slides agents: one agent per lecture, `deck="slides"`, `moduleId="lecture-N-..."`.
- Self-assessment agent: `deck="self-assessment"`, one module per self-assessment PDF.
- Notes-support agent: do not create a user-facing notes deck by page range. The split notes are disorganized and are not aligned 1:1 with lectures, so search them yourself, identify the pages that actually match the assigned lecture, and use them to make the slide cards complete.

## Card Quality Standard

Each card must be exam-style but also teach enough theory that the website can replace passive rereading. The cards are the main study material: a student should be able to understand the contents of the lecture by working through these cards, even if they did not attend the lecture.

Good cards:

- Use the professor's wording, abbreviations, traps, and style.
- Include four plausible options.
- Explain why the correct answer is right and why every distractor is wrong.
- Include all relevant theory needed to solve similar questions later.
- Teach the lecture content directly, not merely test recognition of a slide bullet.
- Cite the exact source document and page/slide when available.
- Avoid requiring missing figures unless the card includes enough text to stand alone.

Bad cards:

- Only say "A is correct because it is correct."
- Ask about a diagram without embedding the needed information.
- Use generic textbook phrasing instead of course terminology.
- Over-focus on trivia without explaining the mechanism.

## Slide-Specific Rule

The slides are intentionally vague and they do not contain the questions. Slide agents must create original professor-style exam questions from the theory the lecture covers.

Do not ask, "what question is on this slide?" Instead ask, "what would the professor naturally test after teaching this slide?"

For each lecture:

1. Extract the slide concepts and exact terminology.
2. Search `notes-split/` for matching terminology and concepts; do not assume the split-file ranges correspond to lecture numbers.
3. Infer likely lecture explanation only when it follows directly from the slides and notes.
4. Turn the material into teach-and-test cards that fill the gaps the slides leave.
5. Keep the professor's emphasis and exam traps.

For example, if a slide only says "Hume-Rothery rules," the generated cards must teach the four rules, common traps, and what each rule predicts. The notes may be used to reconstruct the spoken explanation, but the card belongs to the lecture module, not a notes page module.

## Workflow For Agents

1. Read this file and `HOW_THIS_WORKS.md`.
2. Identify your assigned source/module.
3. Read only your assigned files plus the notes needed to clarify them.
4. Read a representative sample from `PAST_EXAMS/` to calibrate professor style, wording, difficulty, and traps. Use past exams for style only unless your assigned deck is the past exam bank.
5. If you are the only active content agent, append cards to `data/questions.json` using unique incremental ids. If multiple agents are working in parallel, write your assigned batch to a separate file under `generated/` and let the master agent integrate it.
6. Run:

```bash
/Users/maksym/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node scripts/validate-bank.js
/Users/maksym/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node -e "const fs=require('fs'); const data=fs.readFileSync('data/questions.json','utf8'); JSON.parse(data); fs.writeFileSync('data/questions.js','window.TMM_QUESTIONS = '+data+';\\n');"
/Users/maksym/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3 -m json.tool data/questions.json >/dev/null
/Users/maksym/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node --check data/questions.js
/Users/maksym/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node --check app.js
```

6. Report the id range added, source/module covered, and any uncertainty.

## ID Rules

- Preserve existing ids.
- New cards must use the next integer id.
- Do not duplicate ids.
- Do not reorder the file unless explicitly asked.

## Diagram Questions

Past exam questions often reference a phase diagram or TTT/cooling curve. Skip those unless the necessary diagram is included in the card itself or the user asks for a diagram-specific deck.

If a card is kept only for archival completeness but depends on a missing figure, set `"diagramRequired": true`. It will remain in `data/questions.json` but will not appear in Everything, Exam bank, topics, lectures, self-assessment, or due review.
