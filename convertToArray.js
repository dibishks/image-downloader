const fs = require("fs");
const path = require("path");

const inputFile = path.join(__dirname, "inputUrls.txt");
const outputFile = path.join(__dirname, "outputUrls.txt");
console.log('input directory', __dirname, "imageUrls.txt")
console.log('inputFile', inputFile)


// Read the input file
fs.readFile(inputFile, "utf8", (err, data) => {
    if (err) {
        console.error("Error reading input file:", err);
        return;
    }

    // Convert the file content into an array of URLs (removing empty lines)
    const imageUrls = data.split("\n").map(url => url.trim()).filter(url => url);

    // Save the array to output.txt as a JSON string
    fs.writeFile(outputFile, JSON.stringify(imageUrls, null, 2), (err) => {
        if (err) {
            console.error("Error writing output file:", err);
        } else {
            console.log(`Successfully saved ${imageUrls.length} image URLs to output.txt`);
        }
    });
});
