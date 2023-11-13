#!/bin/bash

# Path to the file you want to check
FILE=dist/apps/steps-proxy/main.js

# Check if the file exists
if [ -f "$FILE" ]; then
    echo "$FILE exists, starting the proxy..."
else
    echo "$FILE does not exist, building the project..."
    # Run the build command if the file doesn't exist
    ./node_modules/.bin/nx run steps-proxy:build
fi

# Start the proxy
node "$FILE"
