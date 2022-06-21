import { NavLink } from "@remix-run/react";

export default function HomeHeaderNavItemComponent({ to, text }: { to: string; text: string }) {
  return (
    <li>
      <NavLink 
        to={to}
        className="block p-dimen-sm rounded-full lg:text-color-primary hover:bg-color-background lg:font-bold" 
      >
        { text }
      </NavLink>
    </li>
  );
}