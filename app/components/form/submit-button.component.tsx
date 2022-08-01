
export default function SubmitButtonComponent({ text, topSpace = false }: { text: string, topSpace?: boolean }) {
  return (
    <div className={`mb-dimen-sm ${topSpace ? 'mt-dimen-lg' : ''}`}>
      <button 
        className="w-full h-12 font-bold block text-color-on-primary bg-color-primary rounded-lg hover:bg-color-primary-variant disabled:bg-color-background"
      >
        { text }
      </button>
    </div>
  );
}
