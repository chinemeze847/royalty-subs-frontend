import { json, type LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { IoCartOutline } from "react-icons/io5";
import AccountH2Component from "~/components/header/account-h2.component";
import DashboardCardComponent from "~/components/utils/dashboard-card.component";
import WalletComponent from "~/components/utils/wallet.component";
import type User from "~/models/user.model";
import UserApiService from "~/services/user-api.service";
import { getSession } from "~/session.server";

type LoaderData = { user: User, transactionsBalance: number };

export const loader: LoaderFunction= async ({ request }) => {
  const session = await getSession(request.headers.get('Cookie'));

  const userId = session.get('userId');
  const accessToken = session.get('accessToken');

  const [userResponse, balanceResponse] = await Promise.all([
    UserApiService.readOne(userId, accessToken),
    UserApiService.readTransactionBalance(userId, accessToken),
  ]);

  return json<LoaderData>({ 
    user: userResponse.body.data,
    transactionsBalance: balanceResponse.body.data.transactionsBalance,
  });
}

export default function Dashboard() {
  const { user, transactionsBalance } = useLoaderData<LoaderData>();

  return (
    <div className="container">

      <AccountH2Component text="Dashboard" />

      <WalletComponent 
        fundable 
        balance={transactionsBalance} 
        name={`${user.firstName} ${user.lastName}`} 
      />

      <section className="py-dimen-lg">

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
