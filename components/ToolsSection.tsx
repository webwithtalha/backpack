import { TOOL_OPTIONS, getToolById } from "@/lib/mockData";
import type { JobCostFormState, ToolSelection } from "@/lib/types";
import { FieldError, SectionCard, inputClassName } from "./SectionCard";

interface ToolsSectionProps {
  formState: JobCostFormState;
  errors: Record<string, string>;
  onToolChange: (toolId: string, update: Partial<ToolSelection>) => void;
  onToolHoursBlur: (toolId: string) => void;
}

export function ToolsSection({
  formState,
  errors,
  onToolChange,
  onToolHoursBlur,
}: ToolsSectionProps) {
  return (
    <SectionCard title="Plant / Tools" id="tools">
      <ul className="space-y-4">
        {TOOL_OPTIONS.map((tool) => {
          const selection = formState.tools.find((t) => t.toolId === tool.id);
          if (!selection) {
            return null;
          }

          const fieldKey = `tool-${tool.id}`;
          const hoursId = `tool-hours-${tool.id}`;
          const checkboxId = `tool-selected-${tool.id}`;

          return (
            <li
              key={tool.id}
              className="flex flex-col gap-2 rounded-lg border border-slate-100 bg-slate-50/50 p-3 sm:flex-row sm:items-center sm:gap-4"
            >
              <div className="flex min-h-11 flex-1 items-center gap-3">
                <input
                  id={checkboxId}
                  type="checkbox"
                  className="h-5 w-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  checked={selection.selected}
                  onChange={(e) =>
                    onToolChange(tool.id, { selected: e.target.checked })
                  }
                  aria-label={`Select ${tool.label}`}
                />
                <label
                  htmlFor={checkboxId}
                  className="flex-1 cursor-pointer text-base font-medium text-slate-900"
                >
                  {tool.label}
                  <span className="ml-2 text-sm font-normal text-slate-500">
                    £{getToolById(tool.id)?.hourlyRate ?? 0}/hr
                  </span>
                </label>
              </div>
              <div className="w-full sm:w-36">
                <label htmlFor={hoursId} className="sr-only">
                  Hours for {tool.label}
                </label>
                <input
                  id={hoursId}
                  type="number"
                  min={0}
                  step={0.5}
                  className={inputClassName}
                  value={selection.hours}
                  disabled={!selection.selected}
                  onChange={(e) =>
                    onToolChange(tool.id, {
                      hours: Math.max(0, Number(e.target.value) || 0),
                    })
                  }
                  onBlur={() => onToolHoursBlur(tool.id)}
                  aria-invalid={Boolean(errors[fieldKey])}
                  aria-label={`Hours for ${tool.label}`}
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
