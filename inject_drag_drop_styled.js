const fs = require('fs');

let html = fs.readFileSync('c:\\Users\\user\\Desktop\\pmquiz_gumy\\index.html', 'utf8');

const qs = [
    "Project stakeholders meet to discuss the threat of a severe staff shortage",
    "A project is plagued by various issues",
    "A software development project is in planning. The planning is done traditionally",
    "After completing an iteration, an agile team is planning to hold an iteration review"
];

let changed = 0;

for (let q of qs) {
    let qIndex = html.indexOf(q);
    if (qIndex !== -1) {
        let start = html.indexOf('"o": [', qIndex);
        let end = html.indexOf('],', start);
        if (start !== -1 && end !== -1) {
            let optionsStr = html.substring(start, end);

            let newOptionsStr = optionsStr.replace(/"([^"]+)"/g, (match, p1) => {
                // Check if it's our mapped format
                if (!p1.includes(" = ")) return match;

                let pairs = p1.split("; ");
                let formattedPairs = pairs.map(pair => {
                    let parts = pair.split(" = ");
                    if (parts.length === 2) {
                        return `<strong style=\\"color: #2563eb;\\">${parts[0]}</strong> ➔ ${parts[1]}`;
                    }
                    return pair; // fallback
                });
                return '"' + formattedPairs.join('<br>') + '"';
            });

            if (optionsStr !== newOptionsStr) {
                html = html.substring(0, start) + newOptionsStr + html.substring(end);
                changed++;
            }
        }
    }
}

fs.writeFileSync('c:\\Users\\user\\Desktop\\pmquiz_gumy\\index.html', html, 'utf8');
console.log(`Updated HTML with rich drag and drop formatting for ${changed} questions.`);
