const fs = require('fs');
const path = require('path');
function walk(dir, files = []) {
  for (const f of fs.readdirSync(dir)) {
    if (['node_modules', '.next', '.git'].includes(f)) continue;
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) walk(full, files);
    else if (/\.(js|jsx|ts|tsx)$/.test(f)) files.push(full);
  }
  return files;
}

const files = walk('.');
for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  const lines = content.split('\n');
  lines.forEach((l, i) => {
    if (/router\.push|window\.location|redirect\(/i.test(l) && (l.includes('Student') || l.includes('Availableteacher') || l.includes('Userdashboard'))) {
      console.log(`${file}:${i+1}: ${l.trim()}`);
    }
  });
}
