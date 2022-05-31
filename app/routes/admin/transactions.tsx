import { Outlet } from "@remix-run/react";
import AccountH2Component from "~/components/header/account-h2.component";

export default function Transactions() {
  return (
    <div className="container">

      <AccountH2Component text="Transactions" />

      <Outlet />

    </div>
  );
}
