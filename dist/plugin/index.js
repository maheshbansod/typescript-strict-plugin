"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PluginStrictFileChecker_1 = require("./PluginStrictFileChecker");
const utils_1 = require("./utils");
const init = () => {
    function create(info) {
        const proxy = utils_1.setupProxy(info);
        utils_1.log(info, 'Plugin initialized');
        proxy.getSemanticDiagnostics = function (filePath) {
            const strictFile = new PluginStrictFileChecker_1.PluginStrictFileChecker(info).isFileStrict(filePath);
            if (strictFile) {
                utils_1.turnOnStrictMode(info, info.project.getCompilerOptions(), info.config.overrides);
            }
            else {
                utils_1.turnOffStrictMode(info, info.project.getCompilerOptions(), info.config.overrides);
            }
            return info.languageService.getSemanticDiagnostics(filePath);
        };
        return proxy;
    }
    return { create };
};
module.exports = init;
