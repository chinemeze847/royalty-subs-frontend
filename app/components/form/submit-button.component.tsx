
export default function SubmitButtonComponent({ text }: { text: string }) {
  return (
    <div className="mb-dimen-sm">
      <button 
        className="w-full h-12 font-bold block text-color-on-primary bg-color-primary rounded-lg hover:bg-color-primary-variant"
      >
        { text }
      </button>
    </div>
  );
}
