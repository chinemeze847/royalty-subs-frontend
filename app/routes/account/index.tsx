import { json, type LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { IoCartOutline } from 'react-icons/io5';
import AccountH2Component from '~/components/header/account-h2.component';
import DashboardCardComponent from '~/components/utils/dashboard-card.component';
import WalletComponent from '~/components/utils/wallet.component';
import type TransactionsBalance from '~/models/transactions-balance.model';
import type User from '~/models/user.model';
import type Product from '~/models/product.model';
import type Transaction from '~/models/transaction.model';
import UserApiService from '~/services/user-api.service';
import { getSession } from '~/server/session.server';
import TransactionItemComponent from '~/components/list/transaction-item.component';
import ProductApiService from '~/services/product-api.service';
import ProductLIItemComponent from '~/components/list/product-li-item.component';

type LoaderData = { 
  user: User;
  balance: TransactionsBalance;
  transactions: Transaction[];
  products: Product[];
};

export const loader: LoaderFunction= async ({ request }) => {
  const session = await getSession(request.headers.get('Cookie'));

  const userId = session.get('userId');
  const accessToken = session.get('accessToken');

  const [
    userResponse, 
    balanceResponse, 
    transactionsResponse,
    productsResponse,
  ] = await Promise.all([
    UserApiService.readOne(userId, accessToken),
    UserApiService.readTransactionBalance(userId, accessToken),
    UserApiService.readTransactions(userId, null, accessToken),
    ProductApiService.read(),
  ]);

  return json<LoaderData>({ 
    user: userResponse.data,
    balance: balanceResponse.data,
    transactions: transactionsResponse.data,
    products: productsResponse.data,
  });
}

const DataBalanceCodeItemComponent = ({ text }: { text: string; }) => {
  return (
    <li className="border border-color-primary rounded-lg p-dimen-xs">{ text }</li>
  );
}

export default function Dashboard() {
  const { user, balance, transactions, products } = useLoaderData<LoaderData>();

  return (
    <div className="container">

      <AccountH2Component text="Dashboard" />

      <WalletComponent 
        fundable 
        balance={balance.transactionsBalance} 
        name={`${user.firstName} ${user.lastName}`} 
      />

      <section className="py-dimen-lg">

        <ul className="flex items-center gap-dimen-sm flex-wrap mb-dimen-sm">
          {
            products.map(item => (
              <ProductLIItemComponent key={item.id} product={item} />
            ))
          }
        </ul>

        <div className="mb-dimen-xl shadow shadow-color-primary p-dimen-sm rounded-lg">
          <h3 className="font-bold mb-dimen-xs">Data balance codes</h3>
          <ul className="flex items-center gap-dimen-xs flex-wrap">
            <DataBalanceCodeItemComponent text="MTN [SME] *461*4#" />
            <DataBalanceCodeItemComponent text="MTN [Gifting] *131*4# or *460*260#" />
            <DataBalanceCodeItemComponent text="9mobile [Gifting] *228#" />
            <DataBalanceCodeItemComponent text="Airtel *140#" />
            <DataBalanceCodeItemComponent text="Glo *127*0#." />
          </ul>
        </div>

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
