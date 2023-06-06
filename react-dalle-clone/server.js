const PORT = 8000
const express = require('express')
const cors = require('cors')
const fs = require('fs')
const multer = require('multer')

const app = express()
app.use(cors())
app.use(express.json())

require('dotenv').config()

// OpenAI setup.
const { Configuration, OpenAIApi } = require("openai")
const configuration = new Configuration({
    apiKey: process.env.API_KEY
})
const openai = new OpenAIApi(configuration)

// Server-side storage setup.
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Files will be stored the ./public/ folder.
        cb(null, 'public')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname)
    }
})
const upload = multer({ storage: storage }).single('file')
let filePath

// Backend APIs.
app.post("/images", async (req, res) => {
    try {
        const response = await openai.createImage({
            prompt: req.body.message,
            n: 1,
            size: "512x512"
        })
        res.send(response.data.data)
    } catch (error) {
        console.error(error)
    }
})

app.post("/upload", async (req, res) => {
    await upload(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
        } else if (err) {
            return res.status(500).json(err)
        }
        console.log(req.file)
        filePath = req.file.path
    })
})

app.post("/variations", async (req, res) => {
    try {
        const response = await openai.createImageVariation(
            fs.createReadStream(filePath),
            1,
            "512x512"
        )
        res.send(response.data.data)
    } catch (error) {
        console.error(error)
    }
})

// Start the backend server.
app.listen(PORT, () => console.log("Your server is running on PORT " + PORT))

