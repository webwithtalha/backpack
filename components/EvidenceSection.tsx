import { SectionCard } from "./SectionCard";

interface EvidenceSectionProps {
  fileName: string | null;
}

export function EvidenceSection({ fileName }: EvidenceSectionProps) {
  return (
    <SectionCard title="Evidence" id="evidence">
      <p className="mb-3 text-sm text-slate-600">
        Attach photos or documents as proof of completion (prototype placeholder).
      </p>
      <button
        type="button"
        className="min-h-11 rounded-lg border border-dashed border-slate-300 bg-slate-50 px-4 text-sm font-medium text-slate-700 transition-colors hover:border-blue-400 hover:bg-blue-50 hover:text-blue-700"
        onClick={() => {
          /* prototype: no real upload */
        }}
        aria-label="Add evidence file (prototype placeholder)"
      >
        + Add evidence
      </button>
      {fileName ? (
        <div
          className="mt-3 inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-800"
          role="status"
        >
          <span aria-hidden="true">📎</span>
          <span>{fileName}</span>
        </div>
      ) : null}
    </SectionCard>
  );
}
