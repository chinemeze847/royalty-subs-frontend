import { type ActionFunction, json, type LoaderFunction, redirect, Response } from '@remix-run/node';
import { Form, useLoaderData, useTransition } from '@remix-run/react';
import { useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import InputComponent from '~/components/form/input.component';
import SelectComponent from '~/components/form/select.component';
import SubmitButtonComponent from '~/components/form/submit-button.component';
import AccountH2Component from '~/components/header/account-h2.component';
import type ResponseDto from '~/models/response-dto.model';
import User from '~/models/user.model';
import type ValidationError from '~/models/validation-error.model';
import { commitSession, getSession } from '~/server/session.server';
import TransactionApiService from '~/services/transaction-api.service';
import UserApiService from '~/services/user-api.service';

type LoaderData = { 
  user: User,
  success: string;
  errors: {
    form: string;
    status: string;
    admin: string;
    amount: string;
  };
};

export const loader: LoaderFunction = async ({ request, params }) => {
  const session = await getSession(request.headers.get('Cookie'));

  const accessToken = session.get('accessToken');

  const apiResponse = await UserApiService.readOne(params.id as string, accessToken);

  if (apiResponse.statusCode !== 200) {
    throw new Response('Error', { status: apiResponse.statusCode });
  }

  const data = { 
    user: apiResponse.data, 
    success: session.get('success'), 
    errors: {
      form: session.get('formError'),
      status: session.get('statusError'),
      admin: session.get('adminError'),
      amount: session.get('amountError'),
    },
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
  const status = form.get('status')?.toString();
  const admin = form.get('admin')?.toString();
  const amount = form.get('amount')?.toString();

  let apiResponse: ResponseDto<any> | null = null;

  if (status !== undefined) {
    apiResponse = await UserApiService.updateStatus(
      params.id as string, 
      { status }, 
      accessToken
    );
  } else if (admin !== undefined) {
    apiResponse = await UserApiService.updateAdmin(
      params.id as string, 
      { admin: admin === 'true' }, 
      accessToken
    );
  } else if (amount !== undefined) {
    apiResponse = await TransactionApiService.adminDeposit({ 
      userId: Number(params.id), 
      amount: Number(amount),
    }, accessToken);
  }

  if (apiResponse !== null) {
    if (apiResponse.statusCode === 200 || apiResponse.statusCode === 201) {
      session.flash('success', apiResponse.message);
    } else if (apiResponse.statusCode === 400) {
      const errors = apiResponse.data as ValidationError[];
      errors.forEach(item => session.flash(`${item.name}Error`, item.message));
    } else {
      session.flash('formError', 'Oops! An error occured.');
    }
  }

  return redirect(new URL(request.url).pathname, {
    headers: {
      'Set-Cookie': await commitSession(session),
    },
  });
}

export default function UserProfileEdit() {
  const transition = useTransition();

  const { user, errors, success } = useLoaderData<LoaderData>();

  useEffect(() => { 
    if (transition.state === 'idle' && success !== undefined) { 
      toast.success(success);
    } else if (transition.state === 'idle' && errors.form !== undefined) { 
      toast.error(errors.form);
    }
  }, [success, errors.form, transition.state]);

  return (
    <div className="container">

      <AccountH2Component text="Edit user" />

      <Form className="account-form" method="post" autoComplete="off">
     
        <fieldset disabled={transition.state !== 'idle'}>

          <SelectComponent 
            id="status-input"
            label="Status"
            name="status"
            value={user.status}
            error={errors.status}
            options={User.getStatuses().map(item => ({ text: item, value: item }))}
          />
          
          <SubmitButtonComponent text="Update status" topSpace />

        </fieldset>

      </Form>

      <Form className="account-form" method="post" autoComplete="off">
     
        <fieldset disabled={transition.state !== 'idle'}>

          <SelectComponent 
            id="admin-input"
            label="Admin"
            name="admin"
            value={user.admin}
            error={errors.admin}
            options={[ 
              { text: 'Yes', value: true },
              { text: 'No', value: false }
            ]}
          />
          
          <SubmitButtonComponent text="Update admin" topSpace />

        </fieldset>

      </Form>

      <Form className="account-form" method="post" autoComplete="off">
     
        <fieldset disabled={transition.state !== 'idle'}>

          <InputComponent 
            id="deposit-input"
            label="Deposit"
            name="amount"
            type="number"
            step="0.01"
            error={errors.amount}
          />
          
          <SubmitButtonComponent text="Fund user" topSpace />

        </fieldset>

      </Form>

      <ToastContainer />
    </div>
  );
}
