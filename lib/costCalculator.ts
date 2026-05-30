import type {
  JobCostFormState,
  JobCostInput,
  JobCostResult,
  ValidationError,
  ValidationRuleId,
} from "./types";

const TIME_PATTERN = /^([01]\d|2[0-3]):([0-5]\d)$/;

export const VALIDATION_MESSAGES = {
  departureAfterArrival: "Departure time must be after arrival time.",
  operativesMinimum: "At least one operative is required.",
} as const;

export function roundMoney(amount: number): number {
  return Math.round(amount * 100) / 100;
}

export function formatGBP(amount: number): string {
  return `£${roundMoney(amount).toFixed(2)}`;
}

export function parseTimeToMinutes(time: string): number | null {
  const trimmed = time.trim();
  if (!trimmed) {
    return null;
  }

  const match = TIME_PATTERN.exec(trimmed);
  if (!match) {
    return null;
  }

  const hours = Number(match[1]);
  const minutes = Number(match[2]);
  return hours * 60 + minutes;
}

export function calculateSiteHours(
  arrival: string,
  departure: string,
): number | null {
  const arrivalMinutes = parseTimeToMinutes(arrival);
  const departureMinutes = parseTimeToMinutes(departure);

  if (arrivalMinutes === null || departureMinutes === null) {
    return null;
  }

  if (departureMinutes <= arrivalMinutes) {
    return null;
  }

  return roundMoney((departureMinutes - arrivalMinutes) / 60);
}

function createValidationError(
  field: string,
  message: string,
  ruleId: ValidationRuleId,
): ValidationError {
  return { field, message, ruleId };
}

export function calculateJobCost(input: JobCostInput): JobCostResult {
  const arrivalMinutes = parseTimeToMinutes(input.arrival);
  const departureMinutes = parseTimeToMinutes(input.departure);
  const siteHours = calculateSiteHours(input.arrival, input.departure);
  const errors: ValidationError[] = [];

  if (
    arrivalMinutes !== null &&
    departureMinutes !== null &&
    departureMinutes <= arrivalMinutes
  ) {
    errors.push(
      createValidationError(
        "departure",
        VALIDATION_MESSAGES.departureAfterArrival,
        "VAL-003",
      ),
    );
  }

  const labourCost =
    siteHours === null
      ? 0
      : roundMoney(siteHours * input.operatives * input.operativeHourlyRate);

  const vehicleCost =
    input.vehicleHourlyRate === 0
      ? 0
      : roundMoney(input.vehicleHours * input.vehicleHourlyRate);

  const toolsCost = roundMoney(
    input.tools.reduce((total, tool) => {
      if (!tool.selected) {
        return total;
      }

      return total + tool.hours * tool.hourlyRate;
    }, 0),
  );

  const materialsCost = roundMoney(
    input.materials.reduce(
      (total, material) => total + material.quantity * material.unitCost,
      0,
    ),
  );

  const totalCost = roundMoney(
    labourCost + vehicleCost + toolsCost + materialsCost,
  );

  return {
    siteHours,
    labourCost,
    vehicleCost,
    toolsCost,
    materialsCost,
    totalCost,
    isValid: errors.length === 0,
    errors,
  };
}

export function validateJobCostForm(state: JobCostFormState): ValidationError[] {
  const errors: ValidationError[] = [];

  if (!state.arrival.trim()) {
    errors.push(
      createValidationError(
        "arrival",
        "Arrival time is required.",
        "VAL-001",
      ),
    );
  }

  if (!state.departure.trim()) {
    errors.push(
      createValidationError(
        "departure",
        "Departure time is required.",
        "VAL-002",
      ),
    );
  }

  if (
    state.arrival.trim() &&
    state.departure.trim() &&
    calculateSiteHours(state.arrival, state.departure) === null
  ) {
    errors.push(
      createValidationError(
        "departure",
        VALIDATION_MESSAGES.departureAfterArrival,
        "VAL-003",
      ),
    );
  }

  if (state.operatives < 1) {
    errors.push(
      createValidationError(
        "operatives",
        VALIDATION_MESSAGES.operativesMinimum,
        "VAL-004",
      ),
    );
  }

  if (state.vehicleHours < 0) {
    errors.push(
      createValidationError(
        "vehicleHours",
        "Vehicle hours cannot be negative.",
        "VAL-005",
      ),
    );
  }

  for (const tool of state.tools) {
    if (tool.hours < 0) {
      errors.push(
        createValidationError(
          `tool-${tool.toolId}`,
          "Tool hours cannot be negative.",
          "VAL-006",
        ),
      );
    }
  }

  for (const material of state.materials) {
    if (material.quantity < 0) {
      errors.push(
        createValidationError(
          `material-${material.materialId}`,
          "Material quantities cannot be negative.",
          "VAL-007",
        ),
      );
    }
  }

  if (state.notes.length > 500) {
    errors.push(
      createValidationError(
        "notes",
        "Notes must not exceed 500 characters.",
        "VAL-008",
      ),
    );
  }

  return errors;
}
