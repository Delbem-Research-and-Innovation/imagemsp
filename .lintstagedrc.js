import { lintstagedConfig } from '@ttoss/config';

const defaultConfig = lintstagedConfig();

export default {
  ...defaultConfig,
  // eslint-plugin-react@7.x is incompatible with eslint@10 used by @ttoss/eslint-config.
  // packages/app uses eslint-config-next with its own eslint.config.mjs, so we skip
  // those files here to avoid the `contextOrFilename.getFilename is not a function` crash.
  '*.{js,jsx,ts,tsx}': (files) => {
    const nonAppFiles = files.filter((f) => {
      return !f.includes('/packages/app/');
    });
    if (nonAppFiles.length === 0) return [];
    return [`eslint --quiet --fix ${nonAppFiles.join(' ')}`];
  },
};
