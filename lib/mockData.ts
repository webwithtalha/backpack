import type {
  JobCostFormState,
  JobCostInput,
  JobSummary,
  MaterialOption,
  ToolOption,
  VehicleOption,
} from "./types";

export const OPERATIVE_HOURLY_RATE = 28;

export const MOCK_JOB_SUMMARY: JobSummary = {
  jobReference: "SUF-10291",
  assetId: "SL-8821",
  assetType: "Streetlight Column",
  location: "Ipswich Road, Suffolk",
  faultType: "Lamp not working",
  priority: "Medium",
  assignedOperative: "Talha Zulfiqar",
  jobStatus: "In Progress",
};

export const VEHICLE_OPTIONS: VehicleOption[] = [
  { id: "no-vehicle", label: "No Vehicle", hourlyRate: 0 },
  { id: "small-van", label: "Small Van", hourlyRate: 10 },
  { id: "transit-van", label: "Transit Van", hourlyRate: 12 },
  { id: "mewp-vehicle", label: "MEWP Vehicle", hourlyRate: 30 },
];

export const TOOL_OPTIONS: ToolOption[] = [
  { id: "cherry-picker", label: "Cherry Picker", hourlyRate: 45 },
  {
    id: "electrical-testing-kit",
    label: "Electrical Testing Kit",
    hourlyRate: 5,
  },
  { id: "cable-locator", label: "Cable Locator", hourlyRate: 15 },
  { id: "hand-tools", label: "Hand Tools", hourlyRate: 3 },
  {
    id: "traffic-management-kit",
    label: "Traffic Management Kit",
    hourlyRate: 20,
  },
];

export const MATERIAL_OPTIONS: MaterialOption[] = [
  { id: "led-lamp-unit", label: "LED Lamp Unit", unitCost: 35 },
  { id: "fuse", label: "Fuse", unitCost: 4 },
  { id: "cable-connector", label: "Cable Connector", unitCost: 8 },
  { id: "photocell-sensor", label: "Photocell Sensor", unitCost: 18 },
  { id: "bracket", label: "Bracket", unitCost: 12 },
];

const DEFAULT_NOTES =
  "Lamp unit replaced, wiring checked, and asset tested successfully.";

export function getVehicleById(vehicleId: string): VehicleOption | undefined {
  return VEHICLE_OPTIONS.find((vehicle) => vehicle.id === vehicleId);
}

export function getToolById(toolId: string): ToolOption | undefined {
  return TOOL_OPTIONS.find((tool) => tool.id === toolId);
}

export function getMaterialById(materialId: string): MaterialOption | undefined {
  return MATERIAL_OPTIONS.find((material) => material.id === materialId);
}

export function buildJobCostInputFromFormState(
  state: JobCostFormState,
  operativeHourlyRate: number = OPERATIVE_HOURLY_RATE,
): JobCostInput {
  const vehicle = getVehicleById(state.vehicleId);

  return {
    arrival: state.arrival,
    departure: state.departure,
    operatives: state.operatives,
    operativeHourlyRate,
    vehicleHourlyRate: vehicle?.hourlyRate ?? 0,
    vehicleHours: state.vehicleHours,
    tools: state.tools.map((toolSelection) => {
      const tool = getToolById(toolSelection.toolId);
      return {
        selected: toolSelection.selected,
        hours: toolSelection.hours,
        hourlyRate: tool?.hourlyRate ?? 0,
      };
    }),
    materials: state.materials.map((materialQuantity) => {
      const material = getMaterialById(materialQuantity.materialId);
      return {
        quantity: materialQuantity.quantity,
        unitCost: material?.unitCost ?? 0,
      };
    }),
  };
}

export function getDefaultFormState(): JobCostFormState {
  return {
    arrival: "09:00",
    departure: "12:30",
    operatives: 2,
    vehicleId: "transit-van",
    vehicleHours: 3.5,
    tools: TOOL_OPTIONS.map((tool) => ({
      toolId: tool.id,
      selected:
        tool.id === "cherry-picker" ||
        tool.id === "electrical-testing-kit" ||
        tool.id === "hand-tools",
      hours:
        tool.id === "cherry-picker"
          ? 2
          : tool.id === "electrical-testing-kit"
            ? 1
            : tool.id === "hand-tools"
              ? 3.5
              : 0,
    })),
    materials: MATERIAL_OPTIONS.map((material) => ({
      materialId: material.id,
      quantity:
        material.id === "led-lamp-unit" ? 1 : material.id === "fuse" ? 2 : 0,
    })),
    notes: DEFAULT_NOTES,
    status: "Draft",
    evidenceFileName: "completion-photo.jpg",
  };
}
