const express = require("express");
const fs = require("fs");
const path = require("path");
const axios = require("axios");

const app = express();
const PORT = 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// Folder to save images
const downloadFolder = path.join(__dirname, "downloaded_images");
if (!fs.existsSync(downloadFolder)) {
    fs.mkdirSync(downloadFolder, { recursive: true });
}

// Function to download an image
const downloadImage = async (url, index) => {
    try {
        const response = await axios({
            url,
            responseType: "stream",
        });

        // Extract filename from URL and remove query parameters
        const urlWithoutParams = url.split('?')[0];
        const filename = `image_${index}${path.extname(urlWithoutParams)}`;
        const filePath = path.join(downloadFolder, filename);

        // Save the image to the folder
        const writer = fs.createWriteStream(filePath);
        response.data.pipe(writer);

        return new Promise((resolve, reject) => {
            writer.on("finish", () => {
                console.log(`Successfully downloaded: ${filename}`);
                resolve({ url, filename, status: "Downloaded", path: filePath });
            });
            writer.on("error", (error) => {
                console.error(`Error downloading ${filename}:`, error);
                reject(error);
            });
        });
    } catch (error) {
        console.error(`Failed to download from ${url}:`, error.message);
        return { url, status: "Failed", error: error.message };
    }
};



// API Endpoint to Download Images
app.post("/download-images", async (req, res) => {
    const { imageUrls } = req.body;
    console.log('imageUrls', req.body.imageUrls)
    if (!imageUrls || !Array.isArray(imageUrls) || imageUrls.length === 0) {
        return res.status(400).json({ error: "Invalid or empty image URL list" });
    }

    console.log(`Downloading ${imageUrls.length} images...`);
    res.json({
        message: "Downloading started"
    });
    // Download all images in parallel
    const results = await Promise.all(imageUrls.map((url, index) => downloadImage(url, index)));
    console.log("Download completed");
   
});

// Start the Express server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
