import { useRef, useState } from 'react';

export default function FileInputComponent({ alt, src, error }: { alt: string; src: string; error?: string }) {
  const photoInput = useRef<HTMLInputElement>(null);

  const [photo, setPhoto] = useState(src);
  
  const photoChoosen = () => {
    
    const reader = new FileReader();

    reader.onload = function (e) {
      setPhoto(e.target?.result as string);
    }

    reader.readAsDataURL(photoInput?.current?.files?.[0] as Blob);
  }

  return (
    <div>
      <div className="h-32 relative">
        <input 
          ref={photoInput}
          id="photo-input" 
          accept="image/*" 
          type="file" 
          name="photo" 
          className="w-5 block mx-auto" 
          onChange={photoChoosen} 
          required 
        />
        <label htmlFor="photo-input" className="block w-full mx-auto absolute top-0">
          <img alt={alt} src={photo} className="w-32 h-32 mx-auto rounded-lg" />
        </label>
      </div>
      <div className="text-color-error">{ error }</div>
    </div>
  );
}
