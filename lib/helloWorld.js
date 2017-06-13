class HelloWorld {
    constructor(event, context, callback) {
        context.succeed('Hello, World!');
    }
}
let handler = (event, context, callback) => {
    let helloWorld = new HelloWorld(event, context, callback);
};
exports.handler = handler;
//# sourceMappingURL=helloWorld.js.map