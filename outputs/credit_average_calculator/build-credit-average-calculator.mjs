import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { SpreadsheetFile, Workbook } from "@oai/artifact-tool";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outputDir = __dirname;

const workbook = Workbook.create();
const sheet = workbook.worksheets.add("Calculator");
sheet.showGridLines = false;

const subjects = [
  ["SDM", 10],
  ["Statistics", 6],
  ["Cybersecurity", 6],
  ["Algebra", 10],
  ["Thermodynamics", 8],
  ["Mechanics", 10],
  ["FSM", 8],
  ["Mathematics 2", 6],
];

// Title and instructions
sheet.getRange("A1:F1").merge();
sheet.getRange("A1").values = [["Credit Average Calculator"]];
sheet.getRange("A2:F2").merge();
sheet.getRange("A2").values = [[
  "Enter grades in column C. Blank grade cells are ignored, so the projected average updates only for completed exams.",
]];

// Current record and summary panels
sheet.getRange("A4:B10").values = [
  ["Current average (/30)", 21.58],
  ["Current completed credits", 50],
  ["Current weighted points", null],
  [null, null],
  ["Entered future credits", null],
  ["Future weighted points", null],
  ["Total credits included", null],
];
sheet.getRange("B6").formulas = [["=B4*B5"]];
sheet.getRange("B8").formulas = [["=SUM($E$12:$E$19)"]];
sheet.getRange("B9").formulas = [["=SUM($D$12:$D$19)"]];
sheet.getRange("B10").formulas = [["=B5+B8"]];

sheet.getRange("D4:E4").merge();
sheet.getRange("D4").values = [["Projected result"]];
sheet.getRange("D5:E9").values = [
  ["Projected average (/30)", null],
  ["Change from current", null],
  ["Completed future exams", null],
  ["Remaining planned credits", null],
  ["Planned future credits", null],
];
sheet.getRange("E5").formulas = [["=IF($B$8=0,$B$4,($B$6+$B$9)/$B$10)"]];
sheet.getRange("E6").formulas = [["=E5-$B$4"]];
sheet.getRange("E7").formulas = [["=COUNT($C$12:$C$19)"]];
sheet.getRange("E8").formulas = [["=SUM($B$12:$B$19)-$B$8"]];
sheet.getRange("E9").formulas = [["=SUM($B$12:$B$19)"]];

// Exam input table
sheet.getRange("A11:F11").values = [[
  "Subject",
  "Credits",
  "Grade input (/30)",
  "Weighted points",
  "Included credits",
  "Running avg",
]];
sheet.getRange("A12:B19").values = subjects;
sheet.getRange("D12").formulas = [["=IF(ISNUMBER(C12),B12*C12,\"\")"]];
sheet.getRange("D12:D19").fillDown();
sheet.getRange("E12").formulas = [["=IF(ISNUMBER(C12),B12,0)"]];
sheet.getRange("E12:E19").fillDown();
sheet.getRange("F12").formulas = [[
  "=IF(ISNUMBER(C12),($B$6+SUM($D$12:D12))/($B$5+SUM($E$12:E12)),\"\")",
]];
sheet.getRange("F12:F19").fillDown();

sheet.getRange("A21:F21").merge();
sheet.getRange("A21").values = [[
  "Tip: leave a grade blank for an exam you have not completed yet. The main projected average includes every entered grade, even if earlier rows are blank.",
]];

// Data validation for grade inputs.
sheet.dataValidations.add({
  range: "C12:C19",
  rule: { type: "whole", operator: "between", formula1: 0, formula2: 30 },
});

// Layout
sheet.getRange("A1:A21").format.columnWidth = 25;
sheet.getRange("B1:B21").format.columnWidth = 13;
sheet.getRange("C1:C21").format.columnWidth = 18;
sheet.getRange("D1:D21").format.columnWidth = 18;
sheet.getRange("E1:E21").format.columnWidth = 18;
sheet.getRange("F1:F21").format.columnWidth = 16;
sheet.getRange("A1:F21").format.font = { name: "Aptos", size: 11, color: "#172033" };
sheet.getRange("A1:F21").format.wrapText = true;
sheet.getRange("A1:F21").format.verticalAlignment = "center";

sheet.getRange("A1:F1").format = {
  fill: "#0F766E",
  font: { bold: true, color: "#FFFFFF", size: 16 },
};
sheet.getRange("A1:F1").format.rowHeight = 32;
sheet.getRange("A2:F2").format = {
  fill: "#ECFDF5",
  font: { italic: true, color: "#064E3B", size: 10 },
};
sheet.getRange("A2:F2").format.rowHeight = 34;

sheet.getRange("A4:B10").format.borders = { preset: "outside", style: "thin", color: "#99F6E4" };
sheet.getRange("A4:B10").format.fill = "#F8FAFC";
sheet.getRange("A4:A10").format.font = { bold: true, color: "#334155" };
sheet.getRange("B4:B10").format.fill = "#FFFFFF";

sheet.getRange("D4:E9").format.borders = { preset: "outside", style: "thin", color: "#99F6E4" };
sheet.getRange("D4:E4").format = {
  fill: "#164E63",
  font: { bold: true, color: "#FFFFFF", size: 12 },
};
sheet.getRange("D5:D9").format = {
  fill: "#F0FDFA",
  font: { bold: true, color: "#134E4A" },
};
sheet.getRange("E5:E9").format.fill = "#FFFFFF";
sheet.getRange("E5").format = {
  fill: "#DCFCE7",
  font: { bold: true, color: "#14532D", size: 14 },
};
sheet.getRange("E6").format = {
  fill: "#FEF9C3",
  font: { bold: true, color: "#713F12" },
};

sheet.getRange("A11:F11").format = {
  fill: "#164E63",
  font: { bold: true, color: "#FFFFFF" },
};
sheet.getRange("A12:F19").format.borders = {
  insideHorizontal: { style: "thin", color: "#E2E8F0" },
  insideVertical: { style: "thin", color: "#E2E8F0" },
  bottom: { style: "thin", color: "#CBD5E1" },
};
sheet.getRange("A12:B19").format.fill = "#FFFFFF";
sheet.getRange("C12:C19").format.fill = "#FEF3C7";
sheet.getRange("D12:F19").format.fill = "#F8FAFC";
sheet.getRange("A21:F21").format = {
  fill: "#F1F5F9",
  font: { italic: true, color: "#475569", size: 10 },
};

sheet.getRange("B4:B4").format.numberFormat = "0.00";
sheet.getRange("B5:B5").format.numberFormat = "0";
sheet.getRange("B6:B6").format.numberFormat = "0.00";
sheet.getRange("B8:B10").format.numberFormat = "0";
sheet.getRange("B9:B9").format.numberFormat = "0.00";
sheet.getRange("B12:B19").format.numberFormat = "0";
sheet.getRange("C12:C19").format.numberFormat = "0";
sheet.getRange("D12:D19").format.numberFormat = "0.00";
sheet.getRange("F12:F19").format.numberFormat = "0.00";
sheet.getRange("E5:E5").format.numberFormat = "0.00";
sheet.getRange("E6:E6").format.numberFormat = "+0.00;-0.00;0.00";
sheet.getRange("E7:E9").format.numberFormat = "0";

sheet.freezePanes.freezeRows(11);

// Self-test the partial-input case, then clear the sample grades before export.
sheet.getRange("C12:C19").values = [[30], [null], [24], [null], [null], [null], [null], [null]];
const partialInputCheck = await workbook.inspect({
  kind: "region",
  sheetId: "Calculator",
  range: "A4:F19",
  include: "values,formulas",
  tableMaxRows: 16,
  tableMaxCols: 6,
  maxChars: 5000,
});
console.log("PARTIAL_INPUT_SELF_TEST");
console.log(partialInputCheck.ndjson);
sheet.getRange("C12:C19").values = [[null], [null], [null], [null], [null], [null], [null], [null]];

// Compact verification output.
const check = await workbook.inspect({
  kind: "region",
  sheetId: "Calculator",
  range: "A1:F21",
  include: "values,formulas",
  tableMaxRows: 22,
  tableMaxCols: 6,
  maxChars: 6000,
});
console.log("INSPECT_A1_F21");
console.log(check.ndjson);

const errors = await workbook.inspect({
  kind: "match",
  searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A",
  options: { useRegex: true, maxResults: 300 },
  summary: "final formula error scan",
  maxChars: 2000,
});
console.log("FORMULA_ERRORS");
console.log(errors.ndjson);

const preview = await workbook.render({
  sheetName: "Calculator",
  range: "A1:F21",
  scale: 2,
  format: "png",
});
await fs.writeFile(path.join(outputDir, "credit_average_calculator_preview.png"), new Uint8Array(await preview.arrayBuffer()));

await fs.mkdir(outputDir, { recursive: true });
const output = await SpreadsheetFile.exportXlsx(workbook);
await output.save(path.join(outputDir, "credit_average_calculator.xlsx"));
console.log(path.join(outputDir, "credit_average_calculator.xlsx"));
