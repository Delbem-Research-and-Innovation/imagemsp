import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // eslint-plugin-react@7 calls context.getFilename() to auto-detect the React
  // version, but that API was removed in ESLint v10 flat config. Pinning the
  // version explicitly skips the auto-detection and avoids the TypeError.
  {
    settings: {
      react: {
        version: "19",
      },
    },
  },
  // CommonJS config files (e.g. babel.config.cjs) must use require(); turning
  // off no-require-imports for .cjs files avoids false-positive lint errors.
  {
    files: ["**/*.cjs"],
    rules: {
      "@typescript-eslint/no-require-imports": "off",
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
