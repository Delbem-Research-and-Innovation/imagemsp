// jest-environment-jsdom does not expose Node's structuredClone to the global
// scope automatically. Chakra UI v3 requires it for slot recipe evaluation.
if (typeof global.structuredClone === 'undefined') {
  // Usa a função nativa do Node se disponível
  // @ts-ignore
  const nativeStructuredClone = globalThis.structuredClone;
  global.structuredClone = (...args: any[]) =>
    typeof nativeStructuredClone === 'function' && nativeStructuredClone !== global.structuredClone
      ? nativeStructuredClone(...args)
      : args[0];
}
