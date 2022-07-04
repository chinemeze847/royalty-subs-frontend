import { json, type LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { IoCartOutline } from "react-icons/io5";
import AccountH2Component from "~/components/header/account-h2.component";
import DashboardCardComponent from "~/components/utils/dashboard-card.component";
import WalletComponent from "~/components/utils/wallet.component";
import type TransactionsBalance from "~/models/transactions-balance.model";
import type User from "~/models/user.model";
import UserApiService from "~/services/user-api.service";
import { getSession } from "~/server/session.server";
import type Transaction from "~/models/transaction.model";
import TransactionItemComponent from "~/components/list/transaction-item.component";

type LoaderData = { 
  user: User;
  balance: TransactionsBalance;
  transactions: Transaction[];
};

export const loader: LoaderFunction= async ({ request }) => {
  const session = await getSession(request.headers.get('Cookie'));

  const userId = session.get('userId');
  const accessToken = session.get('accessToken');

  const [
    userResponse, 
    balanceResponse, 
    transactionsResponse
  ] = await Promise.all([
    UserApiService.readOne(userId, accessToken),
    UserApiService.readTransactionBalance(userId, accessToken),
    UserApiService.readTransactions(userId, null, null, accessToken),
  ]);

  return json<LoaderData>({ 
    user: userResponse.data,
    balance: balanceResponse.data,
    transactions: transactionsResponse.data,
  });
}

export default function Dashboard() {
  const { user, balance, transactions } = useLoaderData<LoaderData>();

  return (
    <div className="container">

      <AccountH2Component text="Dashboard" />

      <WalletComponent 
        fundable 
        balance={balance.transactionsBalance} 
        name={`${user.firstName} ${user.lastName}`} 
      />

      <section className="py-dimen-lg">

        <DashboardCardComponent 
          list={transactions}
          listTitles={['Reference', 'Amount', 'Type', 'Status', 'Action']}
          title="Recent transactions"
          renderItem={(item) => <TransactionItemComponent key={item.id} transaction={item} linkPrefix="transactions/" />}
          empty={{ Icon: IoCartOutline, text: 'No transaction has been performed' }}
        />

      </section>
    </div>
  );
}
