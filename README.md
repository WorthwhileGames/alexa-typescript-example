## A TypeScript Alexa Skill Example

### Build and Test
- `npm install`
- `npm run build`
- `npm run test` (node testflow.js)

### testflow.js
- provided by amazon in the alexa-cookbook repo
- invokes the intents specified in dialogs/default.txt
- - https://github.com/alexa/alexa-cookbook/tree/master/testing/TestFlow
- requires that the region be specified in the code (not necessary when deployed)
```
AWS.config.update({
    region: "us-east-1"
});
```
- requires that a Cogito identity pool be specified (not necessary when deployed)
```
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: '[your cogito identity pool id]'
});
```
- requires a valid alexa skill/app id
```
var appId = '[your skill's app id]';
```

### Speech Assets
- these are not part of the lambda build process but are helpful when creating the skill
- speechAssets/IntentSchema.json
- speechAssets/InteractionModel.json (can be pasted into a new skill)
- speechAssets/SampleUtterances.txt

### Deploy
- Copy lib/index.js to the lambda code editor
- (or set up the aws CLI ...)
