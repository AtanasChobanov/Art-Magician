#Art Magician - Using Cloadmersive API

##Overview
In this project, students are expected to build a website using the Express/Node.js platform, with the Axios HTTP client, that integrates a chosen public API from the given list: [Public API Lists](https://github.com/appbrewery/public-api-lists). The website should interact with the chosen API, retrieve data, and present it in a user-friendly manner.

##Specificity
This website uses Cloudmersive API, which is a machine learning model for generating images and much more. You can check their services at https://www.cloudmersive.com/image-recognition-and-processing-api. The user can send an image and choose an art style (Udnie/Wave) via the website to get a generated picture of whatever they want. There are limits on the size of the input file as well as the number of requests/month due to the free tier of the API key that is used.

##Usage
The server is hosted with Render at ... **Keep in mind that it can take up to 1 minute to load the website!**

###If you want to run it locally
1. Clone this repository: `git clone https://github.com/AtanasChobanov/Art-Magician.git`
2. CD to the cloned repository: `cd Art-Magician`
3. Install all required node modules: `npm i`
4. Run the server: `node index.js`
5. Your server is listening on http://localhost:3000/.

