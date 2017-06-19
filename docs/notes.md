## Alex Skill Development with TypeScript

### JavaScript Hello World
```
exports.handler = function(event, context) {
 context.succeed('Hello, World!');
};
```

### TypeScript Hello World
```
import * as Alexa from 'alexa-sdk';

export class handler {

    constructor(event: any, context: any, callback: any) {
        context.succeed('Hello, World!');
    }
}
```

### Minimal TypeScript
TypeScript
```
let handlerFunction = (event: any, context: any, callback: any) => {
    context.succeed('Hello, World!');
}
exports.handler = handlerFunction;
```
tsc output
```
let handlerFunction = (event, context, callback) => {
    context.succeed('Hello, World!');
};
exports.handler = handlerFunction;
//# sourceMappingURL=minimal.js.map
```

### Class Example
TypeScript
```
class HelloWorld {
    constructor(event: any, context: any, callback: any) {
        context.succeed('Hello, World!');
    }
}

let handler = (event: any, context: any, callback: any) => {
    let helloWorld: HelloWorld = new HelloWorld(event, context, callback);
}

exports.handler = handler;
```
tsc output
```
class HelloWorld {
    constructor(event, context, callback) {
        context.succeed('Hello, World!');
    }
}
let handler = (event, context, callback) => {
    let helloWorld = new HelloWorld(event, context, callback);
};
exports.handler = handler;
//# sourceMappingURL=test.js.map
```

### Dynamo Example
TypeScript
```
const AWS = require('aws-sdk');
import * as Alexa from 'alexa-sdk';

const stockSymbols = {
    disney: 'DIS',
    amazon: 'AMZN',
    apple: 'AAPL',
    google: 'GOOG',
    alphabet: 'GOOG',
};
const myAPI = {
    host: 'finance.google.com',
    port: 80,
    path: '/finance/info?client=ig&q=DIS',
    method: 'GET',
};
const testData = [{ id: '38249', t: 'DIS', e: 'NYSE', l: '104.32' }];

class Handler {

    public speechOutput: string;
    public reprompt: string;
    public welcomeOutput: string = 'This is a placeholder welcome message.';
    public welcomeReprompt: string = 'sample re-prompt text';

    constructor(event: any, context: any, callback: any) {

        let alexa = Alexa.handler(event, context);
        alexa.dynamoDBTableName = 'MarketGuideDynamo';

        // To enable string internationalization (i18n) features, set a resources object.
        // alexa.resources = languageStrings;

        let thiz: Handler = this;
        let handlers: Alexa.Handlers = {
            'Unhandled': function() {
                this.emit(':ask', 'Insert your own error message here');
            },
            'LaunchRequest': function() {
                this.emit(':tell', thiz.welcomeOutput);
            },
            'AboutIntent': function() {
                thiz.speechOutput = '';
                this.emit(':tell', thiz.speechOutput);
            },
            'AMAZON.HelpIntent': function() {
                thiz.speechOutput = '';
                thiz.reprompt = '';
                this.emit(':ask', thiz.speechOutput, thiz.reprompt);
            },
            'AMAZON.CancelIntent': function() {
                thiz.speechOutput = '';
                this.emit(':tell', thiz.speechOutput);
            },
            'AMAZON.StopIntent': function() {
                let myName = '';
                if (this.attributes['name']) {
                    myName = this.attributes['name'];
                }
                this.emit(':tell', 'goodbye, ' + myName, 'try again');
            },
            'SessionEndedRequest': function() {
                thiz.speechOutput = '';
                this.emit(':tell', thiz.speechOutput);
            },
            'BuySellSharesIntent': function() {
                let request: any = this.event.request;
                let companySlot = request.intent.slots.company.value.toLowerCase();
                let stockSymbol = stockSymbols[companySlot];
                let amountSlot = request.intent.slots.amount.value.toLowerCase();
                let commandSlot = request.intent.slots.command.value.toLowerCase();

                let portfolio: any = {
                    stocks: [],
                };
                if (this.attributes['portfolio']) {
                    portfolio = this.attributes['portfolio'];
                }

                let transaction = {
                    command: commandSlot,
                    company: companySlot,
                    amount: amountSlot,
                    timestamp: new Date().getTime(),
                };
                portfolio.stocks.push(transaction);
                this.attributes['portfolio'] = portfolio;

                thiz.speechOutput = 'OK, I will ' + commandSlot + ' ' + amountSlot + ' shares of ' + stockSymbol;
                this.emit(':tell', thiz.speechOutput);
            },
            'GetPortfolioInfoIntent': function() {
                thiz.speechOutput = '';
                this.emit(':tell', thiz.speechOutput);
            },
            'GetCompanyInfoIntent': function() {
                let request: any = this.event.request;
                let companySlot = request.intent.slots.company.value.toLowerCase();
                let stockSymbol = stockSymbols[companySlot];
                if (stockSymbol) {
                    thiz.getStockQuote(stockSymbol, (symbol: string, exchange: string, price: string) => {
                        this.emit(':tell', 'The current stock price for ' + companySlot + ' on the ' + exchange + ' is ' + price);
                    });
                } else {
                    this.emit(':tell', 'I\'m sorry. I don\'t have that information for ' + companySlot);
                }
            },
            'GetLeaderBoardInfoIntent': function() {
                thiz.speechOutput = '';
                this.emit(':tell', thiz.speechOutput);
            },
            'MyNameIsIntent': function() {
                let request: any = this.event.request;
                let myName = request.intent.slots.firstname.value;
                this.attributes['name'] = myName;
                this.emit(':ask', 'hello, ' + myName, 'try again');

            },
        };
        //
        alexa.registerHandlers(handlers);
        alexa.execute();
    }

    getStockQuote(stockSymbol: string, callback: any): void {
        let http = require('http');

        myAPI.path = '/finance/info?client=ig&q=' + stockSymbol;

        let req = http.get(myAPI, (res: any) => {
            res.setEncoding('utf8');
            let returnData = '';

            res.on('data', (chunk: any) => {
                returnData = returnData + chunk;
            });
            res.on('end', () => {
                returnData = returnData.substring(3);
                let channelObj = testData;
                try {
                    channelObj = JSON.parse(returnData);
                } catch (e) {
                    console.log(e);
                }
                let symbol = channelObj[0].t;
                let exchange = channelObj[0].e;
                let price = channelObj[0].l;

                callback(symbol, exchange, price);
            });
        });
        req.end();
    }
}

let handler = (event: any, context: any, callback: any) => {
    let instance: Handler = new Handler(event, context, callback);
}

exports.handler = handler;
```
tsc output
```
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AWS = require('aws-sdk');
const Alexa = require("alexa-sdk");
const stockSymbols = {
    disney: 'DIS',
    amazon: 'AMZN',
    apple: 'AAPL',
    google: 'GOOG',
    alphabet: 'GOOG',
};
const myAPI = {
    host: 'finance.google.com',
    port: 80,
    path: '/finance/info?client=ig&q=DIS',
    method: 'GET',
};
const testData = [{ id: '38249', t: 'DIS', e: 'NYSE', l: '104.32' }];
class Handler {
    constructor(event, context, callback) {
        this.welcomeOutput = 'This is a placeholder welcome message.';
        this.welcomeReprompt = 'sample re-prompt text';
        let alexa = Alexa.handler(event, context);
        alexa.dynamoDBTableName = 'MarketGuideDynamo';
        // To enable string internationalization (i18n) features, set a resources object.
        // alexa.resources = languageStrings;
        let thiz = this;
        let handlers = {
            'Unhandled': function () {
                this.emit(':ask', 'Insert your own error message here');
            },
            'LaunchRequest': function () {
                this.emit(':tell', thiz.welcomeOutput);
            },
            'AboutIntent': function () {
                thiz.speechOutput = '';
                this.emit(':tell', thiz.speechOutput);
            },
            'AMAZON.HelpIntent': function () {
                thiz.speechOutput = '';
                thiz.reprompt = '';
                this.emit(':ask', thiz.speechOutput, thiz.reprompt);
            },
            'AMAZON.CancelIntent': function () {
                thiz.speechOutput = '';
                this.emit(':tell', thiz.speechOutput);
            },
            'AMAZON.StopIntent': function () {
                let myName = '';
                if (this.attributes['name']) {
                    myName = this.attributes['name'];
                }
                this.emit(':tell', 'goodbye, ' + myName, 'try again');
            },
            'SessionEndedRequest': function () {
                thiz.speechOutput = '';
                this.emit(':tell', thiz.speechOutput);
            },
            'BuySellSharesIntent': function () {
                let request = this.event.request;
                let companySlot = request.intent.slots.company.value.toLowerCase();
                let stockSymbol = stockSymbols[companySlot];
                let amountSlot = request.intent.slots.amount.value.toLowerCase();
                let commandSlot = request.intent.slots.command.value.toLowerCase();
                let portfolio = {
                    stocks: [],
                };
                if (this.attributes['portfolio']) {
                    portfolio = this.attributes['portfolio'];
                }
                let transaction = {
                    command: commandSlot,
                    company: companySlot,
                    amount: amountSlot,
                    timestamp: new Date().getTime(),
                };
                portfolio.stocks.push(transaction);
                this.attributes['portfolio'] = portfolio;
                thiz.speechOutput = 'OK, I will ' + commandSlot + ' ' + amountSlot + ' shares of ' + stockSymbol;
                this.emit(':tell', thiz.speechOutput);
            },
            'GetPortfolioInfoIntent': function () {
                thiz.speechOutput = '';
                this.emit(':tell', thiz.speechOutput);
            },
            'GetCompanyInfoIntent': function () {
                let request = this.event.request;
                let companySlot = request.intent.slots.company.value.toLowerCase();
                let stockSymbol = stockSymbols[companySlot];
                if (stockSymbol) {
                    thiz.getStockQuote(stockSymbol, (symbol, exchange, price) => {
                        this.emit(':tell', 'The current stock price for ' + companySlot + ' on the ' + exchange + ' is ' + price);
                    });
                }
                else {
                    this.emit(':tell', 'I\'m sorry. I don\'t have that information for ' + companySlot);
                }
            },
            'GetLeaderBoardInfoIntent': function () {
                thiz.speechOutput = '';
                this.emit(':tell', thiz.speechOutput);
            },
            'MyNameIsIntent': function () {
                let request = this.event.request;
                let myName = request.intent.slots.firstname.value;
                this.attributes['name'] = myName;
                this.emit(':ask', 'hello, ' + myName, 'try again');
            },
        };
        //
        alexa.registerHandlers(handlers);
        alexa.execute();
    }
    getStockQuote(stockSymbol, callback) {
        let http = require('http');
        myAPI.path = '/finance/info?client=ig&q=' + stockSymbol;
        let req = http.get(myAPI, (res) => {
            res.setEncoding('utf8');
            let returnData = '';
            res.on('data', (chunk) => {
                returnData = returnData + chunk;
            });
            res.on('end', () => {
                returnData = returnData.substring(3);
                let channelObj = testData;
                try {
                    channelObj = JSON.parse(returnData);
                }
                catch (e) {
                    console.log(e);
                }
                let symbol = channelObj[0].t;
                let exchange = channelObj[0].e;
                let price = channelObj[0].l;
                callback(symbol, exchange, price);
            });
        });
        req.end();
    }
}
let handler = (event, context, callback) => {
    let instance = new Handler(event, context, callback);
};
exports.handler = handler;
//# sourceMappingURL=index.js.map
```
