interface ActionButtonsProps {
  onSaveDraft: () => void;
  onSubmit: () => void;
  onReset: () => void;
}

export function ActionButtons({
  onSaveDraft,
  onSubmit,
  onReset,
}: ActionButtonsProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
      <button
        type="button"
        onClick={onSaveDraft}
        className="min-h-11 flex-1 rounded-lg border border-slate-300 bg-white px-4 text-base font-medium text-slate-800 shadow-sm transition-colors hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 sm:flex-none sm:px-6"
      >
        Save Draft
      </button>
      <button
        type="button"
        onClick={onSubmit}
        className="min-h-11 flex-1 rounded-lg bg-blue-600 px-4 text-base font-medium text-white shadow-sm transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:flex-none sm:px-6"
      >
        Submit to QS
      </button>
      <button
        type="button"
        onClick={onReset}
        className="min-h-11 flex-1 rounded-lg border border-transparent px-4 text-base font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-400/30 sm:flex-none sm:px-6"
      >
        Reset
      </button>
    </div>
  );
}
