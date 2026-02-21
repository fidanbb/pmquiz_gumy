const fs = require('fs');
const pdf = require('pdf-parse');

async function extractQuestionsAndAnswers() {
    try {
        const questionsBuffer = fs.readFileSync('Mock Test 1 _ questions.pdf');
        const answersBuffer = fs.readFileSync('Mock Test 1 _ answers.pdf');

        const questionsData = await pdf(questionsBuffer);
        const answersData = await pdf(answersBuffer);

        const questionsText = questionsData.text;
        const answersText = answersData.text;

        fs.writeFileSync('questions_raw.txt', questionsText);
        fs.writeFileSync('answers_raw.txt', answersText);

        console.log('Raw text extracted successfully. Saved to questions_raw.txt and answers_raw.txt');

    } catch (error) {
        console.error('Error parsing PDFs:', error);
    }
}

extractQuestionsAndAnswers();
