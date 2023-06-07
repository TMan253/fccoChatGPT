import express, { Application, Request, Response } from "express"
import cors from "cors"
import { Configuration, OpenAIApi } from "openai"
import dotenv from "dotenv"

dotenv.config()

const API_KEY: string = process.env.API_KEY || ""
const PORT: number = 8000

const app: Application = express()
app.use(cors())
app.use(express.json())

const configuration = new Configuration({
    apiKey: API_KEY
})

const openai = new OpenAIApi(configuration)

app.post("/completions", async (req: Request, res: Response) => {
    console.log("Got message: " + req.body.message)
    try {
        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "user",
                    content: "Create a SQL request to " + req.body.message
                }
            ]
        })
        res.send(completion.data.choices[0].message)
    } catch (error) {
        console.error(error)
        res.status(500).send("Server error")
    }
})

app.listen(PORT, () => console.log(`Express server running on port ${PORT}`))

