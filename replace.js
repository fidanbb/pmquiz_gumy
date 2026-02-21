const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

html = html.replace(/\.dark-mode \.chapter-selection h2,/g, '.dark-mode .chapter-selection h2,\n        .dark-mode .mock-selection h2,');

html = html.replace(/<p id="headerInfo">Select a Chapter to Begin<\/p>([\s\S]*?)<div class="chapter-selection" id="chapterSelection">/, `<p id="headerInfo">Select a Mock Test to Begin</p>
$1<div class="mock-selection" id="mockSelection">
            <h2>Select Mock Test</h2>
            <div class="mock-grid">
                <button class="mock-btn" onclick="selectMock(1)">MOCK_1</button>
                <button class="mock-btn" onclick="selectMock(2)">MOCK_2</button>
            </div>
            <div style="margin-top: 20px; text-align: center; display: flex; justify-content: center; gap: 10px;">
                <button class="btn btn-secondary" onclick="showStatistics()" style="padding: 8px 16px;">📊 Stats</button>
                <button class="btn btn-secondary" onclick="toggleDarkMode()" style="padding: 8px 16px;">🌙 Dark</button>
            </div>
        </div>

        <div class="chapter-selection hidden" id="chapterSelection">`);

html = html.replace(/<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">\s*<h2>Choose a Chapter \(20 Questions Each\)<\/h2>\s*<div style="display: flex; gap: 10px;">\s*<button class="btn btn-secondary" onclick="showStatistics\(\)" style="padding: 8px 16px;">📊 Stats<\/button>\s*<button class="btn btn-secondary" onclick="toggleDarkMode\(\)" style="padding: 8px 16px;">🌙 Dark<\/button>\s*<\/div>\s*<\/div>/, `<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                <button class="back-btn" onclick="backToMocks()" style="margin-right: 15px;">← Back to Mocks</button>
                <h2>Choose a Chapter (20 Questions Each)</h2>
            </div>`);

// Check if these replacements worked
console.log('dark-mode replaced:', html.includes('.dark-mode .mock-selection h2'));
console.log('mock-selection HTML added:', html.includes('id="mockSelection"'));
console.log('backToMocks button added:', html.includes('backToMocks()'));

fs.writeFileSync('index.html', html);
