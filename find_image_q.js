const fs = require('fs');
const pdfParse = require('pdf-parse');

async function extractText(filePath) {
    try {
        const dataBuffer = fs.readFileSync(filePath);
        const data = await pdfParse(dataBuffer);

        // Split by newlines and find lines containing words that might indicate an image
        const lines = data.text.split('\n');
        lines.forEach((line, index) => {
            if (line.toLowerCase().includes('picture') ||
                line.toLowerCase().includes('image') ||
                line.toLowerCase().includes('figure') ||
                line.toLowerCase().includes('diagram') ||
                line.toLowerCase().includes('shown below')) {

                console.log(`--- Match found in ${filePath} at roughly line ${index} ---`);
                // Print a few lines of context around the match
                const start = Math.max(0, index - 3);
                const end = Math.min(lines.length - 1, index + 3);
                for (let i = start; i <= end; i++) {
                    console.log(lines[i]);
                }
                console.log('\n');
            }
        });
    } catch (error) {
        console.error(`Error reading ${filePath}:`, error.message);
    }
}

const file1 = 'c:\\Users\\user\\Desktop\\pmquiz_gumy\\Mock Test 1 _ questions.pdf';
const file2 = 'c:\\Users\\user\\Desktop\\Mock Test 7 _ questions.pdf'; // It was on Desktop

console.log("Searching Mock Test 1...");
extractText(file1).then(() => {
    console.log("Searching Mock Test 7...");
    extractText(file2);
});
