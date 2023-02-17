import {pathsToModuleNameMapper} from 'ts-jest'
import {compilerOptions} from './tsconfig.json'
import type {Config} from 'jest'
import 'dotenv/config'

export default async (): Promise<Config> => {
  return {
    preset: 'ts-jest',
    testEnvironment: 'node',
    roots: ['<rootDir>'],
    modulePaths: [compilerOptions.baseUrl],
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
    setupFilesAfterEnv: ['./tests/setup.ts'],
    verbose: true,
    testTimeout: 15000,
  }
}
