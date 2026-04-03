const fs = require('fs');

const files = [
  'src/index.css',
  'src/pages/Landing.tsx',
  'src/pages/Landing.css',
  'src/pages/Dashboard.tsx',
  'src/pages/Dashboard.css',
  'src/pages/Auth.tsx',
  'src/pages/Auth.css',
  'src/pages/PortalLayout.tsx',
  'src/pages/PortalLayout.css'
];

const replacements = [
  [/166,\s*132,\s*82/g, '217, 70, 239'],    // muted gold -> neon magenta
  [/196,\s*146,\s*40/g, '139, 92, 246'],    // warm gold -> neon violet
  [/c49228/g, 'a855f7'],                    // raw gold hex -> bright purple hex
  [/18,\s*14,\s*10/g, '15, 6, 28'],         // dark panel background 1
  [/22,\s*18,\s*14/g, '22, 9, 41'],         // dark panel background 2
  [/12,\s*10,\s*7/g, '10, 4, 20'],          // sidebar 
  [/108,\s*90,\s*66/g, '139, 92, 246'],     // insight panel base
  [/15,\s*12,\s*9/g, '12, 5, 23'],          // input field
  [/#0c0906/g, '#090310'],                  // base bg
  [/#0e0b08/g, '#0c0416'],                  // grad dark 1
  [/#0a0806/g, '#05010a'],                  // grad dark 2
  [/#0d0a07/g, '#080211'],                  // grad dark 3
  [/rgba\(232,\s*222,\s*203/g, 'rgba(253, 242, 248'], // ivory to light pink-white
  [/#f3ece0/g, '#fdf2f8'],                  // ivory text to light pink-white
  [/var\(--scroll-pct,\s*0%\)/g, 'var(--scroll-pct, 0%)'],  // No-op for safety
  [/rgba\(243,\s*236,\s*224/g, 'rgba(253, 242, 248']        // More light text
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
