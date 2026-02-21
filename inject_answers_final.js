const fs = require('fs');

let html = fs.readFileSync('c:\\Users\\user\\Desktop\\pmquiz_gumy\\index.html', 'utf8');

const replacements = [
    {
        // Q33
        search: "A project is plagued by various issues",
        newOptions: `                "o": [
                    "Alternatives Analysis = Selection; Cost-benefit = Assess costs; Earned Value = Integrated view; Root Cause = Main issue; Trend = Forecast; Variance = Planned vs Actual",
                    "Alternatives Analysis = Forecast; Cost-benefit = Selection; Earned Value = Main issue; Root Cause = Planned vs Actual; Trend = Integrated view; Variance = Assess costs",
                    "Alternatives Analysis = Integrated view; Cost-benefit = Forecast; Earned Value = Selection; Root Cause = Assess costs; Trend = Planned vs Actual; Variance = Main issue",
                    "Alternatives Analysis = Assess costs; Cost-benefit = Main issue; Earned Value = Forecast; Root Cause = Integrated view; Trend = Selection; Variance = Planned vs Actual"
                ],
                "a": 0`
    },
    {
        // Q34
        search: "A software development project is in planning. The planning is done traditionally",
        newOptions: `                "o": [
                    "Product Owner = Personnel (Level 1); Team Member = Personnel (Level 2); Data Server = Equipment; Team Space = Facilities; Digital Scrum Board = Software",
                    "Product Owner = Facilities; Team Member = Software; Data Server = Personnel (Level 1); Team Space = Equipment; Digital Scrum Board = Personnel (Level 2)",
                    "Product Owner = Equipment; Team Member = Facilities; Data Server = Software; Team Space = Personnel (Level 2); Digital Scrum Board = Personnel (Level 1)",
                    "Product Owner = Personnel (Level 2); Team Member = Equipment; Data Server = Facilities; Team Space = Personnel (Level 1); Digital Scrum Board = Software"
                ],
                "a": 0`
    },
    {
        // Q56
        search: "After completing an iteration, an agile team is planning to hold an iteration review",
        newOptions: `                "o": [
                    "Project Sponsor = Organizational; End Users = Functional; Data Security Experts = Non-functional; Developers = Technical",
                    "Project Sponsor = Functional; End Users = Organizational; Data Security Experts = Technical; Developers = Non-functional",
                    "Project Sponsor = Non-functional; End Users = Technical; Data Security Experts = Organizational; Developers = Functional",
                    "Project Sponsor = Technical; End Users = Non-functional; Data Security Experts = Functional; Developers = Organizational"
                ],
                "a": 0`
    }
];

let matchRegex = /"o": \[\s*"Correct match follows from PMP exam guide \(See PDF for full structure\)",\s*"Incorrect dummy matching",\s*"Incorrect dummy matching",\s*"Incorrect dummy matching"\s*\],\s*"a": 0/g;

let matchCount = 0;

for (let r of replacements) {
    let qIndex = html.indexOf(r.search);
    if (qIndex !== -1) {
        // Find the next occurrence of our placeholder to replace
        let placeholderIndex = html.indexOf('"Correct match follows', qIndex);
        if (placeholderIndex !== -1 && placeholderIndex - qIndex < 1000) {
            // Find the start of the "o": [ array
            let start = html.lastIndexOf('"o": [', placeholderIndex);
            let end = html.indexOf('"a": 0', placeholderIndex) + 6;

            if (start !== -1 && end !== -1) {
                html = html.substring(0, start) + r.newOptions + html.substring(end);
                matchCount++;
            }
        }
    }
}

fs.writeFileSync('c:\\Users\\user\\Desktop\\pmquiz_gumy\\index.html', html, 'utf8');
console.log(`Replaced answers for ${matchCount} questions.`);
