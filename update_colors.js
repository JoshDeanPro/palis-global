const fs = require('fs');
const glob = require('glob'); // Not available locally? We can just manually list files:
const files = [
  'src/index.css',
  'src/pages/Landing.tsx',
  'src/pages/Landing.css',
  'src/pages/Dashboard.tsx',
  'src/pages/Dashboard.css',
  'src/pages/Auth.tsx',
  'src/pages/Auth.css',
  'src/pages/PortalLayout.tsx',
  'src/pages/PortalLayout.css',
  'src/styles/components.css'
];

const replacements = [
  [/166,\s*132,\s*82/g, '217, 70, 239'],
  [/196,\s*146,\s*40/g, '139, 92, 246'],
  [/c49228/g, 'd946ef'],
  [/18,\s*14,\s*10/g, '15, 6, 28'],
  [/22,\s*18,\s*14/g, '22, 9, 41'],
  [/12,\s*10,\s*7/g, '10, 4, 20'],
  [/108,\s*90,\s*66/g, '139, 92, 246'],
  [/15,\s*12,\s*9/g, '12, 5, 23'],
  [/#0c0906/g, '#090310'],
  [/#0e0b08/g, '#0c0416'],
  [/#0a0806/g, '#05010a'],
  [/#0d0a07/g, '#080211'],
  [/rgba\(232,\s*222,\s*203/g, 'rgba(253, 242, 248'], // Light text
  [/#f3ece0/g, '#fdf2f8'],
];

files.forEach(file => {
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');
  replacements.forEach(([regex, repl]) => {
    content = content.replace(regex, repl);
  });
  fs.writeFileSync(file, content);
});
console.log("Colors updated!");
