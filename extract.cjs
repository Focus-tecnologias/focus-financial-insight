const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = dir + '/' + file;
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            results = results.concat(walk(file));
        } else { 
            if (file.endsWith('.ts') || file.endsWith('.tsx')) {
                results.push(file);
            }
        }
    });
    return results;
}

const files = walk('./src');
const tables = new Set();
const regex = /useLocalStorageState(?:<[^>]+>)?\s*\(\s*['"](focus_[^'"]+)['"]/g;

files.forEach(file => {
    const content = fs.readFileSync(file, 'utf-8');
    let match;
    while ((match = regex.exec(content)) !== null) {
        tables.add(match[1]);
    }
});

fs.writeFileSync('tables.txt', Array.from(tables).sort().join('\n'));
console.log(tables.size);
