import { Link } from "@remix-run/react";

export default function TopSectionLinkComponent(
  { to, text, inverse = false }: 
  { to: string; text: string; inverse?: boolean }
) {
  return (
    <li>
      <Link 
        to={to}
        className={`
          block 
          border 
          border-color-primary
          p-dimen-sm 
          rounded-lg 
          hover:bg-color-primary-variant
          ${ 
            inverse 
              ? 'text-color-primary'
              : 'text-color-on-primary bg-color-primary'
          }
        `}
      >
        { text }
      </Link>
    </li>
  );
}