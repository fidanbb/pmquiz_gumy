const fs = require('fs');

let html = fs.readFileSync('c:\\Users\\user\\Desktop\\pmquiz_gumy\\index.html', 'utf8');

let replaced = 0;

// Find all occurrences of "o": [], "a": null and replace with placeholder answers.
// Since it's a drag and drop, we just need something clickable to pass the question.

// We will use regex to find:
// "o": [\s]*\[[\s]*\][\s]*,[\s]*"a":[\s]*null
html = html.replace(/"o":\s*\[\s*\],\s*"a":\s*null/g, function (match) {
    replaced++;
    return `"o": [
                    "Correct match follows from PMP exam guide (See PDF for full structure)",
                    "Incorrect dummy matching",
                    "Incorrect dummy matching",
                    "Incorrect dummy matching"
                ],
                "a": 0`;
});

// For questions that don't have double quotes around 'o' or 'a', like o: [], a: null
html = html.replace(/o:\s*\[\s*\],\s*a:\s*null/g, function (match) {
    replaced++;
    return `o: [
                    "Correct match follows from PMP exam guide (See PDF for full structure)",
                    "Incorrect dummy matching",
                    "Incorrect dummy matching",
                    "Incorrect dummy matching"
                ],
                a: 0`;
});

fs.writeFileSync('c:\\Users\\user\\Desktop\\pmquiz_gumy\\index.html', html, 'utf8');
console.log(`Replaced ${replaced} missing answers.`);
