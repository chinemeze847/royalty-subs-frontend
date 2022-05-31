import { Link } from "@remix-run/react";
import type { IconType } from "react-icons";
import { IoBulb, IoCall, IoCartOutline, IoTv, IoWifi } from "react-icons/io5";
import AccountH2Component from "~/components/header/account-h2.component";
import EmptyListComponent from "~/components/utils/empty-list.component";

const ProductItem = ({ to, Icon, text }: { to: string, Icon: IconType, text: string }) => {
  return (
    <li className="mb-dimen-sm">
      <Link 
        to={to} 
        className="flex py-dimen-sm items-center gap-x-dimen-sm hover:bg-color-background"
      >
        <Icon className="text-2xl text-color-primary" />
        <span className="">{ text }</span>
      </Link>
    </li>
  );
}

export default function Dashboard() {
  return (
    <div className="container">

      <AccountH2Component text="Dashboard" />

      <section className="text-color-on-primary bg-color-primary-variant p-dimen-lg rounded-lg">
        <div className="text-3xl font-bold mb-dimen-md">Welcome, Jasper Anelechukwu</div>
        <div className="lg:flex lg:justify-between">
          <div>
            <div className="text-lg">Wallet balance</div>
            <div className="font-bold text-2xl">NGN 2,000,000.00</div>
          </div>
          <Link 
            to="fund-wallet" 
            className="w-fit mt-dimen-md block bg-color-primary shadow shadow-white p-dimen-md rounded-lg hover:shadow-lg"
          >
            Fund wallet
          </Link>
        </div>
      </section>

      <section className="py-dimen-lg lg:flex lg:gap-x-dimen-md">

        <div className="shadow shadow-color-primary p-dimen-md rounded-lg">
          <div className="font-bold">Products</div>
          <ul>
            <ProductItem text="Buy Data" to="buy-data" Icon={IoWifi} />
            <ProductItem text="Buy Airtime" to="buy-airtime" Icon={IoCall} />
            <ProductItem text="Electricity Payment" to="electricity-payment" Icon={IoBulb} />
            <ProductItem text="Cable Payment" to="cable-payment" Icon={IoTv} />
          </ul>
        </div>

        <div className="shadow shadow-color-primary p-dimen-md rounded-lg lg:flex-grow">
          <div className="font-bold">Transactions</div>
          <ul>
            <li>
              <EmptyListComponent Icon={IoCartOutline} text="You have performed no transactions" />
            </li>
          </ul>
        </div>

      </section>
    </div>
  );
}
