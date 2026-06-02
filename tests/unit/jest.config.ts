import { jestUnitConfig } from '@ttoss/config';

const config = jestUnitConfig({
  coverageThreshold: {
    global: {
      branches: 10,
      functions: 10,
      lines: 10,
      statements: 10,
    },
  },
});

export default {
  ...config,
  moduleNameMapper: {
    ...config.moduleNameMapper,
    '^@/(.*)$': '<rootDir>/../../src/$1',
  },
};
