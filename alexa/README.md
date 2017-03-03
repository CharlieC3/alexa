# Alexa App

## Pre-requisites

1. Install NodeJS
2. Install serverless

## Lambda Functions

### headlines
A lambda function that acts as a passthrough to the headlines API.

### scoreboard
A lambda function that acts as a passthrough to the scoreboard API.

### espnAlex
A lambda function that responds to requests from Alexa when questions are asked.

## Build
Each lambda function contains `build-scripts` folder.  Simply execute the `build.sh` file.

## Deployment
Each lambda function contains `build-scripts` folder.  Simply execute the `deploy.sh` file. The 
`deploy.sh` file uses `serverless` to package itself and deploy it to AWS appropriately.

