// jest-environment-jsdom does not expose Node's structuredClone to the global
// scope automatically. Chakra UI v3 requires it for slot recipe evaluation.
if (typeof global.structuredClone === 'undefined') {
  // Usa a função nativa do Node se disponível
  // @ts-ignore
  global.structuredClone = (...args: any[]) => (globalThis.structuredClone ? globalThis.structuredClone(...args) : args[0]);
}
