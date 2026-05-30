export type JobStatusBadge = "Draft" | "Ready for QS Review";

export type ValidationRuleId =
  | "VAL-001"
  | "VAL-002"
  | "VAL-003"
  | "VAL-004"
  | "VAL-005"
  | "VAL-006"
  | "VAL-007"
  | "VAL-008";

export interface JobSummary {
  jobReference: string;
  assetId: string;
  assetType: string;
  location: string;
  faultType: string;
  priority: string;
  assignedOperative: string;
  jobStatus: string;
}

export interface VehicleOption {
  id: string;
  label: string;
  hourlyRate: number;
}

export interface ToolOption {
  id: string;
  label: string;
  hourlyRate: number;
}

export interface MaterialOption {
  id: string;
  label: string;
  unitCost: number;
}

export interface ToolSelection {
  toolId: string;
  selected: boolean;
  hours: number;
}

export interface MaterialQuantity {
  materialId: string;
  quantity: number;
}

export interface JobCostFormState {
  arrival: string;
  departure: string;
  operatives: number;
  vehicleId: string;
  vehicleHours: number;
  tools: ToolSelection[];
  materials: MaterialQuantity[];
  notes: string;
  status: JobStatusBadge;
  evidenceFileName: string | null;
}

export interface JobCostToolInput {
  selected: boolean;
  hours: number;
  hourlyRate: number;
}

export interface JobCostMaterialInput {
  quantity: number;
  unitCost: number;
}

export interface JobCostInput {
  arrival: string;
  departure: string;
  operatives: number;
  operativeHourlyRate: number;
  vehicleHourlyRate: number;
  vehicleHours: number;
  tools: JobCostToolInput[];
  materials: JobCostMaterialInput[];
}

export interface ValidationError {
  field: string;
  message: string;
  ruleId: ValidationRuleId;
}

export interface JobCostResult {
  siteHours: number | null;
  labourCost: number;
  vehicleCost: number;
  toolsCost: number;
  materialsCost: number;
  totalCost: number;
  isValid: boolean;
  errors: ValidationError[];
}
