const AWS = require('aws-sdk');

/*
// Initialize the Amazon Cognito credentials provider
CognitoCachingCredentialsProvider credentialsProvider = new CognitoCachingCredentialsProvider(
    getApplicationContext(),
    "us-east-1:2c15a7db-7fc4-43e5-be3c-452b9805bd89", // Identity Pool ID
    Regions.US_EAST_1 // Region
);
*/
const config = require('./data/aws-config.json');
AWS.config.update({region: 'us-east-1', apiVersion: '2015-03-31'});
AWS.config.credentials = new AWS.CognitoIdentityCredentials({IdentityPoolId: config.cogitoIdentityPoolId});

var lambda = new AWS.Lambda();
// create JSON object for parameters for invoking Lambda function
var payload = {
    httpMethod: "GET",
    queryStringParameters: { TableName: config.alexaDynamoDBTableName }
}
var pullParams = {
  FunctionName : config.lambdaFunctionNameForDBAccess,
  InvocationType : 'RequestResponse',
  Payload: JSON.stringify(payload),
  LogType : 'None'
};
// create variable to hold data returned by the Lambda function
var pullResults;

lambda.invoke(pullParams, function(error, data) {
  if (error) {
    console.log(error);
  } else {
    pullResults = JSON.parse(data.Payload);
    console.log(pullResults);
  }
});


//////// THE CORRESPONDING LAMBDA

/*
'use strict';

console.log('Loading function');

const doc = require('dynamodb-doc');

const dynamo = new doc.DynamoDB();

 // **
 // * Demonstrates a simple HTTP endpoint using API Gateway. You have full
 // * access to the request and response payload, including headers and
 // * status code.
 // *
 // * To scan a DynamoDB table, make a GET request with the TableName as a
 // * query string parameter. To put, update, or delete an item, make a POST,
 // * PUT, or DELETE request respectively, passing in the payload to the
 // * DynamoDB API as a JSON body.
 // *
exports.handler = (event, context, callback) => {
    console.log('Received event:', JSON.stringify(event, null, 2));
    console.log('Received context:', JSON.stringify(context, null, 2));

    const done = (err, res) => callback(null, {
        statusCode: err ? '400' : '200',
        body: err ? err.message : JSON.stringify(res),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    switch (event.httpMethod) {
        case 'DELETE':
            dynamo.deleteItem(JSON.parse(event.body), done);
            break;
        case 'GET':
            dynamo.scan({ TableName: event.queryStringParameters.TableName }, done);
            break;
        case 'POST':
            dynamo.putItem(JSON.parse(event.body), done);
            break;
        case 'PUT':
            dynamo.updateItem(JSON.parse(event.body), done);
            break;
        default:
            done(new Error(`Unsupported method "${event.httpMethod}"`));
    }
};
*/
