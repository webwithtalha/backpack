import type { JobCostFormState } from "@/lib/types";
import {
  VALIDATION_MESSAGES,
  calculateSiteHours,
} from "@/lib/costCalculator";
import { FieldError, FormLabel, SectionCard, inputClassName } from "./SectionCard";

interface TimeOnSiteSectionProps {
  formState: JobCostFormState;
  errors: Record<string, string>;
  onArrivalChange: (value: string) => void;
  onDepartureChange: (value: string) => void;
  onOperativesChange: (value: number) => void;
  onArrivalBlur: () => void;
  onDepartureBlur: () => void;
  onOperativesBlur: () => void;
}

export function TimeOnSiteSection({
  formState,
  errors,
  onArrivalChange,
  onDepartureChange,
  onOperativesChange,
  onArrivalBlur,
  onDepartureBlur,
  onOperativesBlur,
}: TimeOnSiteSectionProps) {
  const siteHours = calculateSiteHours(formState.arrival, formState.departure);
  const liveTimeRangeError =
    formState.arrival.trim() &&
    formState.departure.trim() &&
    siteHours === null
      ? VALIDATION_MESSAGES.departureAfterArrival
      : undefined;
  const departureError = errors.departure ?? liveTimeRangeError;

  const liveOperativesError =
    formState.operatives < 1
      ? VALIDATION_MESSAGES.operativesMinimum
      : undefined;
  const operativesError = errors.operatives ?? liveOperativesError;

  return (
    <SectionCard title="Time on Site" id="time-on-site">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <FormLabel htmlFor="arrival" required>
            Arrival Time
          </FormLabel>
          <input
            id="arrival"
            name="arrival"
            type="time"
            className={inputClassName}
            value={formState.arrival}
            onChange={(e) => onArrivalChange(e.target.value)}
            onBlur={onArrivalBlur}
            aria-invalid={Boolean(errors.arrival)}
            aria-describedby={errors.arrival ? "arrival-error" : undefined}
            required
          />
          <FieldError message={errors.arrival} />
        </div>
        <div>
          <FormLabel htmlFor="departure" required>
            Departure Time
          </FormLabel>
          <input
            id="departure"
            name="departure"
            type="time"
            className={inputClassName}
            value={formState.departure}
            onChange={(e) => onDepartureChange(e.target.value)}
            onBlur={onDepartureBlur}
            aria-invalid={Boolean(departureError)}
            aria-describedby={departureError ? "departure-error" : undefined}
            required
          />
          <FieldError id="departure-error" message={departureError} />
        </div>
        <div className="sm:col-span-2">
          <FormLabel htmlFor="operatives" required>
            Number of Operatives
          </FormLabel>
          <input
            id="operatives"
            name="operatives"
            type="number"
            min={1}
            step={1}
            className={inputClassName}
            value={formState.operatives}
            onChange={(e) =>
              onOperativesChange(Math.max(0, Number(e.target.value) || 0))
            }
            onBlur={onOperativesBlur}
            aria-invalid={Boolean(operativesError)}
            aria-describedby={
              operativesError ? "operatives-error" : undefined
            }
            required
          />
          <FieldError id="operatives-error" message={operativesError} />
        </div>
      </div>
      <p className="mt-4 text-sm text-slate-600">
        Site hours:{" "}
        <span className="font-semibold text-slate-900">
          {siteHours !== null ? `${siteHours} h` : "—"}
        </span>
      </p>
    </SectionCard>
  );
}
