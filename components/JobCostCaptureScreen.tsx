"use client";

import { useCallback, useMemo, useState } from "react";
import {
  buildJobCostInputFromFormState,
  getDefaultFormState,
  getVehicleById,
} from "@/lib/mockData";
import {
  calculateJobCost,
  calculateSiteHours,
  validateJobCostForm,
} from "@/lib/costCalculator";
import type { JobCostFormState, JobStatusBadge, ValidationError } from "@/lib/types";
import { ActionButtons } from "./ActionButtons";
import { CostSummaryCard } from "./CostSummaryCard";
import { EvidenceSection } from "./EvidenceSection";
import { JobSummaryCard } from "./JobSummaryCard";
import { MaterialsSection } from "./MaterialsSection";
import { NotesSection } from "./NotesSection";
import { TimeOnSiteSection } from "./TimeOnSiteSection";
import { ToolsSection } from "./ToolsSection";
import { VehicleSection } from "./VehicleSection";

function errorsToRecord(errors: ValidationError[]): Record<string, string> {
  return errors.reduce<Record<string, string>>((acc, err) => {
    if (!acc[err.field]) {
      acc[err.field] = err.message;
    }
    return acc;
  }, {});
}

export function JobCostCaptureScreen() {
  const [formState, setFormState] = useState<JobCostFormState>(
    getDefaultFormState,
  );
  const [showAllErrors, setShowAllErrors] = useState(false);
  const [touchedFields, setTouchedFields] = useState<Set<string>>(
    () => new Set(),
  );
  const [banner, setBanner] = useState<{
    message: string;
    variant: "info" | "success" | "error";
  } | null>(null);

  const cost = useMemo(() => {
    const input = buildJobCostInputFromFormState(formState);
    return calculateJobCost(input);
  }, [formState]);

  const allValidationErrors = useMemo(
    () => validateJobCostForm(formState),
    [formState],
  );

  const visibleErrors = useMemo(() => {
    if (showAllErrors) {
      return errorsToRecord(allValidationErrors);
    }

    const filtered = allValidationErrors.filter((err) =>
      touchedFields.has(err.field),
    );
    return errorsToRecord(filtered);
  }, [allValidationErrors, showAllErrors, touchedFields]);

  const markTouched = useCallback((field: string) => {
    setTouchedFields((prev) => new Set(prev).add(field));
  }, []);

  const syncVehicleHoursOnTimeChange = useCallback(
    (
      prev: JobCostFormState,
      arrival: string,
      departure: string,
    ): number => {
      const oldSiteHours = calculateSiteHours(prev.arrival, prev.departure);
      const newSiteHours = calculateSiteHours(arrival, departure);

      if (
        oldSiteHours !== null &&
        prev.vehicleHours === oldSiteHours &&
        newSiteHours !== null
      ) {
        return newSiteHours;
      }

      return prev.vehicleHours;
    },
    [],
  );

  const handleArrivalChange = (arrival: string) => {
    setFormState((prev) => ({
      ...prev,
      arrival,
      vehicleHours: syncVehicleHoursOnTimeChange(prev, arrival, prev.departure),
    }));
    setBanner(null);
  };

  const handleDepartureChange = (departure: string) => {
    setFormState((prev) => ({
      ...prev,
      departure,
      vehicleHours: syncVehicleHoursOnTimeChange(
        prev,
        prev.arrival,
        departure,
      ),
    }));
    setBanner(null);
  };

  const handleVehicleChange = (vehicleId: string) => {
    const vehicle = getVehicleById(vehicleId);
    setFormState((prev) => ({
      ...prev,
      vehicleId,
      vehicleHours:
        vehicleId === "no-vehicle"
          ? 0
          : prev.vehicleHours ||
            calculateSiteHours(prev.arrival, prev.departure) ||
            prev.vehicleHours,
    }));
    setBanner(null);
  };

  const handleSaveDraft = () => {
    setBanner({
      message: "Draft saved locally for prototype.",
      variant: "info",
    });
    setFormState((prev) => ({ ...prev, status: "Draft" }));
    setShowAllErrors(false);
  };

  const handleSubmit = () => {
    const errors = validateJobCostForm(formState);
    setShowAllErrors(true);
    if (errors.length > 0) {
      setBanner({
        message: "Please fix the errors below before submitting.",
        variant: "error",
      });
      return;
    }

    setFormState((prev) => ({ ...prev, status: "Ready for QS Review" }));
    setBanner({
      message: "Job cost submitted successfully. Ready for QS review.",
      variant: "success",
    });
    setShowAllErrors(false);
  };

  const handleReset = () => {
    setFormState(getDefaultFormState());
    setShowAllErrors(false);
    setTouchedFields(new Set());
    setBanner(null);
  };

  const statusBadgeClass = (status: JobStatusBadge) =>
    status === "Ready for QS Review"
      ? "bg-green-100 text-green-800"
      : "bg-slate-100 text-slate-700";

  return (
    <div className="min-h-full bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
                Backpack
              </p>
              <h1 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">
                Job Cost Capture
              </h1>
              <p className="mt-1 text-base text-slate-600">
                Record time, resources, and costs for field completion
              </p>
            </div>
            <span
              className={`inline-flex self-start rounded-full px-3 py-1 text-sm font-medium ${statusBadgeClass(formState.status)}`}
            >
              {formState.status}
            </span>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
        {banner ? (
          <div
            role="status"
            className={`mb-6 rounded-lg border px-4 py-3 text-sm ${
              banner.variant === "success"
                ? "border-green-200 bg-green-50 text-green-800"
                : banner.variant === "error"
                  ? "border-red-200 bg-red-50 text-red-800"
                  : "border-blue-200 bg-blue-50 text-blue-800"
            }`}
          >
            {banner.message}
          </div>
        ) : null}

        <div className="grid gap-6 lg:grid-cols-[1fr_380px] lg:items-start">
          <div className="flex flex-col gap-6">
            <JobSummaryCard />
            <TimeOnSiteSection
              formState={formState}
              errors={visibleErrors}
              onArrivalChange={handleArrivalChange}
              onDepartureChange={handleDepartureChange}
              onOperativesChange={(operatives) => {
                setFormState((prev) => ({ ...prev, operatives }));
                setBanner(null);
              }}
              onArrivalBlur={() => markTouched("arrival")}
              onDepartureBlur={() => markTouched("departure")}
              onOperativesBlur={() => markTouched("operatives")}
            />
            <VehicleSection
              formState={formState}
              errors={visibleErrors}
              onVehicleChange={handleVehicleChange}
              onVehicleHoursChange={(vehicleHours) => {
                setFormState((prev) => ({ ...prev, vehicleHours }));
                setBanner(null);
              }}
              onVehicleHoursBlur={() => markTouched("vehicleHours")}
            />
            <ToolsSection
              formState={formState}
              errors={visibleErrors}
              onToolChange={(toolId, update) => {
                setFormState((prev) => ({
                  ...prev,
                  tools: prev.tools.map((t) =>
                    t.toolId === toolId ? { ...t, ...update } : t,
                  ),
                }));
                setBanner(null);
              }}
              onToolHoursBlur={(toolId) => markTouched(`tool-${toolId}`)}
            />
            <MaterialsSection
              formState={formState}
              errors={visibleErrors}
              onQuantityChange={(materialId, quantity) => {
                setFormState((prev) => ({
                  ...prev,
                  materials: prev.materials.map((m) =>
                    m.materialId === materialId ? { ...m, quantity } : m,
                  ),
                }));
                setBanner(null);
              }}
              onQuantityBlur={(materialId) =>
                markTouched(`material-${materialId}`)
              }
            />
            <NotesSection
              formState={formState}
              errors={visibleErrors}
              onNotesChange={(notes) => {
                setFormState((prev) => ({ ...prev, notes }));
                setBanner(null);
              }}
              onNotesBlur={() => markTouched("notes")}
            />
            <EvidenceSection fileName={formState.evidenceFileName} />

            <div className="lg:hidden">
              <CostSummaryCard cost={cost} />
              <div className="mt-4">
                <ActionButtons
                  onSaveDraft={handleSaveDraft}
                  onSubmit={handleSubmit}
                  onReset={handleReset}
                />
              </div>
            </div>
          </div>

          <aside className="hidden lg:sticky lg:top-6 lg:flex lg:flex-col lg:gap-4">
            <CostSummaryCard cost={cost} />
            <ActionButtons
              onSaveDraft={handleSaveDraft}
              onSubmit={handleSubmit}
              onReset={handleReset}
            />
          </aside>
        </div>
      </main>
    </div>
  );
}
