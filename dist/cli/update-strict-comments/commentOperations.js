"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeStrictComment = exports.insertIgnoreComment = void 0;
const fs_1 = require("fs");
const constants_1 = require("../../common/constants");
function insertIgnoreComment(filePath) {
    const fileContent = fs_1.readFileSync(filePath, 'utf-8');
    const data = '// ' + constants_1.TS_STRICT_IGNORE_COMMENT + '\n' + fileContent;
    fs_1.writeFileSync(filePath, data);
}
exports.insertIgnoreComment = insertIgnoreComment;
function removeStrictComment(filePath) {
    const fileContent = fs_1.readFileSync(filePath, 'utf-8');
    const data = fileContent
        .split('\n')
        .filter((line) => !line.includes(constants_1.TS_STRICT_COMMENT))
        .join('\n');
    if (data !== fileContent) {
        fs_1.writeFileSync(filePath, data);
    }
}
exports.removeStrictComment = removeStrictComment;
