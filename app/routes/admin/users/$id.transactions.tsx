import { json, type LoaderFunction } from "@remix-run/node";
import type TransactionsBalance from "~/models/transactions-balance.model";
import type User from "~/models/user.model";
import { 
  TransactionsTableComponent, 
  type LoaderData as TransactionLoaderData 
} from '~/components/utils/transactions-table.component';
import { getSession } from "~/server/session.server";
import UserApiService from "~/services/user-api.service";
import { useLoaderData } from "@remix-run/react";
import AccountH2Component from "~/components/header/account-h2.component";
import ProfileDLItemComponent from "~/components/list/profile-dl-item.component";
import useMoneyFormat from "~/hooks/money-format.hook";

type LoaderData = { user: User; balance: TransactionsBalance; } & TransactionLoaderData;

export const loader: LoaderFunction = async ({ request, params }) => {
  const url = new URL(request.url);
  const page = url.searchParams.get("page");
  const type = url.searchParams.get("type");

  const userId = params.id as string;

  const session = await getSession(request.headers.get('Cookie'));

  const accessToken = session.get('accessToken');

  const [userResponse, balanceResponse, transactionsResponse] = await Promise.all([
    UserApiService.readOne(userId, accessToken),
    UserApiService.readTransactionBalance(userId, accessToken),
    UserApiService.readTransactions(userId, page, type, accessToken),
  ]);

  if (userResponse.statusCode !== 200) {
    throw new Response('Error', { status: userResponse.statusCode });
  } else if (balanceResponse.statusCode !== 200) {
    throw new Response('Error', { status: balanceResponse.statusCode });
  } else if (transactionsResponse.statusCode !== 200) {
    throw new Response('Error', { status: transactionsResponse.statusCode });
  }

  return json<LoaderData>({ 
    user: userResponse.data, 
    balance: balanceResponse.data,
    transactions: transactionsResponse.data,
    pagination: transactionsResponse.metaData?.pagination as any,
  });
}

export default function UserTransactions() {
  const { user, balance, ...transactions } = useLoaderData<LoaderData>();

  const money = useMoneyFormat();

  return (
    <div className="container">

    <AccountH2Component text="User transactions" />

    <section>

      <dl>
        <ProfileDLItemComponent heading="First name" body={user.firstName} />
        <ProfileDLItemComponent heading="Last name" body={user.lastName} />
        <ProfileDLItemComponent 
          heading="Account balance" 
          body={`NGN ${money(balance.transactionsBalance)}`} 
        />
      </dl>

    </section>
    <TransactionsTableComponent data={transactions} />
  </div>
  );
}
