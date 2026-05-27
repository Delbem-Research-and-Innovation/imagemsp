// jest-environment-jsdom does not expose Node's structuredClone to the global
// scope automatically. Chakra UI v3 requires it for slot recipe evaluation.
if (typeof global.structuredClone === 'undefined') {
  // Usa a função nativa do Node se disponível
  const nativeStructuredClone = globalThis.structuredClone as typeof structuredClone | undefined;
  global.structuredClone = <T>(value: T): T =>
    typeof nativeStructuredClone === 'function' && nativeStructuredClone !== global.structuredClone
      ? nativeStructuredClone(value)
      : value;
}
