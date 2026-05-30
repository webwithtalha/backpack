import { VEHICLE_OPTIONS } from "@/lib/mockData";
import type { JobCostFormState } from "@/lib/types";
import { FieldError, FormLabel, SectionCard, inputClassName } from "./SectionCard";

interface VehicleSectionProps {
  formState: JobCostFormState;
  errors: Record<string, string>;
  onVehicleChange: (vehicleId: string) => void;
  onVehicleHoursChange: (hours: number) => void;
  onVehicleHoursBlur: () => void;
}

export function VehicleSection({
  formState,
  errors,
  onVehicleChange,
  onVehicleHoursChange,
  onVehicleHoursBlur,
}: VehicleSectionProps) {
  const isNoVehicle = formState.vehicleId === "no-vehicle";

  return (
    <SectionCard title="Vehicle" id="vehicle">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <FormLabel htmlFor="vehicle">Vehicle Type</FormLabel>
          <select
            id="vehicle"
            name="vehicle"
            className={inputClassName}
            value={formState.vehicleId}
            onChange={(e) => onVehicleChange(e.target.value)}
          >
            {VEHICLE_OPTIONS.map((vehicle) => (
              <option key={vehicle.id} value={vehicle.id}>
                {vehicle.label}
                {vehicle.hourlyRate > 0
                  ? ` — £${vehicle.hourlyRate}/hr`
                  : ""}
              </option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <FormLabel htmlFor="vehicleHours">Vehicle Hours</FormLabel>
          <input
            id="vehicleHours"
            name="vehicleHours"
            type="number"
            min={0}
            step={0.5}
            className={inputClassName}
            value={formState.vehicleHours}
            onChange={(e) =>
              onVehicleHoursChange(Math.max(0, Number(e.target.value) || 0))
            }
            onBlur={onVehicleHoursBlur}
            disabled={isNoVehicle}
            aria-invalid={Boolean(errors.vehicleHours)}
            aria-describedby={
              isNoVehicle ? "vehicle-hours-hint" : undefined
            }
          />
          {isNoVehicle ? (
            <p
              id="vehicle-hours-hint"
              className="mt-1 text-sm text-slate-500"
            >
              No vehicle selected — vehicle hours are not charged.
            </p>
          ) : null}
          <FieldError message={errors.vehicleHours} />
        </div>
      </div>
    </SectionCard>
  );
}
