# Fact-Check Audit Protocol

Each fact-check report should be a JSON file with this shape:

```json
{
  "scope": "short description",
  "checkedCardIds": [1, 2, 3],
  "summary": "Brief result.",
  "issues": [
    {
      "id": 123,
      "severity": "critical|major|minor",
      "field": "question|options|correctAnswer|explanation|relevantTheory|source|metadata",
      "problem": "What is wrong or potentially misleading.",
      "sourceEvidence": "Course source evidence, including file and page/slide when possible.",
      "proposedFix": "Concrete corrected wording or action."
    }
  ],
  "uncertainties": [
    {
      "id": 123,
      "note": "What could not be fully resolved from the course sources."
    }
  ]
}
```

Fact-check standard:

- Use the course sources first: lecture slides, self-assessment prompts, past exams, then notes.
- Do not use internet facts.
- If the notes/slides are simplified but exam-relevant, keep the course idea but remove scientifically misleading wording.
- Flag wrong correct-answer letters as `critical`.
- Flag misleading theory/explanation as `major`.
- Flag style, source, or metadata issues as `minor`.
- Do not edit `data/questions.json`; write reports only.
