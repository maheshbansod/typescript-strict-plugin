"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isFileStrictByPath = void 0;
const isFileOnPath_1 = require("./isFileOnPath");
function isFileStrictByPath({ filePath, projectPath, configPaths, }) {
    if (configPaths === undefined) {
        return true;
    }
    return configPaths === null || configPaths === void 0 ? void 0 : configPaths.some((strictPath) => isFileOnPath_1.isFileOnPath({
        filePath,
        targetPath: strictPath,
        projectPath,
    }));
}
exports.isFileStrictByPath = isFileStrictByPath;
