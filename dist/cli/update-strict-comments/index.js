#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
const findStrictFiles_1 = require("../findStrictFiles");
const chalk_1 = __importDefault(require("chalk"));
const updateStrictComments_1 = require("./updateStrictComments");
const waitWithSpinner_1 = require("../waitWithSpinner");
const errorMessages_1 = require("../errorMessages");
const utils_1 = require("../../common/utils");
const getPluginConfig_1 = require("../getPluginConfig");
const run = async () => {
    const pluginConfig = await getPluginConfig_1.getPluginConfig();
    if (!pluginConfig) {
        console.log(chalk_1.default.red(errorMessages_1.notConfiguredError));
        process.exit(1);
        return;
    }
    const strictFilePaths = await waitWithSpinner_1.waitWithSpinner(findStrictFiles_1.findStrictFiles, 'Looking for strict files...');
    if (!strictFilePaths.length) {
        console.log(chalk_1.default.red(errorMessages_1.noStrictFilesError));
        process.exit(1);
        return;
    }
    console.log(`🎯 Found ${strictFilePaths.length} strict ${utils_1.pluralize('file', strictFilePaths.length)}`);
    const { updatedFileCount } = await updateStrictComments_1.updateStrictComments(strictFilePaths, pluginConfig.paths);
    console.log(`🔧 Updated comments in ${updatedFileCount} ${utils_1.pluralize('file', strictFilePaths.length)}`);
};
exports.run = run;
exports.run();
