const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const match = html.match(/const mock2Questions = \[([\s\S]*?)\];/);

if (match) {
    const qs = eval('[' + match[1] + ']');
    const rawLines = fs.readFileSync('questions_raw.txt', 'utf8').split('\n');
    let questionsText = [];

    let currentQ = "";
    for (const line of rawLines) {
        if (/^Question\s*\d+/i.test(line)) {
            if (currentQ) questionsText.push(currentQ);
            currentQ = line;
        } else {
            currentQ += "\n" + line;
        }
    }
    if (currentQ) questionsText.push(currentQ);

    console.log("Found " + questionsText.length + " questions in raw file.");

    for (let i = 0; i < questionsText.length; i++) {
        const rawQ = questionsText[i].split('\n')[1].trim().substring(0, 30);
        const matchFound = qs.some(q => q.q && q.q.replace(/\s+/g, '').includes(rawQ.replace(/\s+/g, '')));
        if (!matchFound) {
            console.log("Missing " + questionsText[i].split('\n')[0].trim() + " starting with: " + rawQ);
        }
    }
} else {
    console.log("mock2Questions not found");
}
