import { Link } from "@remix-run/react";

export default function AccountH2Component(
  { text, links }: { text: string; links?: { text: string; to: string; }[] }
) {
  return (
    <div className="flex gap-dimen-sm mb-dimen-md flex-wrap">
      <h2 className="text-4xl font-bold flex-grow">{ text }</h2>
      <ul className="flex gap-dimen-sm">
        {
          links?.map(item => (
            <li key={item.text}>
              <Link 
                to={item.to}
                className="inline-block text-white bg-color-primary py-dimen-xs px-dimen-md rounded-lg hover:bg-color-primary-variant"
              >
                { item.text }
              </Link>
            </li>
          ))
        }
      </ul>
    </div>
  );
}
