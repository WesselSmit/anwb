import { describe, expect, test, vi } from 'vitest';
import { getAdvice } from './advisor';

vi.mock('./rules-matrix', () => {
  const ADVICE = {
    TEMPORARY_COVERAGE: 'mocked temporary coverage',
    MODIFY_CURRENT: 'mocked modify current',
  };

  return {
    ADVICE,
    rulesMatrix: {
      EU: {
        1: Array(28).fill(ADVICE.TEMPORARY_COVERAGE).fill(ADVICE.MODIFY_CURRENT, 27),
        2: Array(28).fill(ADVICE.TEMPORARY_COVERAGE).fill(ADVICE.MODIFY_CURRENT, 13),
        3: Array(28).fill(ADVICE.TEMPORARY_COVERAGE).fill(ADVICE.MODIFY_CURRENT, 9),
        4: Array(28).fill(ADVICE.TEMPORARY_COVERAGE).fill(ADVICE.MODIFY_CURRENT, 6)
      },
      NON_EU: {
        1: Array(28).fill(ADVICE.TEMPORARY_COVERAGE).fill(ADVICE.MODIFY_CURRENT, 13),
        2: Array(28).fill(ADVICE.TEMPORARY_COVERAGE).fill(ADVICE.MODIFY_CURRENT, 6),
        3: Array(28).fill(ADVICE.TEMPORARY_COVERAGE).fill(ADVICE.MODIFY_CURRENT, 4),
        4: Array(28).fill(ADVICE.TEMPORARY_COVERAGE).fill(ADVICE.MODIFY_CURRENT, 3)
      },
    },
  };
});

describe('getAdvice', () => {
  describe('for the "EU Region"', () => {
    test('should return correct values for 1 person', () => {
      expect(getAdvice({ isEU: true, numberOfPeople: 1, durationInDays: 1 })).toBe('mocked temporary coverage');
      expect(getAdvice({ isEU: true, numberOfPeople: 1, durationInDays: 10 })).toBe('mocked temporary coverage');
      expect(getAdvice({ isEU: true, numberOfPeople: 1, durationInDays: 28 })).toBe('mocked modify current');
    });

    test('should return correct values for 2 people', () => {
      expect(getAdvice({ isEU: true, numberOfPeople: 2, durationInDays: 1 })).toBe('mocked temporary coverage');
      expect(getAdvice({ isEU: true, numberOfPeople: 2, durationInDays: 10 })).toBe('mocked temporary coverage');
      expect(getAdvice({ isEU: true, numberOfPeople: 2, durationInDays: 28 })).toBe('mocked modify current');
    });

    test('should return correct values for 3 people', () => {
      expect(getAdvice({ isEU: true, numberOfPeople: 3, durationInDays: 1 })).toBe('mocked temporary coverage');
      expect(getAdvice({ isEU: true, numberOfPeople: 3, durationInDays: 10 })).toBe('mocked modify current');
      expect(getAdvice({ isEU: true, numberOfPeople: 3, durationInDays: 28 })).toBe('mocked modify current');
    });

    test('should return correct values for 4 people', () => {
      expect(getAdvice({ isEU: true, numberOfPeople: 4, durationInDays: 1 })).toBe('mocked temporary coverage');
      expect(getAdvice({ isEU: true, numberOfPeople: 4, durationInDays: 10 })).toBe('mocked modify current');
      expect(getAdvice({ isEU: true, numberOfPeople: 4, durationInDays: 28 })).toBe('mocked modify current');
    });
  });

  describe('for the "NON_EU Region"', () => {
    test('should return correct values for 1 person', () => {
      expect(getAdvice({ isEU: false, numberOfPeople: 1, durationInDays: 1 })).toBe('mocked temporary coverage');
      expect(getAdvice({ isEU: false, numberOfPeople: 1, durationInDays: 10 })).toBe('mocked temporary coverage');
      expect(getAdvice({ isEU: false, numberOfPeople: 1, durationInDays: 28 })).toBe('mocked modify current');
    });

    test('should return correct values for 2 people', () => {
      expect(getAdvice({ isEU: false, numberOfPeople: 2, durationInDays: 1 })).toBe('mocked temporary coverage');
      expect(getAdvice({ isEU: false, numberOfPeople: 2, durationInDays: 10 })).toBe('mocked modify current');
      expect(getAdvice({ isEU: false, numberOfPeople: 2, durationInDays: 28 })).toBe('mocked modify current');
    });

    test('should return correct values for 3 people', () => {
      expect(getAdvice({ isEU: false, numberOfPeople: 3, durationInDays: 1 })).toBe('mocked temporary coverage');
      expect(getAdvice({ isEU: false, numberOfPeople: 3, durationInDays: 10 })).toBe('mocked modify current');
      expect(getAdvice({ isEU: false, numberOfPeople: 3, durationInDays: 28 })).toBe('mocked modify current');
    });

    test('should return correct values for 4 people', () => {
      expect(getAdvice({ isEU: false, numberOfPeople: 4, durationInDays: 1 })).toBe('mocked temporary coverage');
      expect(getAdvice({ isEU: false, numberOfPeople: 4, durationInDays: 10 })).toBe('mocked modify current');
      expect(getAdvice({ isEU: false, numberOfPeople: 4, durationInDays: 28 })).toBe('mocked modify current');
    });
  });

  describe('with invalid input', () => {
    test('should throw an error for invalid number of people', () => {
      expect(() => getAdvice({ isEU: true, numberOfPeople: 0, durationInDays: 1 })).toThrow('Number of people must be between 1 and 4');

      expect(() => getAdvice({ isEU: false, numberOfPeople: 5, durationInDays: 1 })).toThrow('Number of people must be between 1 and 4');
    });

    test('should throw an error for invalid number of days', () => {
      expect(() => getAdvice({ isEU: true, numberOfPeople: 1, durationInDays: 0 })).toThrow('Duration must be at least 1 day');

      expect(() => getAdvice({ isEU: false, numberOfPeople: 1, durationInDays: -1 })).toThrow('Duration must be at least 1 day');
    });
  });

  test('should give the same result for durations of exactly 28 days and durations longer than 28 days', () => {
    const result = getAdvice({ isEU: true, numberOfPeople: 2, durationInDays: 28 });

    expect(getAdvice({ isEU: true, numberOfPeople: 2, durationInDays: 29 })).toBe(result);
    expect(getAdvice({ isEU: true, numberOfPeople: 2, durationInDays: 30 })).toBe(result);
    expect(getAdvice({ isEU: true, numberOfPeople: 2, durationInDays: 100 })).toBe(result);
    expect(getAdvice({ isEU: true, numberOfPeople: 2, durationInDays: 500 })).toBe(result);
  });
});

