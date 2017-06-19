## A TypeScript Alexa Skill Example

### Build and Test
- `npm install`
- `npm run build`
- `npm run test` (node testflow.js)

### aws-config.json
- in order to run/test the code:
- - Copy data/aws-config-template.json and rename it aws-config.json
- - Edit the appId and cognitoIdentityPoolId fields
```
{
    "region": "us-east-1",
    "cognitoIdentityPoolId": "[your cognito identity pool id]",
    "appId": "[your skill's app id]",
    "alexaDynamoDBTableName": "MarketGuideDynamo",
    "lambdaFunctionNameForDBAccess": "MarketGuideLambdaDB"
}
```

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
- requires that a Cognito identity pool be specified (not necessary when deployed)
```
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: '[your cognito identity pool id]'
});
```
- requires a valid alexa skill/app id
```
var appId = '[your skill's app id]';
```

### callLambda.js
- Shows how to access the app/skill's DynamoDB using a vanilla (non-alexa) lambda

### Speech Assets
- these are not part of the lambda build process but are helpful when creating the skill
- speechAssets/IntentSchema.json
- speechAssets/InteractionModel.json (can be pasted into a new skill)
- speechAssets/SampleUtterances.txt

### Deploy
- copy lib/index.js to the lambda code editor
- (or set up the aws CLI ...)
