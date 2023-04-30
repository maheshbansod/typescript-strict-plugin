import type { CompilerOptions } from 'typescript';

export interface Config {
  paths?: string[];
  overrides?: CompilerOptions;
}
