import { rulesMatrix, type AdviceType } from './rules-matrix'

type TravelParams = {
  numberOfPeople: number;
  numberOfDays: number;
  isEU: boolean;
}

export function getAdvice({ numberOfPeople, numberOfDays, isEU }: TravelParams): AdviceType {
  if (numberOfPeople < 1 || numberOfPeople > 4) {
    throw new Error('Number of people must be between 1 and 4');
  }

  if (numberOfDays < 1) {
    throw new Error('Duration must be at least 1 day');
  }

  const matrix = isEU ? rulesMatrix.EU : rulesMatrix.NON_EU;
  // normalise duration (all durations longer than 28 days are treated the same as 28 days)
  const duration = Math.min(numberOfDays - 1, 27);

  return matrix[numberOfPeople][duration];
}
