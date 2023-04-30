import { getPosixFilePath, isFile } from '../common/utils';
import * as typescript from './typescript/typescript';
import { CliStrictFileChecker } from './CliStrictFileChecker';
import { getPluginConfig } from './getPluginConfig';
import { CompilerOptions } from 'typescript';

export async function findStrictFiles(): Promise<string[]> {
  const pluginConfig = await getPluginConfig();
  if (!pluginConfig) {
    return [];
  }
  const filesCheckedByTS = await getFilesCheckedByTs(pluginConfig.overrides ?? {});

  const cliStrictFileChecker = new CliStrictFileChecker();

  return filesCheckedByTS.filter((filePath) =>
    cliStrictFileChecker.isFileStrict(filePath, pluginConfig),
  );
}

const filterOutNodeModulesFiles = (files: string[]): string[] => {
  return files.filter((filePath) => !filePath.includes('/node_modules/'));
};

async function getFilesCheckedByTs(overrides: CompilerOptions): Promise<string[]> {
  const filesCheckedByTs = await typescript.compile(overrides);
  const filePaths = filesCheckedByTs.split(/\r?\n/).filter(isFile).map(getPosixFilePath);

  return filterOutNodeModulesFiles(filePaths);
}
