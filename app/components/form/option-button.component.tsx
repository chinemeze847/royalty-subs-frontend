export default function OptionButtonComponent(
  { type, text, action }: 
  { type: 'button' | 'submit'; text: string; action?(): void }
) {
  return (
    <button 
      type={type} 
      onClick={action}
      className={`
        bg-color-primary 
        font-bold 
        text-color-on-primary 
        px-dimen-xl 
        py-dimen-xs 
        rounded-lg 
        flex-grow
        hover:bg-color-primary-variant
      `}
    >
      { text }
    </button>
  );
}
