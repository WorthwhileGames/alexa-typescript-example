let handlerFunction = (event: any, context: any, callback: any) => {
    context.succeed('Hello, World!');
}
exports.handler = handlerFunction;
