# Image Downloader API (Express.js)

This is a simple Node.js Express API that downloads images from a list of URLs sent via a POST request and saves them in a local folder.

## 🚀 Features
- Accepts a list of image URLs via a POST request.
- Downloads images and saves them in a `downloaded_images` folder.
- Handles errors and provides a detailed response.
- Uses `axios` for downloading and `fs` for saving files.

## 🛠️ Installation

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/your-repo/image-downloader.git
cd image-downloader

npm install

node server.js

POST /download-images

{
    "imageUrls": [
        "https://example.com/image1.jpg",
        "https://example.com/image2.png"
    ]
}

{
    "message": "Download complete",
    "results": [
        { "url": "https://example.com/image1.jpg", "filename": "image_0.jpg", "status": "Downloaded" },
        { "url": "https://example.com/image2.png", "filename": "image_1.png", "status": "Downloaded" }
    ]
}

image-downloader/
│── downloaded_images/   # Folder where images are saved
│── server.js            # Express.js API code
│── package.json         # Node.js dependencies
│── README.md            # Project documentation
│── .gitignore           # Files to ignore in Git


Author: [Dibeesh KS](https://dibishks.github.io/db/)