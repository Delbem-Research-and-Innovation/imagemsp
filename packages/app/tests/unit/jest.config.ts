import { jestUnitConfig } from '@ttoss/config';

export default jestUnitConfig({
  testEnvironment: 'jsdom',
  setupFiles: ['<rootDir>/setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/../../src/$1',
  },
  coverageThreshold: {
    global: {
      lines: 50,
      functions: 50,
      branches: 50,
      statements: 50,
    },
  },
});
