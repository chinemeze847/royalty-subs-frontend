import { NavLink, Outlet } from "@remix-run/react";
import AccountH2Component from "~/components/header/account-h2.component";

const TabItem = ({ text, to }: { text: string; to: string; }) => {
  return (
    <li>
      <NavLink 
        to={to}
        className={({ isActive }) => `
          block 
          text-color-on-primary 
          py-dimen-xs px-dimen-lg 
          font-bold rounded-lg 
          hover:text-color-primary
          ${
            isActive 
              ? 'bg-color-primary hover:text-color-primary-variant'
              : 'bg-color-primary-variant hover:text-color-primary'
          }
        `}
      >
        { text }
      </NavLink>
    </li>
  );
}

export default function Pricing() {
  return (
    <div className="container">

      <AccountH2Component text="Pricing" />

      <ul className="w-full flex gap-x-dimen-md overflow-x-auto">
        <TabItem text="Data" to="data" />
        <TabItem text="Airtime" to="airtime" />
        <TabItem text="Electricity" to="electricity" />
        <TabItem text="Cable" to="cable" />
      </ul>

      <section className="my-dimen-lg rounded-lg overflow-x-auto p-dimen-sm shadow shadow-color-primary">
        <Outlet />
      </section>

    </div>
  );
}
