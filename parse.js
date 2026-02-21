const fs = require('fs');

function parseFiles() {
    const questionsRaw = fs.readFileSync('questions_raw.txt', 'utf8');
    const answersRaw = fs.readFileSync('answers_raw.txt', 'utf8');

    // Parse questions
    const questionBlocks = questionsRaw.split(/Question \d+/).slice(1);

    // Parse answers
    const answerBlocks = answersRaw.split(/Question \d+/).slice(1);

    const mock2Questions = [];

    for (let i = 0; i < 180; i++) {
        if (!questionBlocks[i] || !answerBlocks[i]) continue;

        let qText = questionBlocks[i];
        let aText = answerBlocks[i];

        // Process Question Block
        const lines = qText.trim().split('\n');
        const qLines = [];
        const options = [];

        let inOptions = false;
        const optionRegex = /^[A-E]\./;

        for (let line of lines) {
            line = line.trim();
            if (!line) continue;

            if (optionRegex.test(line)) {
                inOptions = true;
                options.push(line.replace(/^[A-E]\.\s*/, '').trim());
            } else if (!inOptions) {
                qLines.push(line);
            }
        }

        const questionString = qLines.join(' ');

        // Process Answer Block
        const aLines = aText.trim().split('\n');
        let correctAnswer = null;
        let isMultiple = false;

        for (let line of aLines) {
            line = line.trim();
            if (line.startsWith('Correct Answer:')) {
                const ansStr = line.replace('Correct Answer:', '').trim();
                const answers = ansStr.split(',').map(s => s.trim());

                const getIndex = (char) => char.charCodeAt(0) - 65; // A -> 0, B -> 1, etc.

                if (answers.length > 1) {
                    isMultiple = true;
                    correctAnswer = answers.map(getIndex);
                } else {
                    correctAnswer = getIndex(answers[0]);
                }
                break;
            }
        }

        const qObj = {
            q: questionString,
            o: options,
            a: correctAnswer
        };

        if (isMultiple) {
            qObj.type = "multiple";
        }

        mock2Questions.push(qObj);
    }

    fs.writeFileSync('mock2_data.json', JSON.stringify(mock2Questions, null, 2));
    console.log(`Successfully parsed ${mock2Questions.length} questions.`);
}

parseFiles();
