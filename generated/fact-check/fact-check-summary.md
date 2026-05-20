# Fact-Check Summary

Date: 2026-05-20

## Scope

Six agents reviewed the question bank by topic/deck:

- Fundamentals, diffusion, and early lecture theory: 142 cards checked.
- Plasticity, microplasticity, sheet forming, and strengthening: 141 cards checked.
- Fe-C, steels, designations, and production: 161 cards checked.
- Heat treatment and surface treatment: 93 cards checked.
- Corrosion, stainless steels, cast irons, aluminium, and casting: 145 cards checked.
- Past-exam bank and self-assessment practice tests: 147 cards checked.

Because scopes overlap, these counts are not additive. Together they cover the visible bank and high-risk technical areas.

## Result

No agent found a confirmed wrong correct-answer letter.

The audit did find several cards where the answer was broadly intended correctly but the wording could teach a misleading model. Those were patched in `data/questions.json` and regenerated into `data/questions.js`.

## Patched Cards

- `30`: Changed the BCC/FCC diffusion item from imprecise "Fe atom" wording to small interstitial atom diffusion; clarified that FCC has larger interstitial holes and higher solubility, while BCC allows faster interstitial diffusion pathways.
- `35`: Rewrote the Hume-Rothery solid-solution item so the false condition is uniquely "large electronegativity difference".
- `43`: Fixed malformed option `200 MPa A` to `200 MPa`.
- `66`: Corrected CE from weldability carbon equivalent to eutectoid carbon content in the Fe-C diagram context.
- `78`: Removed misleading wording that grouped BCC as a compact/close-packed structure; clarified FCC/HCP vs BCC packing.
- `119`: Removed lingering "more interstitial sites" shortcut and clarified FCC interstitial hole size vs BCC openness.
- `121`, `139`, `156`: Already patched during the BCC/FCC diffusion correction pass; retained and validated.
- `342`: Resolved the X38CrMoV5-3 explanation to follow the Lecture 7 X-grade rule and the self-assessment prompt: about 0.38%C, 5% Cr, 3% Mo, V present.
- `552`: Clarified that the question compares diffusion paths, not mechanisms; replaced the interstitial-diffusion distractor with vacancy-mediated bulk diffusion.
- `586`: Clarified that the question asks for a physical fast diffusion path, not a diffusion mechanism.
- `11`, `57`, `67`: Corrected source references for nitriding/induction hardening slides.
- `18`: Clarified the awkward CRSS past-exam distractor while keeping the intended answer.
- `480`, `542`: Simplified PFZ-specific aluminium corrosion wording to source-supported stress-corrosion/microstructure wording.
- `638`: Moved precipitation hardening self-assessment metadata from `Al & Casting` to `Plasticity`.
- `1-70`: Prepended `PAST_EXAMS/QUESTIONS_SET_1.txt` to sources where missing.

## Remaining Notes

- Some original past-exam items have awkward professor wording. Where the intended exam answer was clear but the wording was scientifically loose, the card explanation now warns about the nuance rather than silently teaching the loose version.
- Diagram-dependent cards remain hidden from normal study paths through `diagramRequired: true`.
- A few uncertainties remain in the individual JSON reports where the available files contain prompts rather than full professor worked answers.

## Validation

Passed after patching:

- `python -m json.tool data/questions.json`
- `node --check data/questions.js`
- `node --check data/content-map.js`
- `node scripts/validate-bank.js`
- `node scripts/audit-bank.js`
