#!/bin/bash

# Fetch API key.
API_FILE="openai-key.txt"
API_KEY=$(cat ${API_FILE})

# Call the OpenAI services.
curl "https://api.openai.com/v1/images/generations" \
    -H "Authorization: Bearer ${API_KEY}" \
    -H "Content-Type: application/json" \
    -d '{ 
        "prompt": "A banana jedi fights cauliflower storm troopers with a green Broccoli light saber.",
        "n": 1,
        "size": "512x512"
        }'

