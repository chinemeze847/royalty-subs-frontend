import { json, type LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import AccountH2Component from '~/components/header/account-h2.component';
import ProfileDLItemComponent from '~/components/list/profile-dl-item.component';
import useMoneyFormat from '~/hooks/money-format.hook';
import type TransactionsBalance from '~/models/transactions-balance.model';
import type User from '~/models/user.model';
import { getSession } from '~/server/session.server';
import UserApiService from '~/services/user-api.service';

type LoaderData = { user: User, balance: TransactionsBalance };

export const loader: LoaderFunction = async ({ request, params }) => {
  const session = await getSession(request.headers.get('Cookie'));

  const accessToken = session.get('accessToken');

  const userResponse = await UserApiService.readOne(params.id as string, accessToken);

  const balanceResponse = await UserApiService.readTransactionBalance(params.id as string, accessToken);

  return json<LoaderData>({ user: userResponse.body.data, balance: balanceResponse.body.data });
}

export default function UserProfile() {
  const { user, balance } = useLoaderData<LoaderData>();

  const money = useMoneyFormat();
  
  return (
    <div className="container">

      <AccountH2Component text="User" links={[{ text: 'Edit', to: 'edit' }]} />

      <section>

        <dl>
          <ProfileDLItemComponent heading="First name" body={user.firstName} />
          <ProfileDLItemComponent heading="Last name" body={user.lastName} />
          <ProfileDLItemComponent 
            heading="Account balance" 
            body={`NGN ${money(balance.transactionsBalance)}`} 
          />
          <ProfileDLItemComponent heading="Email" body={user.email} />
          <ProfileDLItemComponent heading="Phone number" body={user.phoneNumber} />
          <ProfileDLItemComponent heading="Admin" body={user.admin || 'false'} />
          <ProfileDLItemComponent heading="Admin Role" body={user.adminRole || 'none'} />
          <ProfileDLItemComponent heading="Status" body={user.status} />
          <ProfileDLItemComponent heading="Join on" body={user.createdAt} />
        </dl>

      </section>
    </div>
  );
}
