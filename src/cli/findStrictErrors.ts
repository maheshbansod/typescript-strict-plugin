import { compile } from './typescript/compile';
import path from 'path';
import { waitWithSpinner } from './waitWithSpinner';
import { CompilerOptions } from 'typescript';

export async function findStrictErrors(
  strictPaths: string[],
  overrides: CompilerOptions,
): Promise<string[]> {
  if (strictPaths.length === 0) {
    return [];
  }

  const tscErrorMap = await waitWithSpinner(
    () => compile(overrides),
    'Compiling with strict mode...',
  );

  return strictPaths.flatMap((filePath) => {
    return tscErrorMap.get(path.resolve(filePath)) ?? [];
  });
}
