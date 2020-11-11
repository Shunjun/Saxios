import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  transform: {
    '.(ts|tsx)': 'ts-jest',
  },
  testEnvironment: 'jsdom',
  testRegex: '/test/.*\\.(test|spec)\\.(ts)$',
  // 路径映射
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 95,
      lines: 95,
      statements: 95,
    },
  },
  collectCoverageFrom: ['src/*.{js,ts}', 'src/**/*.{js,ts}'],
  setupFilesAfterEnv: ['<rootDir>/test/boot.ts'],
  globals: {
    'ts-jest': {
      isolatedModules: true,
    },
  },
};

export default config;
