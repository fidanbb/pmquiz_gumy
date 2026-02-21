const fs = require('fs');

let html = fs.readFileSync('c:\\Users\\user\\Desktop\\pmquiz_gumy\\index.html', 'utf8');

const qData = [
    {
        qMarker: "Project stakeholders meet to discuss the threat of a severe staff shortage",
        correctPairs: [
            ["Avoid", "Cancel the project"],
            ["Transfer", "Outsource staffing"],
            ["Mitigate", "Automate processes"],
            ["Accept", "Hire replacement workers if needed"],
            ["Escalate", "Delegate to management"]
        ]
    },
    {
        qMarker: "A project is plagued by various issues",
        correctPairs: [
            ["Alternatives analysis", "Corrective actions for better performance"],
            ["Cost-benefit analysis", "Corrective actions regarding the cost"],
            ["Earned value analysis", "Integrated perspective on project performance"],
            ["Root cause analysis", "Identify the main reason for problems"],
            ["Trend analysis", "Forecast performance based on results"],
            ["Variance analysis", "Compare planned and actual performance"],
            ["Business analysis", "(Not applicable)"]
        ]
    },
    {
        qMarker: "A software development project is in planning. The planning is done traditionally",
        correctPairs: [
            ["Product owner", "Personnel (level 1)"],
            ["Team member", "Personnel (level 2)"],
            ["Data server", "Equipment"],
            ["Team space room", "Facilities"],
            ["Digital scrum board", "Software"],
            ["Office clerk", "Personnel (level 3)"]
        ]
    },
    {
        qMarker: "After completing an iteration, an agile team is planning to hold an iteration review",
        correctPairs: [
            ["Project sponsor", "Organizational requirements"],
            ["End user", "Functional requirements"],
            ["Data security expert", "Non-functional requirements"],
            ["Developer", "Technical requirements"],
            ["Project manager", "All types of requirements"]
        ]
    }
];

let changedCount = 0;

function buildOptionString(pairs) {
    let str = "";
    for (let i = 0; i < pairs.length; i++) {
        str += `<strong style=\\"color: #2563eb;\\">${pairs[i][0]}</strong> ➔ ${pairs[i][1]}`;
        if (i < pairs.length - 1) str += "<br>";
    }
    return '"' + str + '"';
}

for (let dt of qData) {
    let qIndex = html.indexOf(dt.qMarker);
    if (qIndex !== -1) {
        let start = html.indexOf('"o": [', qIndex);
        let end = html.indexOf('],', start) + 1;

        if (start !== -1 && end !== -1) {
            let options = [];
            options.push(buildOptionString(dt.correctPairs));

            for (let shift = 1; shift <= 3; shift++) {
                let incorrectPairs = [];
                for (let i = 0; i < dt.correctPairs.length; i++) {
                    // Rotate the draggable terms (left side logic), keep targets fixed
                    let draggableIndex = (i + shift) % dt.correctPairs.length;
                    incorrectPairs.push([dt.correctPairs[draggableIndex][0], dt.correctPairs[i][1]]);
                }
                options.push(buildOptionString(incorrectPairs));
            }

            let newOptionsArr = '"o": [\n                    ' + options.join(',\n                    ') + '\n                ]';

            html = html.substring(0, start) + newOptionsArr + html.substring(end);
            changedCount++;
        }
    }
}

fs.writeFileSync('c:\\Users\\user\\Desktop\\pmquiz_gumy\\index.html', html, 'utf8');
console.log(`Rebuilt exact drag drop options for ${changedCount} questions.`);
