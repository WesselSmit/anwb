// NOTE: this logic has been separated into its file to illustrate that the matrixes could easily be managed elsewhere if needed (e.g. managed by editors in a CMS, types can be generated using a tool like Zod) or it can be it's own JS/TS/JSON file in the codebase (like it is now).

import messages from '../data/messages.json';

const ADVICE = {
  TEMPORARY_COVERAGE: messages.temporary_coverage,
  MODIFY_CURRENT: messages.modify_current
} as const;

export type AdviceType = typeof ADVICE[keyof typeof ADVICE];

type RulesMatrix = {
  EU: RegionRules;
  NON_EU: RegionRules;
};

type RegionRules = {
  [key: number]: AdviceType[];
};

/**
 * matrix consist of the following dimensions:
 *
 * - in the root we have the available regions with their rules
 * - the rules are objects that consist of keys (number of people [1-4]) and values (duration in days [1-28])
 */
export const rulesMatrix: RulesMatrix = {
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
