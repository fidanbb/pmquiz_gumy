const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const targetStr = 'const originalQuestions = allQuestions.slice(startQ, endQ);';
const replacementStr = 'const sourceQuestions = currentMock === 1 ? mock1Questions : mock2Questions;\n            const originalQuestions = sourceQuestions.slice(startQ, endQ);';

if (html.includes(targetStr)) {
    // Replace all occurrences
    html = html.split(targetStr).join(replacementStr);

    fs.writeFileSync('index.html', html);
    console.log('Successfully replaced allQuestions usage.');
} else {
    console.log('Target string not found.');
}
