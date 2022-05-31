import { Link } from "@remix-run/react";
import type { IconType } from "react-icons";
import { IoBulb, IoCall, IoTv, IoWifi } from "react-icons/io5";
import AccountH2Component from "~/components/header/account-h2.component";

const ProductItem = ({ Icon, text, to }: { Icon: IconType; text: string; to: string; }) => {
  return (
    <li className="mb-dimen-md">
      <Link 
        to={to} 
        className="block shadow shadow-color-primary rounded-lg p-dimen-lg text-center hover:bg-color-background"
      >
        <Icon className="text-5xl rounded-full mx-auto bg-color-primary text-color-primary-variant" />
        <div className="font-bold text-lg mt-dimen-md">{ text }</div>
      </Link>
    </li>
  );
}

export default function ProductsIndex() {
  return (
    <div className="container">

      <AccountH2Component text="Products" />

      <ul className="md:grid md:grid-cols-2 gap-x-dimen-md">
        <ProductItem Icon={IoWifi} text="Data" to="data" />
        <ProductItem Icon={IoCall} text="Airtime" to="airtime" />
        <ProductItem Icon={IoBulb} text="Electricity bill" to="electricity-bill" />
        <ProductItem Icon={IoTv} text="Cable subscription" to="cable-subcription" />
      </ul>

    </div>
  );
}
