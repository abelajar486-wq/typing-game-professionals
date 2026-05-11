// Programming code snippets and political words

export const CODE_SNIPPETS: string[] = [
  `function add(a, b) {\n  return a + b;\n}`,
  `const greet = (name) => {\n  console.log("Hello, " + name);\n};`,
  `for (let i = 0; i < 10; i++) {\n  console.log(i);\n}`,
  `if (user.isAdmin) {\n  grantAccess();\n} else {\n  denyAccess();\n}`,
  `class Player {\n  constructor(name) {\n    this.name = name;\n  }\n}`,
  `const arr = [1, 2, 3];\narr.map((n) => n * 2);`,
  `try {\n  await fetchData();\n} catch (err) {\n  console.error(err);\n}`,
  `const sum = arr.reduce((a, b) => a + b, 0);`,
  `import React, { useState } from "react";\nconst [count, setCount] = useState(0);`,
  `export default function App() {\n  return <div>Hello</div>;\n}`,
  `const obj = { id: 1, name: "Nova", active: true };`,
  `interface User {\n  id: number;\n  email: string;\n}`,
];

export const POLITICS_WORDS: string[] = [
  'demokrasi', 'parlemen', 'konstitusi', 'kebijakan', 'pemilu', 'partai', 'kampanye',
  'koalisi', 'oposisi', 'legislatif', 'eksekutif', 'yudikatif', 'menteri', 'presiden',
  'gubernur', 'walikota', 'bupati', 'senator', 'diplomat', 'kedaulatan', 'reformasi',
  'birokrasi', 'korupsi', 'transparansi', 'akuntabilitas', 'rakyat', 'negara', 'bangsa',
  'pancasila', 'undang-undang', 'mahkamah', 'referendum', 'aspirasi', 'manifesto',
  'ideologi', 'liberal', 'konservatif', 'sosialis', 'nasionalis', 'pluralisme',
  'pemerintahan', 'kekuasaan', 'mandat', 'amandemen', 'sidang', 'fraksi', 'dewan',
  'kabinet', 'pejabat', 'lembaga', 'otonomi', 'federasi', 'republik', 'monarki',
  'diplomasi', 'sanksi', 'embargo', 'aliansi', 'traktat', 'perjanjian', 'protokol',
];

export function getRandomCodeSnippet(): string {
  return CODE_SNIPPETS[Math.floor(Math.random() * CODE_SNIPPETS.length)];
}

export function getRandomPoliticsWords(count: number): string[] {
  const shuffled = [...POLITICS_WORDS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}
