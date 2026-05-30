import { MOCK_JOB_SUMMARY } from "@/lib/mockData";
import { SectionCard } from "./SectionCard";

const FIELDS: { key: keyof typeof MOCK_JOB_SUMMARY; label: string }[] = [
  { key: "jobReference", label: "Job Reference" },
  { key: "assetId", label: "Asset ID" },
  { key: "assetType", label: "Asset Type" },
  { key: "location", label: "Location" },
  { key: "faultType", label: "Fault Type" },
  { key: "priority", label: "Priority" },
  { key: "assignedOperative", label: "Assigned Operative" },
  { key: "jobStatus", label: "Job Status" },
];

export function JobSummaryCard() {
  return (
    <SectionCard title="Job Summary" id="job-summary">
      <dl className="grid gap-3 sm:grid-cols-2">
        {FIELDS.map(({ key, label }) => (
          <div key={key}>
            <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">
              {label}
            </dt>
            <dd className="mt-0.5 text-base text-slate-900">
              {MOCK_JOB_SUMMARY[key]}
            </dd>
          </div>
        ))}
      </dl>
    </SectionCard>
  );
}
