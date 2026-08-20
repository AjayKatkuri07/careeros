import { useMemo } from "react";
import { calculateCareerScore } from "../utils/careerScore.js";

export function useCareerScore() {
  return useMemo(() => calculateCareerScore(), []);
}