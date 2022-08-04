import { json, type LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { IoCartOutline, IoPersonOutline } from 'react-icons/io5';
import AccountH2Component from '~/components/header/account-h2.component';
import TransactionItemComponent from '~/components/list/transaction-item.component';
import UserItemComponent from '~/components/list/user-item.component';
import DashboardCardComponent from '~/components/utils/dashboard-card.component';
import WalletComponent from '~/components/utils/wallet.component';
import useMoneyFormat from '~/hooks/money-format.hook';
import type Analysis from '~/models/analysis.model';
import type Transaction from '~/models/transaction.model';
import type TransactionsBalance from '~/models/transactions-balance.model';
import type User from '~/models/user.model';
import { getSession } from '~/server/session.server';
import AnalysisApiService from '~/services/analysis-api.service';
import TransactionApiService from '~/services/transaction-api.service';
import UserApiService from '~/services/user-api.service';

type LoaderData = { 
  user: User;
  users: User[];
  analysis: Analysis;
  transactions: Transaction[];
  balance: TransactionsBalance;
};

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get('Cookie'));

  const userId = session.get('userId');
  const accessToken = session.get('accessToken');

  const [
    userResponse, 
    balanceResponse, 
    usersResponse, 
    transactionsResponse,
    analysisResponse,
  ] = await Promise.all([
    UserApiService.readOne(userId, accessToken),
    TransactionApiService.readTentenAccountBalance(accessToken),
    UserApiService.read(null, accessToken),
    TransactionApiService.read(null, null, accessToken),
    AnalysisApiService.read(accessToken),
  ]);

  if (userResponse.statusCode !== 200) {
    throw new Response('Error', { status: userResponse.statusCode });
  } else if (balanceResponse.statusCode !== 200) {
    throw new Response('Error', { status: balanceResponse.statusCode });
  } else if (transactionsResponse.statusCode !== 200) {
    throw new Response('Error', { status: transactionsResponse.statusCode });
  } else if (usersResponse.statusCode !== 200) {
    throw new Response('Error', { status: usersResponse.statusCode });
  } else if (analysisResponse.statusCode !== 200) {
    throw new Response('Error', { status: analysisResponse.statusCode });
  }

  return json<LoaderData>({ 
    user: userResponse.data,
    users: usersResponse.data,
    balance: balanceResponse.data,
    analysis: analysisResponse.data,
    transactions: transactionsResponse.data,
  });
}

const AnalysisItemComponent = (
  { data, text, hasCurrency = false }: { data: number; text: string; hasCurrency?: boolean; }
) => {
  const moneyFormat = useMoneyFormat();

  return (
    <li className="mb-dimen-md flex-grow">
      <div
        className="block shadow shadow-color-primary rounded-lg p-dimen-sm text-center"
      >
        <div className="font-bold text-2xl">{ hasCurrency ? `NGN ${moneyFormat(data)}` : data }</div>
        <div className="font-bold mt-dimen-xs">{ text }</div>
      </div>
    </li>
  );
}

export default function Dashboard() {
  const { user, balance, transactions, users, analysis } = useLoaderData<LoaderData>();

  return (
    <div className="container">

      <AccountH2Component text="Dashboard" />

      <WalletComponent 
        balanceTitle="Tenten wallet balance"
        balance={balance.transactionsBalance ?? 0} 
        name={`${user.firstName} ${user.lastName}`}  
      />

      <section className="py-dimen-lg">

        <ul className="flex items-center gap-dimen-sm flex-wrap mb-dimen-sm">
          <AnalysisItemComponent data={analysis.numberOfUsers} text="Users" />
          <AnalysisItemComponent data={analysis.numberOfBrands} text="Brands" />
          <AnalysisItemComponent data={analysis.numberOfProducts} text="Products" />
          <AnalysisItemComponent data={analysis.numberOfProductUnits} text="Product units" />
          <AnalysisItemComponent data={analysis.numberOfTransactions} text="Transactions" />
          <AnalysisItemComponent data={analysis.numberOfPaymentTransactions} text="Payment transactions" />
          <AnalysisItemComponent data={analysis.numberOfDepositTransactions} text="Deposit transactions" />
          <AnalysisItemComponent data={analysis.numberOfBonusTransactions} text="Bonus transactions" />
          <AnalysisItemComponent data={analysis.sumOfPaymentTransactions} text="Total payment transactions" hasCurrency />
          <AnalysisItemComponent data={analysis.sumOfDepositTransactions} text="Total deposit transactions" hasCurrency />
          <AnalysisItemComponent data={analysis.sumOfBonusTransactions} text="Total bonus transactions" hasCurrency />
        </ul>

        <DashboardCardComponent 
          list={users}
          title="Recent users"
          listTitles={['ID', 'Full name', 'Email', 'Phone number', 'Status', 'Action']}
          renderItem={(item) => <UserItemComponent key={item.id} user={item} linkPrefix="users/" />}
          empty={{ Icon: IoPersonOutline, text: 'No user has registered' }}
        />

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
