type IconButtonProps = {
  active?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

function BotaoIcon({ active = false, children, ...props }: IconButtonProps) {
  return (
    <button
      type="button"
      className={`
        h-10 w-10 rounded-xl flex items-center justify-center
        transition-colors
        ${active
          ? "bg-accent-brand"
          : "bg-background-secondary hover:bg-background-tertiary"}
      `}
      {...props}
    >
      {children}
    </button>
  );
}


export default BotaoIcon