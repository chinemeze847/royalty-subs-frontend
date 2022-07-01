export default function FileInputComponent({ alt, src, error }: { alt: string; src: string; error?: string }) {
  return (
    <div>
      <div className="h-32 relative">
        <input id="photo-input" accept="image/*" type="file" name="photo" className="w-5 block mx-auto" required />
        <label htmlFor="photo-input" className="block w-full mx-auto absolute top-0">
          <img alt={alt} src={src} className="w-32 h-32 mx-auto rounded-lg" />
        </label>
      </div>
      <div className="text-color-error">{ error }</div>
    </div>
  );
}
