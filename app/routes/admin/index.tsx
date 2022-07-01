import { json, type LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { IoCartOutline, IoPersonOutline } from 'react-icons/io5';
import AccountH2Component from '~/components/header/account-h2.component';
import TransactionItemComponent from '~/components/list/transaction-item.component';
import UserItemComponent from '~/components/list/user-item.component';
import DashboardCardComponent from '~/components/utils/dashboard-card.component';
import WalletComponent from '~/components/utils/wallet.component';
import type Transaction from '~/models/transaction.model';
import type TransactionsBalance from '~/models/transactions-balance.model';
import type User from '~/models/user.model';
import { getSession } from '~/server/session.server';
import TransactionApiService from '~/services/transaction-api.service';
import UserApiService from '~/services/user-api.service';

type LoaderData = { 
  user: User;
  balance: TransactionsBalance;
  users: User[];
  transactions: Transaction[];
};

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get('Cookie'));

  const userId = session.get('userId');
  const accessToken = session.get('accessToken');

  const [
    userResponse, 
    balanceResponse, 
    usersResponse, 
    TransactionsResponse
  ] = await Promise.all([
    UserApiService.readOne(userId, accessToken),
    TransactionApiService.readTentenAccountBalance(accessToken),
    UserApiService.read(null, null, accessToken),
    TransactionApiService.read(null, null, accessToken),
  ]);

  return json<LoaderData>({ 
    user: userResponse.data,
    balance: balanceResponse.data,
    users: usersResponse.data,
    transactions: TransactionsResponse.data,
  });
}

export default function Dashboard() {
  const { user, balance, transactions, users } = useLoaderData<LoaderData>();

  return (
    <div className="container">

      <AccountH2Component text="Dashboard" />

      <WalletComponent 
        balanceTitle="Tenten wallet balance"
        balance={balance.transactionsBalance ?? 0} 
        name={`${user.firstName} ${user.lastName}`}  
      />

      <section className="py-dimen-lg">

        <DashboardCardComponent 
          list={users}
          listTitles={['ID', 'Full name', 'Email', 'Phone number', 'Status', 'Action']}
          title="Recent users"
          renderItem={(item) => <UserItemComponent key={item.id} user={item} />}
          empty={{ Icon: IoPersonOutline, text: 'No user has registered' }}
        />

        <DashboardCardComponent 
          list={transactions}
          listTitles={['Reference', 'Amount', 'Type', 'Status', 'Action']}
          title="Recent transactions"
          renderItem={(item) => <TransactionItemComponent key={item.id} transaction={item} />}
          empty={{ Icon: IoCartOutline, text: 'No transaction has been performed' }}
        />

      </section>
      
    </div>
  );
}
