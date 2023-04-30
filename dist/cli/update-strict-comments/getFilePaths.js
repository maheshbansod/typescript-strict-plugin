"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFilePathsOnPathWithoutErrors = exports.getFilePathsWithErrors = void 0;
const isFileStrictByPath_1 = require("../../common/isFileStrictByPath");
const getAbsolutePath_1 = require("../../common/getAbsolutePath");
const findStrictErrors_1 = require("../findStrictErrors");
const getFilePathsWithErrors = async (allFilePaths, overrides) => {
    const errors = await findStrictErrors_1.findStrictErrors(allFilePaths, overrides);
    const getFilePathFromErrorMessage = (error) => getAbsolutePath_1.getAbsolutePath(process.cwd(), error.split('(')[0]);
    return [...new Set(errors.map(getFilePathFromErrorMessage))];
};
exports.getFilePathsWithErrors = getFilePathsWithErrors;
const getFilePathsOnPathWithoutErrors = (allFilePaths, filePathsWithErrors, configPaths) => allFilePaths.filter((filePath) => isFileStrictByPath_1.isFileStrictByPath({ filePath, configPaths }) && !filePathsWithErrors.includes(filePath));
exports.getFilePathsOnPathWithoutErrors = getFilePathsOnPathWithoutErrors;
