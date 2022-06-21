import { Link } from '@remix-run/react';

export default function FooterNavItemComponent({ to, text }: { to: string; text: string }) {
  return (
    <li>
      <Link 
        to={to}
        className="w-fit block py-dimen-sm hover:border-b-2 hover:border-color-primary" 
      >
        { text }
      </Link>
    </li>
  );
}
