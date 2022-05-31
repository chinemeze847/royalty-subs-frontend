import { IoCartOutline, IoPersonOutline } from "react-icons/io5";
import AccountH2Component from "~/components/header/account-h2.component";
import DashboardCardComponent from "~/components/utils/dashboard-card.component";
import WalletComponent from "~/components/utils/wallet.component";

export default function Dashboard() {
  return (
    <div className="container">

      <AccountH2Component text="Dashboard" />

      <WalletComponent balance={2_000_000.00} name="Jasper Anelechukwu" />

      <section className="py-dimen-lg lg:flex lg:gap-x-dimen-md">

        <DashboardCardComponent 
          list={[]}
          title="Recent users"
          renderItem={() => <div></div>}
          empty={{ Icon: IoPersonOutline, text: 'No user has registered' }}
          />

        <DashboardCardComponent 
          list={[]}
          title="Recent transactions"
          renderItem={() => <div></div>}
          empty={{ Icon: IoCartOutline, text: 'No transaction has been performed' }}
          />

      </section>
      
    </div>
  );
}
