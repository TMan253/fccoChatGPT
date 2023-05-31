// This won't work client-side from a browser due to CORS.
async function fetchApiKey() {
    const fileName = "openai-key.txt"
    key = ""
    try {
        const key = await fetch(fileName)
            .then(response => response.text())
    }
    catch(error) {
        console.log(`Error reading ${fileName} file:`, error)
    }
    return key
}

async function fetchChatGptCompletions() {
    const apiUrl = "https://api.openai.com/v1/completions"
    const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${API_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "text-davinci-003",
            prompt: "How are you doing today? Be concise.",
            max_tokens: 10
        })
    })
    const data = await response.json()
    console.log(data)
    return data
}

async function fetchChatGptChatCompletions() {
    const apiUrl = "https://api.openai.com/v1/chat/completions"
    const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${API_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            //model: "gpt-4",
            model: "gpt-3.5-turbo",
            messages: [{
                role: "user",
                content: "Hello! Be concise."
            }]
        })
    })
    const data = await response.json()
    console.log(data)
    return data
}

//const API_KEY = fetchApiKey()     // CORS issue from browser.
const API_KEY="lalala"
fetchChatGptCompletions()
fetchChatGptChatCompletions()
