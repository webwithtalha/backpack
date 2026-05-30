import { describe, expect, it } from "vitest";
import {
  calculateJobCost,
  calculateSiteHours,
  validateJobCostForm,
} from "../lib/costCalculator";
import {
  buildJobCostInputFromFormState,
  getDefaultFormState,
} from "../lib/mockData";
import type { JobCostInput } from "../lib/types";

function buildDefaultInput(): JobCostInput {
  return buildJobCostInputFromFormState(getDefaultFormState());
}

describe("calculateSiteHours", () => {
  it("returns 3.5 hours for 09:00 to 12:30", () => {
    expect(calculateSiteHours("09:00", "12:30")).toBe(3.5);
  });
});

describe("calculateJobCost", () => {
  it("calculates labour cost as 196 for the default scenario", () => {
    const result = calculateJobCost(buildDefaultInput());
    expect(result.labourCost).toBe(196);
  });

  it("calculates vehicle cost as 42 for Transit Van at 3.5 hours", () => {
    const result = calculateJobCost(buildDefaultInput());
    expect(result.vehicleCost).toBe(42);
  });

  it("calculates tools cost as 105.5 for selected tools", () => {
    const result = calculateJobCost(buildDefaultInput());
    expect(result.toolsCost).toBe(105.5);
  });

  it("calculates materials cost as 43 for default quantities", () => {
    const result = calculateJobCost(buildDefaultInput());
    expect(result.materialsCost).toBe(43);
  });

  it("calculates total cost as 386.5 for the default scenario", () => {
    const result = calculateJobCost(buildDefaultInput());
    expect(result.totalCost).toBe(386.5);
  });

  it("returns zero materials cost when all quantities are zero", () => {
    const input = buildDefaultInput();
    input.materials = input.materials.map((material) => ({
      ...material,
      quantity: 0,
    }));

    const result = calculateJobCost(input);
    expect(result.materialsCost).toBe(0);
  });

  it("returns null site hours and zero labour for an invalid time range", () => {
    const input = buildDefaultInput();
    input.arrival = "12:30";
    input.departure = "09:00";

    const result = calculateJobCost(input);
    expect(result.siteHours).toBeNull();
    expect(result.labourCost).toBe(0);
    expect(result.isValid).toBe(false);
    expect(result.errors).toContainEqual(
      expect.objectContaining({ ruleId: "VAL-003" }),
    );
  });

  it("excludes unselected tools from tools cost", () => {
    const input = buildDefaultInput();
    input.tools = input.tools.map((tool) => ({
      ...tool,
      selected: false,
    }));

    const result = calculateJobCost(input);
    expect(result.toolsCost).toBe(0);
  });

  it("halves labour cost when using one operative instead of two", () => {
    const twoOperatives = calculateJobCost(buildDefaultInput());
    const oneOperative = calculateJobCost({
      ...buildDefaultInput(),
      operatives: 1,
    });

    expect(oneOperative.labourCost).toBe(twoOperatives.labourCost / 2);
    expect(oneOperative.labourCost).toBe(98);
  });
});

describe("validateJobCostForm", () => {
  it("flags VAL-003 when departure is not after arrival", () => {
    const state = getDefaultFormState();
    state.arrival = "12:30";
    state.departure = "09:00";

    const errors = validateJobCostForm(state);
    expect(errors).toContainEqual(
      expect.objectContaining({
        ruleId: "VAL-003",
        field: "departure",
        message: "Departure time must be after arrival time.",
      }),
    );
  });

  it("flags VAL-004 when operatives is less than 1", () => {
    const state = getDefaultFormState();
    state.operatives = 0;

    const errors = validateJobCostForm(state);
    expect(errors).toContainEqual(
      expect.objectContaining({
        ruleId: "VAL-004",
        field: "operatives",
        message: "At least one operative is required.",
      }),
    );
  });
});
