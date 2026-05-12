# TMM Content Coverage Audit

Last updated: 2026-05-12.

## Current Bank Snapshot

- Total stored cards: 671
- Study-ready visible cards: 664
- Diagram-required hidden cards: 7
- Past exam bank: 129 visible cards
- Slides by lecture: 472 visible cards
- Self-assessment: 63 visible cards

## Self-Assessment First Pass Added

Added IDs `609-671` from four generated batch files:

- `generated/self-assessment/steels-fe-c.json`: steels, Fe-C, designation, production and heat-treatment fundamentals.
- `generated/self-assessment/plasticity-strengthening.json`: plastic deformation, forming, recrystallization, dislocations and strengthening.
- `generated/self-assessment/diffusion-corrosion-casting.json`: diffusion, corrosion/passivation/stainless concepts and shaping by melting.
- `generated/self-assessment/misc-practice-tests.json`: miscellanea plus broad practice-test concepts.

Visible self-assessment coverage by module:

- `self-steels`: 15 cards
- `self-plastic-deformation`: 5 cards
- `self-strengthening`: 9 cards
- `self-diffusion`: 5 cards
- `self-corrosion`: 6 cards
- `self-shaping-melting`: 5 cards
- `self-miscellanea`: 7 cards
- `self-practice-tests`: 11 cards

## Sources Covered In The First Pass

- `Self-assesment questions/self-assessment questions on steels.pdf`
- `Self-assesment questions/Self-assessment questions on steels (2).pdf`
- `Self-assesment questions/2024.12.19 Test.pdf`
- `Self-assesment questions/self-assessment questions on shaping by plastic deformation.pdf`
- `Self-assesment questions/Self-assement question on plastic deformation.pdf`
- `Self-assesment questions/Self-assement question on plastic deformation-.pdf`
- `Self-assesment questions/self-assessment questions on Strengthening.pdf`
- `Self-assesment questions/Test 2024.12.10.pdf`
- `Self-assesment questions/self-assessment questions on Diffusion.pdf`
- `Self-assesment questions/self-assessment questions on Corrosion.pdf`
- `Self-assesment questions/self-assessment questions Shaping by melting.pdf`
- `Self-assesment questions/Self-test questions - miscellanea.pdf`
- `Self-assesment questions/TMM Questions 2024.11.28.pdf`

## Known Gaps For Later Passes

- The self-assessment deck is now functional, but it is a first coverage layer, not exhaustive prompt-by-prompt conversion.
- Sheet-forming prompts were treated cautiously because one duplicate source says sheet-forming questions are excluded in the 2025-2026 academic year.
- The demo PNG in `Self-assesment questions/TMM_WRITTEN_TEST_FAC-SIMILE_for demo to students_Pagina_1.png` still needs image/OCR review before conversion.
- Damascus sword miscellanea, detailed bending-test outcomes, and some very specific surface-treatment ranking prompts should receive a second focused batch if the user wants full prompt-level coverage.
- Diagram-dependent questions remain skipped unless the relevant image/diagram is embedded in a future dedicated deck.

## Validation Result

The following checks passed cleanly after integration:

- `python -m json.tool data/questions.json`
- `python -m json.tool data/content-map.json`
- `node --check app.js`
- `node --check data/questions.js`
- `node --check data/content-map.js`
- `node scripts/validate-bank.js`
- `node scripts/audit-bank.js`

Browser preview through a temporary local static server also passed:

- Home loaded without console errors.
- Lecture grid showed 14 lecture modules.
- Self-assessment grid showed 8 modules.
- Self-assessment total showed 63 cards.
- Launching `Self-assessment: Steels` opened a 15-card quiz with four answer options.
