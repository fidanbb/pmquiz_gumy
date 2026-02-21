const fs = require('fs');

let html = fs.readFileSync('c:\\Users\\user\\Desktop\\pmquiz_gumy\\index.html', 'utf8');

const replacements = [
    {
        // Q33
        search: "A project is plagued by various issues",
        oldOptions: `"o": [
                    "Alternatives Analysis = Selection; Cost-benefit = Assess costs; Earned Value = Integrated view; Root Cause = Main issue; Trend = Forecast; Variance = Planned vs Actual",
                    "Alternatives Analysis = Forecast; Cost-benefit = Selection; Earned Value = Main issue; Root Cause = Planned vs Actual; Trend = Integrated view; Variance = Assess costs",
                    "Alternatives Analysis = Integrated view; Cost-benefit = Forecast; Earned Value = Selection; Root Cause = Assess costs; Trend = Planned vs Actual; Variance = Main issue",
                    "Alternatives Analysis = Assess costs; Cost-benefit = Main issue; Earned Value = Forecast; Root Cause = Integrated view; Trend = Selection; Variance = Planned vs Actual"
                ],
                "a": 0`,
        newOptions: `"o": [
                    "Alternatives Analysis = selects a corrective action or a combination of corrective and preventive actions to implement; Cost-benefit Analysis = determines the best corrective action when it comes to cost factors in a project that deviates from the plan; Earned Value Analysis = have a more integrated perspective on scope, schedule, and cost performance; Root Cause Analysis = helps identify the main cause or causes of a problem; Trend Analysis = future performance can be forecasted based on past results; Variance Analysis = differences between planned and actual performance are reviewed",
                    "Alternatives Analysis = future performance can be forecasted based on past results; Cost-benefit Analysis = selects a corrective action or a combination of corrective and preventive actions to implement; Earned Value Analysis = helps identify the main cause or causes of a problem; Root Cause Analysis = differences between planned and actual performance are reviewed; Trend Analysis = have a more integrated perspective on scope, schedule, and cost performance; Variance Analysis = determines the best corrective action when it comes to cost factors in a project that deviates from the plan",
                    "Alternatives Analysis = have a more integrated perspective on scope, schedule, and cost performance; Cost-benefit Analysis = future performance can be forecasted based on past results; Earned Value Analysis = selects a corrective action or a combination of corrective and preventive actions to implement; Root Cause Analysis = determines the best corrective action when it comes to cost factors in a project that deviates from the plan; Trend Analysis = differences between planned and actual performance are reviewed; Variance Analysis = helps identify the main cause or causes of a problem",
                    "Alternatives Analysis = determines the best corrective action when it comes to cost factors in a project that deviates from the plan; Cost-benefit Analysis = helps identify the main cause or causes of a problem; Earned Value Analysis = future performance can be forecasted based on past results; Root Cause Analysis = have a more integrated perspective on scope, schedule, and cost performance; Trend Analysis = selects a corrective action or a combination of corrective and preventive actions to implement; Variance Analysis = differences between planned and actual performance are reviewed"
                ],
                "a": 0`
    },
    {
        // Q34
        search: "A software development project is in planning. The planning is done traditionally",
        oldOptions: `"o": [
                    "Product Owner = Personnel (Level 1); Team Member = Personnel (Level 2); Data Server = Equipment; Team Space = Facilities; Digital Scrum Board = Software",
                    "Product Owner = Facilities; Team Member = Software; Data Server = Personnel (Level 1); Team Space = Equipment; Digital Scrum Board = Personnel (Level 2)",
                    "Product Owner = Equipment; Team Member = Facilities; Data Server = Software; Team Space = Personnel (Level 2); Digital Scrum Board = Personnel (Level 1)",
                    "Product Owner = Personnel (Level 2); Team Member = Equipment; Data Server = Facilities; Team Space = Personnel (Level 1); Digital Scrum Board = Software"
                ],
                "a": 0`,
        newOptions: `"o": [
                    "Product Owner = Personnel (level 1); Team Member = Personnel (level 2); Data Server = equipment; Team Space = facilities; Digital Scrum Board = software",
                    "Product Owner = facilities; Team Member = software; Data Server = Personnel (level 1); Team Space = equipment; Digital Scrum Board = Personnel (level 2)",
                    "Product Owner = equipment; Team Member = facilities; Data Server = software; Team Space = Personnel (level 2); Digital Scrum Board = Personnel (level 1)",
                    "Product Owner = Personnel (level 2); Team Member = equipment; Data Server = facilities; Team Space = Personnel (level 1); Digital Scrum Board = software"
                ],
                "a": 0`
    },
    {
        // Q56
        search: "After completing an iteration, an agile team is planning to hold an iteration review",
        oldOptions: `"o": [
                    "Project Sponsor = Organizational; End Users = Functional; Data Security Experts = Non-functional; Developers = Technical",
                    "Project Sponsor = Functional; End Users = Organizational; Data Security Experts = Technical; Developers = Non-functional",
                    "Project Sponsor = Non-functional; End Users = Technical; Data Security Experts = Organizational; Developers = Functional",
                    "Project Sponsor = Technical; End Users = Non-functional; Data Security Experts = Functional; Developers = Organizational"
                ],
                "a": 0`,
        newOptions: `"o": [
                    "Project Sponsor = organizational requirements; End Users = functional requirements; Data Security Experts = non-functional requirements; Developers = technical requirements",
                    "Project Sponsor = functional requirements; End Users = organizational requirements; Data Security Experts = technical requirements; Developers = non-functional requirements",
                    "Project Sponsor = non-functional requirements; End Users = technical requirements; Data Security Experts = organizational requirements; Developers = functional requirements",
                    "Project Sponsor = technical requirements; End Users = non-functional requirements; Data Security Experts = functional requirements; Developers = organizational requirements"
                ],
                "a": 0`
    }
];

let matchCount = 0;

for (let r of replacements) {
    let qIndex = html.indexOf(r.search);
    if (qIndex !== -1) {
        let start = html.indexOf('"o":', qIndex);
        let end = html.indexOf('"a": 0', start) + 6;

        if (start !== -1 && end !== -1) {
            let chunk = html.substring(start, end);
            html = html.substring(0, start) + r.newOptions + html.substring(end);
            matchCount++;
        }
    }
}

fs.writeFileSync('c:\\Users\\user\\Desktop\\pmquiz_gumy\\index.html', html, 'utf8');
console.log(`Replaced answers for ${matchCount} questions.`);
