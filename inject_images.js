const fs = require('fs');

let html = fs.readFileSync('c:\\Users\\user\\Desktop\\pmquiz_gumy\\index.html', 'utf8');

const replacements = [
    {
        sub: "implement one of the following decisions? (Drag and drop the items from right to left.)\",",
        img: "image_1_page_25.png"
    },
    {
        sub: "impacting this project? (Drag and drop the items from right to left.)\",",
        img: "image_2_page_33.png"
    },
    {
        sub: "resource breakdown structure's categories? (Drag and drop the items from right to left.)\",",
        img: "image_3_page_34.png"
    },
    {
        sub: "represents the project manager's decision? (On the actual PMP exam, you will be requested to click the correct area in the image. But here, please select the answer below.)\",",
        img: "image_4_page_38.png"
    },
    {
        sub: "A project manager has developed the following earned value analysis chart for a software development project. Based on the current trend, what action should the project manager take immediately?\",",
        img: "image_5_page_43.png"
    },
    {
        sub: "with regard to their requirements? (Drag and drop the items from right to left.)\",",
        img: "image_6_page_56.png"
    },
    {
        sub: "where is the team on the Tuckman ladder? (On the actual PMP exam, you will be requested to click the correct area in the image. But here, please select the answer below.)\",",
        img: "image_7_page_76.png"
    },
    {
        sub: "which compares the vehicle speed with uncommanded lane departures. What can be said about this diagram?\",",
        img: "image_8_page_80.png"
    },
    {
        sub: "Where on the Stacey Complexity Model did the team most likely map the project? (On the actual PMP exam, you will be requested to click the correct area in the image. But here, please select the answer below.)\",",
        img: "image_9_page_85.png"
    },
    {
        sub: "matrix below. Which answer choice represents the most important element to be included in the stakeholder engagement plan?\",",
        img: "image_10_page_103.png"
    },
    {
        sub: "roles. According to the partial stakeholder register below, which individual is most likely to be the project sponsor?\",",
        img: "image_12_page_169.png"
    }
];

let replacedCount = 0;

replacements.forEach(rep => {
    const imgTag = `<br><br><img class=\\"question-img\\" src=\\"images/${rep.img}\\" style=\\"max-width: 100%; height: auto; border: 1px solid #ccc; border-radius: 8px; margin-top: 10px;\\">`;
    const newStr = rep.sub.replace('",', '') + imgTag + '",';

    if (html.includes(rep.sub)) {
        html = html.replace(rep.sub, newStr);
        replacedCount++;
        console.log("Successfully injected:", rep.img);
    } else {
        console.log("Could NOT find text for:", rep.img);
    }
});

fs.writeFileSync('c:\\Users\\user\\Desktop\\pmquiz_gumy\\index.html', html, 'utf8');
console.log(`Finished. Replaced ${replacedCount} questions.`);
