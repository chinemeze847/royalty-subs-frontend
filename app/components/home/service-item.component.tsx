export default function ServiceItemComponent(
  { src, alt, heading, body }: 
  { src: string; alt: string; heading: string; body: string; }
) {
  return (
    <li className="mb-dimen-md">
      <div className="transition-transform shadow shadow-color-primary rounded-lg hover:scale-105">
        <img src={`/images/${src}`} alt={alt} className="w-full h-[20rem] rounded-tl-lg rounded-tr-lg" />
        <div className="p-dimen-md">
          <div className="font-bold">{ heading }</div>
          <div>{ body }</div>
        </div>
      </div>
    </li>
  );
}
