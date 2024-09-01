// Import node modules
import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import multer from "multer";
import FormData from "form-data";

const app = express();
const port = process.env.PORT || 3000;


// Cloadmersive API 
const API_URL = "https://api.cloudmersive.com/";
const API_KEY = process.env.CLOUDMERSIVE_API_KEY;

// Express middleware for static files
app.use(express.static("public"));
// Body parser middleware
app.use(bodyParser.urlencoded({ extended: true}));
// Multer middleware for image files parse
const upload = multer({ storage: multer.memoryStorage() }); // Uploads files directly in curr memory

// GET route for the home page
app.get("/", (req, res) => {
    res.render("index.ejs", { message: "Waiting for image..." });
});

// POST route for using the API via axios
app.post("/", upload.single('image'), async (req, res) => {
    try {
        // Create FormData from the Buffer containing image files
        const form = new FormData();
        form.append('imageFile',  req.file.buffer, req.file.originalname);

        // Config for the axios request
        const config = {
            headers: {
                'Apikey': API_KEY,
                ...form.getHeaders() // Takes all needed headers from the FormData
            },
            responseType: 'arraybuffer' // Tells axios to expect byte response
        };

        var style = req.body.style;
        // Check if style is any
        if(style === 'any') {
            var randNum = Math.round(Math.random());
            switch (randNum) {
                case 0: style = 'udnie';
                    break;
                case 1: style = 'wave';
                    break;
            }
        }
        // Axios POST request to the API
        const result = await axios.post(API_URL + `image/artistic/painting/${style}`, form, config);

        // Check result
        console.log('Buffer Length:', result.data.byteLength);
        console.log('First 20 Bytes:', result.data.slice(0, 20));

        const contentType = result.headers['content-type'] || 'image/png';
        console.log('Content-Type:', contentType);

        // Convert response from bytes to Base64 Images
        const generatedBase64Image = `data:${contentType};base64, ${Buffer.from(result.data).toString('base64')}`;
        const originalBase64Image = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;

        console.log('Base64 Image:', generatedBase64Image.slice(0, 50) + '...');
        // Render result
        res.render("index.ejs", { artisticImage: generatedBase64Image, originalImage: originalBase64Image });
    } catch (error) {
        console.log("Error: " + error.message);
        var errorMessage = error.message;
        if (error.status === 500) {
            errorMessage = "This file is too big. Please try with another image!"
        }
        res.render("index.ejs", { message: "Error has occurred: " + errorMessage });
    }
});

// Start server
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});