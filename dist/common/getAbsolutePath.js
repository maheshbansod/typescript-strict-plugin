"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAbsolutePath = void 0;
const path_1 = require("path");
function getAbsolutePath(projectRootPath, filePath) {
    if (path_1.isAbsolute(filePath))
        return filePath;
    return path_1.resolve(projectRootPath, filePath);
}
exports.getAbsolutePath = getAbsolutePath;
