import { type ActionFunction, json, redirect, Response, type LoaderFunction } from '@remix-run/node';
import { Form, useLoaderData, useTransition } from '@remix-run/react';
import { useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import InputComponent from '~/components/form/input.component';
import SubmitButtonComponent from '~/components/form/submit-button.component';
import AccountH2Component from '~/components/header/account-h2.component';
import ProfileDLItemComponent from '~/components/list/profile-dl-item.component';
import useMoneyFormat from '~/hooks/money-format.hook';
import Transaction from '~/models/transaction.model';
import type PaystackFee from '~/models/paystack-fee.model';
import type ValidationError from '~/models/validation-error.model';
import { commitSession, getSession } from '~/server/session.server';
import TransactionApiService from '~/services/transaction-api.service';

type LoaderData = {
  amount: number;
  paystackFee: PaystackFee;
  errors: {
    form: string;
    amount: string;
  }
};

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get('Cookie'));

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
    errors: {
      form: session.get('formError'),
      amount: session.get('amountError'),
    }
  };

  return json<LoaderData>(data, {
    headers: {
      'Set-Cookie': await commitSession(session),
    },
  });
}

export const action: ActionFunction = async ({ request, params }) => {
  const session = await getSession(request.headers.get('Cookie'));

  const accessToken = session.get('accessToken');

  const form = await request.formData();

  const amount = form.get('amount')?.toString();

  const depositResponse = await TransactionApiService.deposit({ amount: Number(amount) }, accessToken);

  const url = new URL(request.url);

  let redirectTo = `${url.pathname}?amount=${amount}`;

  if (depositResponse.statusCode === 201) {
    const transaction = depositResponse.data as Transaction;

    const payUrlResponse = await TransactionApiService.initializePaystack({
      email: transaction.user.email,
      reference: transaction.reference,
      amount: transaction.total * 100,
      callback_url: `${request.url}-callback`,
    });

    if (payUrlResponse.statusCode === 200) {
      redirectTo = payUrlResponse.data.authorization_url;
    } else {
      session.flash('formError', 'Oops! An error occured.');
    }
    
  } else if (depositResponse.statusCode === 400) {
    const errors = depositResponse.data as ValidationError[];
    errors.forEach(item => session.flash(`${item.name}Error`, item.message));
  } else {
    session.flash('formError', 'Oops! An error occured.');
  }

  return redirect(redirectTo, {
    headers: {
      'Set-Cookie': await commitSession(session),
    },
  });
}

export default function FundWithPaystack() {
  const transition = useTransition();

  const moneyFormat = useMoneyFormat();
  
  const { paystackFee, amount, errors } = useLoaderData<LoaderData>();

  const fee = amount <= paystackFee.threshold 
    ? paystackFee.min 
    : paystackFee.max;

  useEffect(() => { 
    if (transition.state === 'idle' && errors.form !== undefined) { 
      toast.error(errors.form);
    }
  }, [errors.form, transition.state]);

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

          <fieldset disabled={transition.state !== 'idle'}>
            <InputComponent 
              id="" 
              label="" 
              name="amount" 
              type="hidden" 
              value={amount} 
              error={errors.amount} 
            />

            <SubmitButtonComponent text="Pay Now" topSpace />
          </fieldset>
          
        </Form>

      </section>

      <ToastContainer />

    </div>
  );
}
