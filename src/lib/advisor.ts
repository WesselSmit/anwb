// NOTE: in a real app you would use i18n/translations for this
export const ADVICE = {
  TEMPORARY_COVERAGE: 'tijdelijke dekking afsluiten',
  MODIFY_CURRENT: 'dekking op huidige verzekering wijzigen'
} as const;

type AdviceType = typeof ADVICE[keyof typeof ADVICE];

type RulesMatrix = {
  EU: RegionRules;
  NON_EU: RegionRules;
};

type RegionRules = {
  [key: number]: AdviceType[];
};

type TravelParams = {
  numberOfPeople: number;
  durationInDays: number;
  isEU: boolean;
}

/**
 * matrix consist of the following dimensions:
 *
 * - in the root we have the available regions with their rules
 * - the rules are objects that consist of keys (number of people [1-4]) and values (duration in days [1-28])
 */
const rulesMatrix: RulesMatrix = {
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
  }
};

export function getAdvice({ numberOfPeople, durationInDays, isEU }: TravelParams): AdviceType {
  if (numberOfPeople < 1 || numberOfPeople > 4) {
    // NOTE: in a real app you would use i18n/translations for this
    throw new Error('Number of people must be between 1 and 4');
  }

  if (durationInDays < 1) {
    // NOTE: in a real app you would use i18n/translations for this
    throw new Error('Duration must be at least 1 day');
  }

  const matrix = isEU ? rulesMatrix.EU : rulesMatrix.NON_EU;
  // normalise duration (all durations longer than 28 days are treated the same as 28 days)
  const duration = Math.min(durationInDays - 1, 27);

  return matrix[numberOfPeople][duration];
}
