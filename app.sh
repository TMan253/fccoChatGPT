#!/bin/bash

# Fetch API key.
API_FILE="openai-key.txt"
API_KEY=$(cat ${API_FILE})

# Call the OpenAI services.
curl "https://api.openai.com/v1/completions" \
    -H "Authorization: Bearer ${API_KEY}" \
    -H "Content-Type: application/json" \
    -d '{ 
        "model": "text-davinci-003",
        "prompt": "How are you doing today? Be concise.",
        "max_tokens": 10,
        "temperature": 0
        }'

curl "https://api.openai.com/v1/chat/completions" \
    -H "Authorization: Bearer ${API_KEY}" \
    -H "Content-Type: application/json" \
    -d '{ 
        "model": "gpt-3.5-turbo",
        "messages": [{
            "role": "user", "content": "Hi! Be concise."
            }]
        }'
