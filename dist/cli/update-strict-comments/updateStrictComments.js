"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateStrictComments = void 0;
const getFilePaths_1 = require("./getFilePaths");
const isCommentPresent_1 = require("../isCommentPresent");
const isFileStrictByPath_1 = require("../../common/isFileStrictByPath");
const commentOperations_1 = require("./commentOperations");
async function updateStrictComments(filePaths, configPaths, overrides) {
    const filesWithErrors = await getFilePaths_1.getFilePathsWithErrors(filePaths, overrides !== null && overrides !== void 0 ? overrides : {});
    const filesOnPathWithoutErrors = getFilePaths_1.getFilePathsOnPathWithoutErrors(filePaths, filesWithErrors, configPaths);
    let updatedFileCount = 0;
    filesOnPathWithoutErrors.forEach((filePath) => {
        if (shouldRemoveStrictComment(filePath, configPaths)) {
            commentOperations_1.removeStrictComment(filePath);
            updatedFileCount++;
        }
    });
    filesWithErrors.forEach((filePath) => {
        const insertIgnore = shouldInsertIgnoreComment(filePath, configPaths);
        const removeStrict = shouldRemoveStrictComment(filePath, configPaths);
        if (insertIgnore) {
            commentOperations_1.insertIgnoreComment(filePath);
        }
        if (removeStrict) {
            commentOperations_1.removeStrictComment(filePath);
        }
        if (removeStrict || insertIgnore) {
            updatedFileCount++;
        }
    });
    return { updatedFileCount };
}
exports.updateStrictComments = updateStrictComments;
function shouldInsertIgnoreComment(filePath, configPaths) {
    return isFileStrictByPath_1.isFileStrictByPath({ filePath, configPaths }) && !isCommentPresent_1.isIgnoreCommentPresent(filePath);
}
function shouldRemoveStrictComment(filePath, configPaths) {
    return isFileStrictByPath_1.isFileStrictByPath({ filePath, configPaths }) && isCommentPresent_1.isStrictCommentPresent(filePath);
}
