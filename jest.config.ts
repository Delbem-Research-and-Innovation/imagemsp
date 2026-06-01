import { jestRootConfig } from '@ttoss/config';

const config = jestRootConfig();

export default {
  ...config,
  moduleNameMapper: {
    ...config.moduleNameMapper,
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};
