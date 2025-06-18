import minimist from "minimist";

export default () => {

    const [, , commandName, ...rawArgs] = process.argv;
    const args = minimist(rawArgs);
    delete args["_"];

    return {
        commandName: () => {
            return commandName
        },
        arguments: () => {
            return args;
        }
    }
}