
type BarraAlfabeticaProps = {
  activeLetter?: string;
  onChange?: (letter: string) => void;
};

const LETTERS = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O"];

function BarraAlfabetica({ activeLetter = "C", onChange }: BarraAlfabeticaProps) {
  return (
    <div
      className="
        flex flex-col items-center justify-center
        w-10 rounded-3xl bg-accent-brand
        py-4 gap-1
      "
    >
      {LETTERS.map((letter) => {
        const isActive = letter === activeLetter;

        return (
          <button
            key={letter}
            type="button"
            onClick={() => onChange?.(letter)}
            className={`
              flex h-5 w-5 items-center justify-center
              rounded-full text-[10px] font-medium
              transition-colors
              ${
                isActive
                  ? "text-heading font-bold text-content-inverse"
                  : "text-background-primary/80 hover:bg-background-primary/20"
              }
            `}
          >
            {letter}
          </button>
        );
      })}
    </div>
  );
}

export default BarraAlfabetica;
