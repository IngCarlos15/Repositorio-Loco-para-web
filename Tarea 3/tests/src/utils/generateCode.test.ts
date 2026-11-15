import { describe, it, expect } from 'vitest';
import { generateSixDigitCode } from '../../../src/utils/generateCode.util.ts';

describe('generateSixDigitCode', () => {
  it('genera un código de exactamente seis dígitos', () => {
    const code = generateSixDigitCode();
    expect(code).toMatch(/^\d{6}$/);
  });

  it('genera códigos entre 100000 y 999999', () => {
    for (let i = 0; i < 100; i++) {
      const n = Number(generateSixDigitCode());
      expect(n).toBeGreaterThanOrEqual(100000);
      expect(n).toBeLessThanOrEqual(999999);
    }
  });

  it('genera códigos distintos en llamadas sucesivas', () => {
    const codes = new Set(Array.from({ length: 20 }, () => generateSixDigitCode()));
    expect(codes.size).toBeGreaterThan(1);
  });
});
