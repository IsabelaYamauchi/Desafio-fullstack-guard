interface TextFieldProps {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

function TextField({
  label,
  placeholder,
  value,
  onChange,
  error,
}: TextFieldProps) {
  const hasError = !!error;

  return (
    <div className="flex flex-col gap-1">
      <label className="text-label-sm text-content-heading">{label}</label>

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={
          "h-11 w-full rounded-md border bg-background-secondary px-3 " +
          "text-text-md text-content-primary placeholder:text-content-placeholder " +
          "outline-none transition-colors " +
          (hasError ? "border-accent-red focus:border-accent-red focus:ring-1 focus:ring-accent-red"
            : "border-border-primary hover:border-content-placeholder focus:border-accent-brand focus:ring-1 focus:ring-accent-brand")
        }
      />

      {/* texto de apoio / erro */}
      {error && (
        <p className="mt-1 flex items-center gap-2 text-text-sm text-accent-red">
          <span className="text-xs">●</span>
          <span>{error}</span>
        </p>
      )}
    </div>
  );
}
