# TMM Content Completion Plan

This file is the master roadmap for turning the current static study site into the complete exam-prep system described in `HOW_THIS_WORKS.md`.

## Current State

- The website is already structured as a static adaptive quiz app with lecture, exam-bank, mixed-practice, due-review, topic, and self-assessment paths.
- The visible bank currently contains 664 study-ready cards from 671 total records.
- Seven cards are intentionally hidden from normal practice with `diagramRequired: true`.
- The slide lecture path is broadly complete:
  - Lecture 1: 40 cards
  - Lecture 2: 40 cards
  - Lecture 3: 40 cards
  - Lecture 4: 40 cards
  - Lecture 5: 50 cards
  - Lecture 6: 33 cards
  - Lecture 7: 32 cards
  - Lecture 8: 38 cards
  - Lecture 9: 34 cards
  - Lecture 10: 25 cards
  - Lecture 11: 25 cards
  - Lecture 12: 25 cards
  - Lecture 13: 25 cards
  - Lecture 14: 25 cards
- The past-exam bank has 129 visible cards, generated from the four text files in `PAST_EXAMS/`, with diagram-dependent questions skipped or flagged.
- The self-assessment deck now has a first-pass layer of 63 cards across eight topic modules.

## Product Goal

The site should be enough to learn the course, not just rehearse answers. Each card must act as a small teaching unit: professor-style question, realistic traps, full explanation, relevant theory, and exact source citation.

The two primary home-screen paths should remain:

- `Study by lecture`: the main learning path, based on slides plus clarifying notes.
- `Past exams`: exam-style practice and trap calibration.

Secondary paths should remain available:

- `Mixed practice`: everything study-ready.
- `Review mistakes`: spaced repetition of missed cards.
- `Self-tests`: professor self-assessment prompts converted into MCQs.
- `Focus by topic`: weak-area drilling.

## Remaining Content Work

### 1. Deepen Self-Assessment Deck

The first self-assessment layer is complete. The next pass should deepen it into prompt-level coverage from every useful professor prompt in `Self-assesment questions/`.

Use these module IDs:

- `self-steels`: steel classification, Fe-C, designation, heat treatment, production where the source is steel-specific.
- `self-plastic-deformation`: plastic deformation, hot forming, sheet forming, strain-rate sensitivity, FLD, drawing/stretching.
- `self-strengthening`: lattice defects, dislocations, strengthening mechanisms, work hardening, precipitation/dispersion/grain refinement.
- `self-diffusion`: diffusion mechanisms, Fick laws, temperature dependence, surface/grain-boundary/bulk paths.
- `self-corrosion`: passivation, hydrogen effects, alloying elements, galvanic/aeration/pitting concepts.
- `self-shaping-melting`: casting, solidification, nucleation and growth, Al-Si casting, segregation/porosity where covered.
- `self-miscellanea`: mixed self-test prompts that do not belong cleanly to one source module.
- `self-practice-tests`: converted non-diagram MCQs from test/demo PDFs in the self-assessment folder.

Convert open prompts into original MCQs. Do not merely copy a prompt and ask "which is true?" unless that is genuinely the best exam-style form.

### 2. Finish Source Coverage Audit

After the first self-assessment pass, run an audit by source file:

- Which self-assessment PDFs produced cards?
- Which prompts were skipped?
- Which skipped prompts require a missing graph, phase diagram, cooling curve, or labeled figure?
- Which prompts overlap with existing slide cards and are intentionally not duplicated?

The result should be appended to this plan or saved as `CONTENT_COVERAGE_AUDIT.md`.

### 3. Add Optional Diagram-Specific Deck Later

Normal study paths must keep skipping missing diagram questions. A future diagram deck can be built only if the required diagrams are embedded as images or the card text fully reproduces the relevant information.

Until then:

- Skip diagram-dependent questions during generation.
- Or keep them only with `diagramRequired: true`.

### 4. Improve UI Around Self-Assessment

Once self-assessment cards exist:

- Show self-assessment modules on the home screen, similar to the lecture cards.
- Show mastered/total progress per self-assessment module.
- Keep the home screen focused on lecture study and past exams; self-assessment should feel like a useful secondary path, not clutter.

### 5. Final Quality Gate

Before calling the content complete:

- Regenerate `data/questions.js` and `data/content-map.js`.
- Run `scripts/validate-bank.js`.
- Run `scripts/audit-bank.js`.
- Run syntax checks for `app.js`, `data/questions.js`, and `data/content-map.js`.
- Skim a representative sample from every deck for:
  - balanced answer letters,
  - source-correct facts,
  - explanations that mention why each distractor is wrong,
  - relevant theory that teaches the underlying mechanism,
  - no normal-session cards depending on missing diagrams.

## Agent Batch Rules

Agents should keep batches focused. For this phase, each content agent should write a JSON array to `generated/self-assessment/` and should not edit `data/questions.json` directly.

Each generated card should use `id: 0` as a placeholder. The master agent will assign final IDs during integration.

Every batch must:

- Read `AGENTS.md` and `HOW_THIS_WORKS.md`.
- Read its assigned self-assessment source files.
- Read representative `PAST_EXAMS/` samples for style calibration.
- Search `slides&docs/` and `notes-split/` only where needed to clarify course terminology.
- Avoid internet knowledge.
- Skip missing-diagram questions.
- Keep correct answers balanced across A, B, C, and D.
- Use the existing schema exactly.

## Integration Order

1. Merge self-assessment JSON batches.
2. Assign final incremental IDs after the current maximum.
3. Confirm every `moduleId` exists in `data/content-map.json`.
4. Regenerate browser mirrors.
5. Validate and audit.
6. Review samples manually and repair weak cards.
