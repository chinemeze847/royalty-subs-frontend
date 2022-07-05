import { type ActionFunction, json, redirect, Response, type LoaderFunction } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';
import InputComponent from '~/components/form/input.component';
import SubmitButtonComponent from '~/components/form/submit-button.component';
import AccountH2Component from '~/components/header/account-h2.component';
import ProfileDLItemComponent from '~/components/list/profile-dl-item.component';
import useMoneyFormat from '~/hooks/money-format.hook';
import type PaystackFee from '~/models/paystack-fee.model';
import Transaction from '~/models/transaction.model';
import { commitSession, getSession } from '~/server/session.server';
import TransactionApiService from '~/services/transaction-api.service';

type LoaderData = {
  amount: number;
  paystackFee: PaystackFee;
};

export const loader: LoaderFunction = async ({ request }) => {

  const url = new URL(request.url);

  const amount = url.searchParams.get('amount');

  if (amount === null || isNaN(Number(amount))) {
    throw new Response('Error', { status: 404 });
  } else if (Number(amount) < Transaction.MINIMIUM_DEPOSIT_AMOUNT) {
    throw new Response('Error', { status: 400 });
  }

  const paystackFeeResponse = await TransactionApiService.readPaystackFee();

  if (paystackFeeResponse.statusCode !== 200) {
    throw new Response('Error', { status: paystackFeeResponse.statusCode });
  }

  const data = { 
    amount: Number(amount),
    paystackFee: paystackFeeResponse.data,
  };

  return json<LoaderData>(data);
}

export const action: ActionFunction = async ({ request, params }) => {
  const session = await getSession(request.headers.get('Cookie'));

  const form = await request.formData();

  let redirectTo = `${new URL(request.url).pathname}?amount=${form.get('amount')}`;

  return redirect(redirectTo, {
    headers: {
      'Set-Cookie': await commitSession(session),
    },
  });
}

export default function FundWithPaystack() {
  const moneyFormat = useMoneyFormat();
  
  const { paystackFee, amount } = useLoaderData<LoaderData>();

  const fee = amount <= paystackFee.threshold 
    ? paystackFee.min 
    : paystackFee.max;

  return (
    <div className="container">

      <AccountH2Component text="Fund wallet via paystack" />

      <section>

        <dl>
          <ProfileDLItemComponent heading="Amount" body={`NGN ${moneyFormat(amount)}`} />
          <ProfileDLItemComponent heading="Fee" body={`NGN ${fee}`} />
          <ProfileDLItemComponent heading="Total" body={`NGN ${amount + fee}`} />
        </dl>

        <Form className="account-form" method="post">

          <InputComponent id="" label="" name="amount" type="hidden" value={amount} />

          <SubmitButtonComponent text="Pay Now" topSpace />
          
        </Form>

      </section>

    </div>
  );
}
