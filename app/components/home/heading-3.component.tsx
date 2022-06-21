export default function Heading3Component({ text }: { text: string }) {
  return (
    <h3 
      className="w-fit font-bold text-color text-3xl text-color-primary mb-dimen-lg pb-dimen-xs px-dimen-md border-b-4 border-color-primary"
    >
      { text }
    </h3>
  );
}
