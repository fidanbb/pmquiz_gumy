const fs = require('fs');

let html = fs.readFileSync('c:\\Users\\user\\Desktop\\pmquiz_gumy\\index.html', 'utf8');

const replacements = [
    {
        sub: "(Drag and drop the items from right to left.)\",",
        img: "image_1_page_25.png"
    },
    {
        sub: "imacting this project? (Drag and drop the items from right to left.)\",",
        img: "image_2_page_33.png"
    },
    {
        sub: "structure's categories? (Drag and drop the items from right to left.)\",",
        img: "image_3_page_34.png"
    },
    {
        sub: "please select the answer below.)\",", // Q38
        img: "image_4_page_38.png"
    },
    {
        sub: "A project manager has developed the following earned value analysis chart for a software development project. Based on the current trend",
        img: "image_5_page_43.png"
    },
    {
        sub: "How should the team classify the stakeholders with regard to their requirements? (Drag and drop the items from right to left.)\",",
        img: "image_6_page_56.png"
    },
    {
        sub: "ladder? (On the actual PMP exam, you will be requested to click the correct area in the image. But here, please select the answer below.)\",",
        img: "image_7_page_76.png"
    },
    {
        sub: "diagram below, which compares the vehicle speed with uncommanded lane departures. What can be said about this diagram?\",",
        img: "image_8_page_80.png"
    },
    {
        sub: "project? (On the actual PMP exam, you will be requested to click the correct area in the image. But here, please select the answer below.)\",",
        img: "image_9_page_85.png"
    },
    {
        sub: "matrix below. Which answer choice represents the most important element to be included in the stakeholder engagement plan?\",",
        img: "image_10_page_103.png" // We will just insert 10. Since 11 is on the same page, maybe it's two parts, but let's check.
    },
    {
        sub: "roles. According to the partial stakeholder register below, which individual is most likely to be the project sponsor?\",",
        img: "image_12_page_169.png"
    }
];

// Wait, doing `html = html.replace` might be tricky because there are multiple "(Drag and drop" strings.
// A better way is to do precise replacements. Let's do a more careful script.
