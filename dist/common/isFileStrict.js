"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isFileStrict = void 0;
const isFileStrictByPath_1 = require("./isFileStrictByPath");
const constants_1 = require("./constants");
// Common logic determining whether file is strict or not
function isFileStrict({ filePath, config, projectPath, isCommentPresent, }) {
    var _a;
    if (isCommentPresent(constants_1.TS_STRICT_IGNORE_COMMENT, filePath)) {
        return false;
    }
    if (isCommentPresent(constants_1.TS_STRICT_COMMENT, filePath)) {
        return true;
    }
    const configPaths = (_a = config === null || config === void 0 ? void 0 : config.paths) !== null && _a !== void 0 ? _a : [];
    const fileStrictByPath = isFileStrictByPath_1.isFileStrictByPath({ filePath, configPaths, projectPath });
    if (configPaths.length > 0 && !fileStrictByPath) {
        return false;
    }
    return true;
}
exports.isFileStrict = isFileStrict;
