import { formatGBP } from "@/lib/costCalculator";
import type { JobCostResult } from "@/lib/types";
import { SectionCard } from "./SectionCard";

interface CostSummaryCardProps {
  cost: JobCostResult;
}

export function CostSummaryCard({ cost }: CostSummaryCardProps) {
  const lines = [
    { label: "Labour", amount: cost.labourCost },
    { label: "Vehicle", amount: cost.vehicleCost },
    { label: "Tools", amount: cost.toolsCost },
    { label: "Materials", amount: cost.materialsCost },
  ];

  return (
    <SectionCard title="Estimated Cost Summary" id="cost-summary">
      <dl className="space-y-3">
        {lines.map(({ label, amount }) => (
          <div key={label} className="flex justify-between text-base">
            <dt className="text-slate-600">{label}</dt>
            <dd className="font-medium text-slate-900">{formatGBP(amount)}</dd>
          </div>
        ))}
        <div className="border-t border-slate-200 pt-3">
          <div className="flex justify-between items-baseline">
            <dt className="text-base font-semibold text-slate-900">Total</dt>
            <dd className="text-2xl font-bold text-slate-900">
              {formatGBP(cost.totalCost)}
            </dd>
          </div>
        </div>
      </dl>
      {cost.siteHours !== null ? (
        <p className="mt-3 text-xs text-slate-500">
          Based on {cost.siteHours} site hours
        </p>
      ) : (
        <p className="mt-3 text-xs text-amber-700">
          Site hours invalid — labour uses £0 until times are corrected.
        </p>
      )}
    </SectionCard>
  );
}
