const API_URL="https://api.openai.com/v1/images/generations"
var API_KEY="lala"

// This won't work client-side from a browser due to CORS.
async function fetchApiKey() {
    const fileName = "openai-key.txt"
    var key = ""
    try {
        key = await fetch(fileName).then(
            response => response.text())
    }
    catch(error) {
        console.log(`Error reading ${fileName} file:`, error)
    }
    return key
}

async function fetchImages() {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${API_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            prompt: "Luke Skywalker fighting Darth Vader with a green Broccoli light saber",
            n: 1,
            size: "1024x1024"
        })
    })
    const data = await response.json()
    console.log(data)
}

//API_KEY=fetchApiKey()
fetchImages()

