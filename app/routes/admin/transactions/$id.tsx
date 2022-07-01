import { json, type LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import AccountH2Component from '~/components/header/account-h2.component';
import ProfileDLItemComponent from '~/components/list/profile-dl-item.component';
import useDateFormat from '~/hooks/date-format.hook';
import useMoneyFormat from '~/hooks/money-format.hook';
import type Transaction from '~/models/transaction.model';
import { getSession } from '~/server/session.server';
import TransactionApiService from '~/services/transaction-api.service';

type LoaderData = { transaction: Transaction };

export const loader: LoaderFunction = async ({ request, params }) => {
  const session = await getSession(request.headers.get('Cookie'));

  const accessToken = session.get('accessToken');

  const apiResponse = await TransactionApiService.readOne(params.id as string, accessToken);
  
  return json<LoaderData>({ 
    transaction: apiResponse.data
  });
}

export default function TransactionProfile() {
  const { transaction } = useLoaderData<LoaderData>();

  const money = useMoneyFormat();

  const dateFormat = useDateFormat();

  return (
    <div className="container">

      <AccountH2Component text="Transaction" />

      <section>

        <dl>
          <ProfileDLItemComponent heading="Reference" body={transaction.reference} />
          <ProfileDLItemComponent heading="Total" body={`NGN ${money(transaction.total)}`} />
          <ProfileDLItemComponent heading="Amount" body={`NGN ${money(transaction.amount)}`} />
          <ProfileDLItemComponent heading="Fee" body={`NGN ${money(transaction.fee)}`} />
          <ProfileDLItemComponent heading="Type" body={transaction.type} />
          <ProfileDLItemComponent heading="Status" body={transaction.status} />
          { 
            transaction.recipientNumber && (
              <ProfileDLItemComponent heading="Recipient number" body={transaction.recipientNumber} />
            )
          }
          { 
            transaction.depositMethod && (
              <ProfileDLItemComponent heading="Deposit method" body={transaction.depositMethod} />
            )
          }
          <ProfileDLItemComponent heading="Date" body={dateFormat(transaction.createdAt)} />
          { 
            transaction.user && (
              <ProfileDLItemComponent 
                heading="User" 
                body={`
                  ${transaction.user.firstName}
                  ${transaction.user.lastName}
                  (${transaction.user.email})
                  (${transaction.user.phoneNumber})
                `} 
              />
            )
          }
          { 
            transaction.productUnit && (
              <ProfileDLItemComponent 
                heading="Product" 
                body={`
                  ${transaction.productUnit.brand.name}
                  ${transaction.productUnit.name}
                  (${transaction.productUnit.duration} days)
                `} 
              />
            )
          }
        </dl>

      </section>

    </div>
  );
}
