// jest-environment-jsdom does not expose Node's structuredClone to the global
// scope automatically. Chakra UI v3 requires it for slot recipe evaluation.
if (typeof global.structuredClone === 'undefined') {
  global.structuredClone = <T>(value: T): T =>
    JSON.parse(JSON.stringify(value)) as T;
}
