const fs = require('fs');

const file1 = 'c:\\Users\\user\\Desktop\\pmquiz_gumy\\Mock Test 1 _ questions.pdf';
const file2 = 'c:\\Users\\user\\Desktop\\Mock Test 7 _ questions.pdf';

fs.readFile(file1, function (err, data) {
    if (err) throw err;
    let imgRegex = /\/Subtype\s*\/Image/ig;
    let match1 = data.toString().match(imgRegex);
    console.log("Mock 1 images count:", match1 ? match1.length : 0);
});

fs.readFile(file2, function (err, data) {
    if (err) throw err;
    let imgRegex = /\/Subtype\s*\/Image/ig;
    let match2 = data.toString().match(imgRegex);
    console.log("Mock 7 images count:", match2 ? match2.length : 0);
});
