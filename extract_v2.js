const fs = require('fs');
const pdfjsLib = require('pdfjs-dist/legacy/build/pdf.js');
const PNG = require('pngjs').PNG;

async function extractImages() {
    const pdfPath = 'Mock Test 1 _ questions.pdf';
    const data = new Uint8Array(fs.readFileSync(pdfPath));
    const loadingTask = pdfjsLib.getDocument({ data });

    const pdfDocument = await loadingTask.promise;
    let imgCount = 0;

    for (let pageNum = 1; pageNum <= pdfDocument.numPages; pageNum++) {
        const page = await pdfDocument.getPage(pageNum);
        const opList = await page.getOperatorList();

        for (let i = 0; i < opList.fnArray.length; i++) {
            if (opList.fnArray[i] === pdfjsLib.OPS.paintImageXObject) {
                const imgName = opList.argsArray[i][0];
                const img = await page.objs.get(imgName);

                if (img && img.data && img.width && img.height) {
                    imgCount++;
                    const fileName = `images/image_${imgCount}_page_${pageNum}.png`;

                    const png = new PNG({ width: img.width, height: img.height });

                    if (img.kind === 2) { // RGB
                        for (let y = 0; y < img.height; y++) {
                            for (let x = 0; x < img.width; x++) {
                                const idx = (img.width * y + x) << 2;
                                const srcIdx = (img.width * y + x) * 3;
                                png.data[idx] = img.data[srcIdx];
                                png.data[idx + 1] = img.data[srcIdx + 1];
                                png.data[idx + 2] = img.data[srcIdx + 2];
                                png.data[idx + 3] = 255;
                            }
                        }
                    } else if (img.kind === 3) { // RGBA
                        for (let p = 0; p < img.width * img.height * 4; p++) {
                            png.data[p] = img.data[p];
                        }
                    } else if (img.kind === 1) { // Grayscale
                        for (let y = 0; y < img.height; y++) {
                            for (let x = 0; x < img.width; x++) {
                                const idx = (img.width * y + x) << 2;
                                const srcIdx = img.width * y + x;
                                const val = img.data[srcIdx];
                                png.data[idx] = val;
                                png.data[idx + 1] = val;
                                png.data[idx + 2] = val;
                                png.data[idx + 3] = 255;
                            }
                        }
                    } else {
                        console.log(`Unknown image kind ${img.kind} for ${fileName}, writing as RGB...`);
                        for (let p = 0; p < (img.width * img.height * 3); p += 3) {
                            const idx = (p / 3) * 4;
                            png.data[idx] = img.data[p];
                            png.data[idx + 1] = img.data[p + 1];
                            png.data[idx + 2] = img.data[p + 2];
                            png.data[idx + 3] = 255;
                        }
                    }

                    png.pack().pipe(fs.createWriteStream(fileName));
                    console.log(`Saved ${fileName} (kind: ${img.kind}, ${img.width}x${img.height})`);
                }
            }
        }
    }
}

fs.mkdirSync('images', { recursive: true });
extractImages().then(() => console.log('Done')).catch(console.error);
