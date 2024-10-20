import { describe, expect, test, vi } from 'vitest';
import { getAdvice } from './advisor';

vi.mock('./rules-matrix', async () => {
  return {
    rulesMatrix: {
      EU: {
        1: Array(28).fill('mocked temporary coverage').fill('mocked modify current', 27),
        2: Array(28).fill('mocked temporary coverage').fill('mocked modify current', 13),
        3: Array(28).fill('mocked temporary coverage').fill('mocked modify current', 9),
        4: Array(28).fill('mocked temporary coverage').fill('mocked modify current', 6)
      },
      NON_EU: {
        1: Array(28).fill('mocked temporary coverage').fill('mocked modify current', 13),
        2: Array(28).fill('mocked temporary coverage').fill('mocked modify current', 6),
        3: Array(28).fill('mocked temporary coverage').fill('mocked modify current', 4),
        4: Array(28).fill('mocked temporary coverage').fill('mocked modify current', 3)
      }
    }
  }
});

describe('getAdvice', () => {
  describe('for the "EU Region"', () => {
    test('should return correct values for 1 person', () => {
      expect(getAdvice({ isEU: true, numberOfPeople: 1, numberOfDays: 1 })).toBe('mocked temporary coverage');
      expect(getAdvice({ isEU: true, numberOfPeople: 1, numberOfDays: 10 })).toBe('mocked temporary coverage');
      expect(getAdvice({ isEU: true, numberOfPeople: 1, numberOfDays: 28 })).toBe('mocked modify current');
    });

    test('should return correct values for 2 people', () => {
      expect(getAdvice({ isEU: true, numberOfPeople: 2, numberOfDays: 1 })).toBe('mocked temporary coverage');
      expect(getAdvice({ isEU: true, numberOfPeople: 2, numberOfDays: 10 })).toBe('mocked temporary coverage');
      expect(getAdvice({ isEU: true, numberOfPeople: 2, numberOfDays: 28 })).toBe('mocked modify current');
    });

    test('should return correct values for 3 people', () => {
      expect(getAdvice({ isEU: true, numberOfPeople: 3, numberOfDays: 1 })).toBe('mocked temporary coverage');
      expect(getAdvice({ isEU: true, numberOfPeople: 3, numberOfDays: 10 })).toBe('mocked modify current');
      expect(getAdvice({ isEU: true, numberOfPeople: 3, numberOfDays: 28 })).toBe('mocked modify current');
    });

    test('should return correct values for 4 people', () => {
      expect(getAdvice({ isEU: true, numberOfPeople: 4, numberOfDays: 1 })).toBe('mocked temporary coverage');
      expect(getAdvice({ isEU: true, numberOfPeople: 4, numberOfDays: 10 })).toBe('mocked modify current');
      expect(getAdvice({ isEU: true, numberOfPeople: 4, numberOfDays: 28 })).toBe('mocked modify current');
    });
  });

  describe('for the "NON_EU Region"', () => {
    test('should return correct values for 1 person', () => {
      expect(getAdvice({ isEU: false, numberOfPeople: 1, numberOfDays: 1 })).toBe('mocked temporary coverage');
      expect(getAdvice({ isEU: false, numberOfPeople: 1, numberOfDays: 10 })).toBe('mocked temporary coverage');
      expect(getAdvice({ isEU: false, numberOfPeople: 1, numberOfDays: 28 })).toBe('mocked modify current');
    });

    test('should return correct values for 2 people', () => {
      expect(getAdvice({ isEU: false, numberOfPeople: 2, numberOfDays: 1 })).toBe('mocked temporary coverage');
      expect(getAdvice({ isEU: false, numberOfPeople: 2, numberOfDays: 10 })).toBe('mocked modify current');
      expect(getAdvice({ isEU: false, numberOfPeople: 2, numberOfDays: 28 })).toBe('mocked modify current');
    });

    test('should return correct values for 3 people', () => {
      expect(getAdvice({ isEU: false, numberOfPeople: 3, numberOfDays: 1 })).toBe('mocked temporary coverage');
      expect(getAdvice({ isEU: false, numberOfPeople: 3, numberOfDays: 10 })).toBe('mocked modify current');
      expect(getAdvice({ isEU: false, numberOfPeople: 3, numberOfDays: 28 })).toBe('mocked modify current');
    });

    test('should return correct values for 4 people', () => {
      expect(getAdvice({ isEU: false, numberOfPeople: 4, numberOfDays: 1 })).toBe('mocked temporary coverage');
      expect(getAdvice({ isEU: false, numberOfPeople: 4, numberOfDays: 10 })).toBe('mocked modify current');
      expect(getAdvice({ isEU: false, numberOfPeople: 4, numberOfDays: 28 })).toBe('mocked modify current');
    });
  });

  describe('with invalid input', () => {
    test('should throw an error for invalid number of people', () => {
      expect(() => getAdvice({ isEU: true, numberOfPeople: 0, numberOfDays: 1 })).toThrow('Number of people must be between 1 and 4');

      expect(() => getAdvice({ isEU: false, numberOfPeople: 5, numberOfDays: 1 })).toThrow('Number of people must be between 1 and 4');
    });

    test('should throw an error for invalid number of days', () => {
      expect(() => getAdvice({ isEU: true, numberOfPeople: 1, numberOfDays: 0 })).toThrow('Duration must be at least 1 day');

      expect(() => getAdvice({ isEU: false, numberOfPeople: 1, numberOfDays: -1 })).toThrow('Duration must be at least 1 day');
    });
  });

  test('should give the same result for durations of exactly 28 days and durations longer than 28 days', () => {
    const result = getAdvice({ isEU: true, numberOfPeople: 2, numberOfDays: 28 });

    expect(getAdvice({ isEU: true, numberOfPeople: 2, numberOfDays: 29 })).toBe(result);
    expect(getAdvice({ isEU: true, numberOfPeople: 2, numberOfDays: 30 })).toBe(result);
    expect(getAdvice({ isEU: true, numberOfPeople: 2, numberOfDays: 100 })).toBe(result);
    expect(getAdvice({ isEU: true, numberOfPeople: 2, numberOfDays: 500 })).toBe(result);
  });
});
