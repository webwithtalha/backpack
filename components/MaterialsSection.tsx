import { MATERIAL_OPTIONS, getMaterialById } from "@/lib/mockData";
import type { JobCostFormState } from "@/lib/types";
import { FieldError, SectionCard, inputClassName } from "./SectionCard";

interface MaterialsSectionProps {
  formState: JobCostFormState;
  errors: Record<string, string>;
  onQuantityChange: (materialId: string, quantity: number) => void;
  onQuantityBlur: (materialId: string) => void;
}

export function MaterialsSection({
  formState,
  errors,
  onQuantityChange,
  onQuantityBlur,
}: MaterialsSectionProps) {
  return (
    <SectionCard title="Materials" id="materials">
      <ul className="space-y-4">
        {MATERIAL_OPTIONS.map((material) => {
          const entry = formState.materials.find(
            (m) => m.materialId === material.id,
          );
          if (!entry) {
            return null;
          }

          const fieldKey = `material-${material.id}`;
          const inputId = `material-qty-${material.id}`;
          const unitCost = getMaterialById(material.id)?.unitCost ?? 0;

          return (
            <li
              key={material.id}
              className="flex flex-col gap-2 sm:flex-row sm:items-end sm:gap-4"
            >
              <div className="min-h-11 flex-1">
                <label
                  htmlFor={inputId}
                  className="block text-base font-medium text-slate-900"
                >
                  {material.label}
                </label>
                <p className="text-sm text-slate-500">
                  £{unitCost.toFixed(2)} per unit
                </p>
              </div>
              <div className="w-full sm:w-32">
                <label htmlFor={inputId} className="sr-only">
                  Quantity for {material.label}
                </label>
                <input
                  id={inputId}
                  type="number"
                  min={0}
                  step={1}
                  className={inputClassName}
                  value={entry.quantity}
                  onChange={(e) =>
                    onQuantityChange(
                      material.id,
                      Math.max(0, Number(e.target.value) || 0),
                    )
                  }
                  onBlur={() => onQuantityBlur(material.id)}
                  aria-invalid={Boolean(errors[fieldKey])}
                  aria-label={`Quantity for ${material.label}`}
                />
                <FieldError message={errors[fieldKey]} />
              </div>
            </li>
          );
        })}
      </ul>
    </SectionCard>
  );
}
