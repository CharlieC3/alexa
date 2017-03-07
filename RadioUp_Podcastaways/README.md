CHALLENGE 3 - ALEXA

RadioUp - Podcastaways

Podcastaways (Podcast query service) 

Team: Niranjala Senaratne, A. 'Tope' Adekanbi, Mayura Boosa, 'The Don' Ward

Schedule Ingest - Niranjala Senaratne
Schedule Service - Mayura Boosa
Alexa Lambda - A. 'Tope' Adekanbi
DynamoDb - 'The Don' Ward


Description:


=============
UTTERANCES

Get List of Shows
Get Show
Play Show Audio
Get Random Show

=============
PROMPTS

<prompt> <MySkill> Get List of Shows </prompt>
<speak>"Available Shows are " + [3 shows] + '. pick a show to play, say resume or say stop.'</speak>

<alexa listens>

<prompt> play {show name} </prompt>
<speak> Playing Audio from {show name}. Track name is {show headline, show description} </speak>

or

=============
SETUP

In AWS Console
1. Configure Triggers Alexa Skills Kit ->> Lambda Functions
2. Configure Function setup name, description, and runtime (Node.js 4.3)
3. Lambda function code - Edit code inline (see directory alexa/RadioUp_Podcastaways/js/index.js)
4. optional - add code via zip
5. Setup Lambda function handler and role
6. Create new Role - use default (lambda_basic_execution)
7. Save Settings

FYI to create a zip file via terminal:
1. git clone git@code.espn.com:prg-lvl-up/alexa.git
2. cd RadioUp - Podcastaways/js
3. npm install
4. zip -r ../radio-up.zip *

In Developer.amazon.com
1. Click on “ALEXA” sub tab
2. Under “Alexa Skills Kit”, click “Get Started”
3. At top right, click “Add a New Skill”
4. Under Skill Information…
5. Skill Type -> Custom Interaction Model
6. Language -> english (us)
7. Add a name for the skill (Name)
8. Add an Invocation Name, for example, “radio-up” , “open radio-up and say get list“
9. Save
10. Under Configuraton…
11. Select “AWS Lambda ARN (Amazon Resource Name)
12. Check North America
13. In the North America form field, add the ARN value. Get the ARN from the AWS console, top right in the AWS Lambda section. 
    ex. ARN - arn:aws:lambda:us-east-1:902723448691:function:Hello-World
14. Save
15. Under Interaction Model…
16. Add JSON Intent Schema (see Notes for example)
17. Add Slots if applicable
18. Add Sample Utterances, as many examples you can think of.
19. Save
20. Under Test…
21. enter utterances examples in the voice simulator to conform speech
22. Enter Utterances, in Service Simulator
23. Confirm JSON lambda request and response value
24. Save

In Alexa.amazon.com
1. Test your Skill (in Dev mode)
2. goto Alexa.amazon.com
3. goto Skills section
4. Top right click on “Your Skills” link
5. See your Skill with green icon that says “devUS”
6. Test on actual device using Invocation name and sample utterances.
