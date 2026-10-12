import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";

const [docxPath, tsvPath] = process.argv.slice(2);
if (!docxPath || !tsvPath) throw new Error("Usage: node scripts/import-study-bank.mjs <study-bank.docx> <anki.tsv>");
const plain = execFileSync("textutil", ["-convert", "txt", "-stdout", docxPath], { encoding: "utf8", maxBuffer: 16 * 1024 * 1024 });
const lines = plain.replace(/\f/g, "\n").split(/\r?\n/).map(line => line.trim());
const titleByNumber = new Map();
const questions = new Map();
const answerKeys = new Map();
const frqPrompts = new Map();
const frqGuides = new Map();
let unitNumber = 0;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  const title = line.match(/^Unit (\d+): (.+)$/);
  if (title) { unitNumber = Number(title[1]); titleByNumber.set(unitNumber, title[2]); continue; }
  const mcq = line.match(/^MCQ (\d+)\.(\d+)$/);
  if (mcq) {
    const [, u, q] = mcq; const opts = [];
    let prompt = "";
    for (let j = i + 1; j < lines.length && opts.length < 4; j++) {
      const option = lines[j].match(/^([A-D])\.\s*(.*)$/);
      if (option) opts["ABCD".indexOf(option[1])] = option[2];
      else if (!prompt && lines[j] && !/^MCQ |^FRQ |^Unit \d+/.test(lines[j])) prompt = lines[j];
      else if (!lines[j] && prompt) break;
    }
    if (prompt && opts.length === 4 && opts.every(Boolean)) questions.set(`${u}.${q}`, { id: `bank-u${u}-mcq-${q.padStart(2, "0")}`, unitId: `u${u}`, prompt, choices: opts });
  }
  const key = line.match(/^MCQ (\d+)\.(\d+):\s*([A-D])\.\s*(.*)$/);
  if (key) answerKeys.set(`${key[1]}.${key[2]}`, { answer: "ABCD".indexOf(key[3]), feedback: key[4] });
  const frq = line.match(/^FRQ (\d+)\.(\d+): (?!scoring guide)(.+)$/);
  if (frq) {
    const next = lines.slice(i + 1).find(value => value.length > 0);
    if (next && !/^FRQ \d+\.\d+: scoring guide$/.test(next)) frqPrompts.set(`${frq[1]}.${frq[2]}`, { id: `bank-u${frq[1]}-frq-${frq[2]}`, unitId: `u${frq[1]}`, title: frq[3], prompt: next, time: "Self-paced" });
  }
  const guide = line.match(/^FRQ (\d+)\.(\d+): scoring guide$/);
  if (guide) {
    const next = lines.slice(i + 1).find(value => value.length > 0);
    if (next) frqGuides.set(`${guide[1]}.${guide[2]}`, next);
  }
}

for (const [key, item] of questions) {
  const answer = answerKeys.get(key);
  if (!answer) throw new Error(`Missing MCQ key ${key}`);
  Object.assign(item, answer);
}
const unitIds = ["atomic", "bonding", "forces", "reactions", "kinetics", "thermo", "equilibrium", "acidbase", "thermo-electrochem"];
const colors = ["sage", "peach", "lilac", "gold", "rose", "blue", "teal", "mint", "lilac"];
const subtitles = [
  "Evidence, electron structure, and periodic reasoning",
  "Models, formal charge, resonance, and geometry",
  "Experimental properties and particle-level models",
  "Stoichiometry, redox, and experimental analysis",
  "Rate data, mechanisms, and energy profiles",
  "Calorimetry, Hess's law, and error analysis",
  "K, Q, coupled changes, and particle reasoning",
  "Buffers, titrations, and coupled equilibria",
  "Entropy, free energy, and electrochemical cells",
];
const unitTitles = [
  "Atomic Structure and Properties", "Compound Structure and Properties", "Properties of Substances and Mixtures",
  "Chemical Reactions", "Kinetics", "Thermochemistry", "Equilibrium", "Acids and Bases", "Thermodynamics and Electrochemistry",
];
const units = unitIds.map((id, index) => ({
  id, title: unitTitles[index], subtitle: subtitles[index], color: colors[index],
  questions: [...questions.values()].filter(q => q.unitId === `u${index + 1}`),
}));
const frqs = [...frqPrompts].map(([key, item]) => {
  const guide = frqGuides.get(key);
  if (!guide) throw new Error(`Missing FRQ scoring guide ${key}`);
  item.unitId = unitIds[Number(key.split(".")[0]) - 1];
  item.rubric = guide.split(/\s+(?=\([a-e]\)\s)/).map(part => part.trim()).filter(Boolean);
  return item;
});
const tagsToUnit = tag => {
  const n = Number(tag.match(/Unit(\d+)/)?.[1]);
  if (!n || !unitIds[n - 1]) throw new Error(`Unrecognized Anki tag: ${tag}`);
  return unitIds[n - 1];
};
const flashcards = readFileSync(tsvPath, "utf8").trim().split(/\r?\n/).map((row, i) => {
  const [front, back, tags] = row.split("\t");
  if (!front || !back || !tags) throw new Error(`Malformed TSV row ${i + 1}`);
  const unitId = tagsToUnit(tags);
  const unitNum = Number(tags.match(/Unit(\d+)/)[1]);
  return { id: `bank-u${unitNum}-card-${String(i + 1).padStart(3, "0")}`, unitId, front, back };
});

if (questions.size !== 90 || frqs.length !== 18 || flashcards.length !== 450 || titleByNumber.size !== 9) {
  throw new Error(`Unexpected import counts: ${questions.size} MCQs, ${frqs.length} FRQs, ${flashcards.length} cards, ${titleByNumber.size} units`);
}
if ([...units].some(unit => unit.questions.length !== 10) || [...unitIds].some(id => frqs.filter(item => item.unitId === id).length !== 2 || flashcards.filter(item => item.unitId === id).length !== 50)) {
  throw new Error("Per-unit counts do not match the source bank.");
}

const result = `// Generated from the user-supplied AP Chemistry study bank and Anki TSV.\n// All question content is independently authored AP-style practice.\nexport const units = ${JSON.stringify(units, null, 2)} as const;\n\nexport const frqs = ${JSON.stringify(frqs, null, 2)} as const;\n\nexport const flashcards = ${JSON.stringify(flashcards, null, 2)} as const;\n`;
writeFileSync("lib/study-bank.ts", result);
console.log(JSON.stringify({ units: units.length, mcqs: questions.size, frqs: frqs.length, flashcards: flashcards.length, questionsPerUnit: units.map(u => u.questions.length), cardsPerUnit: unitIds.map(id => flashcards.filter(c => c.unitId === id).length) }, null, 2));
