class HelloWorld {
    constructor(event: any, context: any, callback: any) {
        context.succeed('Hello, World!');
    }
}

let handler = (event: any, context: any, callback: any) => {
    let helloWorld: HelloWorld = new HelloWorld(event, context, callback);
}

exports.handler = handler;
