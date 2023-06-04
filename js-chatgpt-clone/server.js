const PORT = 8000
const fileName = "../openai-key.txt"
const CHAT_API_URL = "https://api.openai.com/v1/chat/completions"

const express = require("express")
const cors = require("cors")
require('dotenv').config()

const app = express()
app.use(express.json())
app.use(cors())


// Read API key from file.
const API_KEY = process.env.API_KEY

app.post("/completions", async (req, res) => {
    //console.error(API_KEY)
    const options = {
        method: 'POST',
        headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{role: "user", content: req.body.message}],
        max_tokens: 100
        })}
    try {
        // Call the OpenAI API.
        const response = await fetch(CHAT_API_URL, options)
        const data = await response.json()
        res.send(data)
    } catch (error) {
        console.error(error)
    }
})

app.listen(PORT,
    () => console.log("Your server is running on PORT " + PORT))

