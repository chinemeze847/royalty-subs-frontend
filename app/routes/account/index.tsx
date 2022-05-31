import { Link } from "@remix-run/react";
import type { IconType } from "react-icons";
import { IoBulb, IoCall, IoCartOutline, IoCubeOutline, IoTv, IoWifi } from "react-icons/io5";
import AccountH2Component from "~/components/header/account-h2.component";
import DashboardCardComponent from "~/components/utils/dashboard-card.component";
import WalletComponent from "~/components/utils/wallet.component";

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

const PRODUCTS = [
  { text: 'Buy Data', to: 'buy-data', Icon: IoWifi },
  { text: 'Buy Airtime', to: 'buy-airtime', Icon: IoCall },
  { text: 'Electricity Payment', to: 'electricity-payment', Icon: IoBulb },
  { text: 'Cable Payment', to: 'cable-payment', Icon: IoTv },
];

export default function Dashboard() {
  return (
    <div className="container">

      <AccountH2Component text="Dashboard" />

      <WalletComponent balance={2_000_000.00} name="Jasper Anelechukwu" fundable />

      <section className="py-dimen-lg lg:flex lg:gap-x-dimen-md">

        <DashboardCardComponent 
          list={PRODUCTS}
          flexGrow={false}
          title="Products"
          empty={{ Icon: IoCubeOutline, text: 'There is no product' }}
          renderItem={(item) => <ProductItem text={item.text} to={item.to} Icon={item.Icon} />}
        />

        <DashboardCardComponent 
          list={[]}
          title="Recent transactions"
          renderItem={() => <div></div>}
          empty={{ Icon: IoCartOutline, text: 'You have performed no transactions' }}
        />

      </section>
    </div>
  );
}
