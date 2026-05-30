import type { JobCostFormState } from "@/lib/types";
import { FieldError, FormLabel, SectionCard, inputClassName } from "./SectionCard";

const MAX_NOTES = 500;

interface NotesSectionProps {
  formState: JobCostFormState;
  errors: Record<string, string>;
  onNotesChange: (value: string) => void;
  onNotesBlur: () => void;
}

export function NotesSection({
  formState,
  errors,
  onNotesChange,
  onNotesBlur,
}: NotesSectionProps) {
  const charCount = formState.notes.length;
  const atLimit = charCount >= MAX_NOTES;

  return (
    <SectionCard title="Notes" id="notes">
      <FormLabel htmlFor="notes">Completion Notes</FormLabel>
      <textarea
        id="notes"
        name="notes"
        rows={4}
        maxLength={MAX_NOTES}
        className={`${inputClassName} min-h-[120px] resize-y`}
        value={formState.notes}
        onChange={(e) => onNotesChange(e.target.value)}
        onBlur={onNotesBlur}
        aria-invalid={Boolean(errors.notes)}
        aria-describedby="notes-char-count"
      />
      <div className="mt-1 flex items-start justify-between gap-2">
        <FieldError message={errors.notes} />
        <p
          id="notes-char-count"
          className={`ml-auto shrink-0 text-sm ${atLimit ? "text-red-600" : "text-slate-500"}`}
        >
          {charCount}/{MAX_NOTES}
        </p>
      </div>
    </SectionCard>
  );
}
