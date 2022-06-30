import { json, type LoaderFunction } from '@remix-run/node';
import { Form, useTransition } from '@remix-run/react';
import InputComponent from '~/components/form/input.component';
import SelectComponent from '~/components/form/select.component';
import SubmitButtonComponent from '~/components/form/submit-button.component';
import AccountH2Component from '~/components/header/account-h2.component';
import type User from '~/models/user.model';
import { getSession } from '~/server/session.server';
import UserApiService from '~/services/user-api.service';

type LoaderData = { user: User };

export const loader: LoaderFunction = async ({ request, params }) => {
  const session = await getSession(request.headers.get('Cookie'));

  const accessToken = session.get('accessToken');

  const apiResponse = await UserApiService.readOne(params.id as string, accessToken);

  return json<LoaderData>({ user: apiResponse.body.data });
}

export default function UserProfileEdit() {
  const transition = useTransition();

  return (
    <div className="container">

      <AccountH2Component text="Edit user" />

      <Form className="account-form" method="post" autoComplete="off">
     
        <fieldset disabled={transition.state === 'loading'}>

          <SelectComponent 
            id="status-input"
            label="Status"
            name="status"
            options={[]}
          />
          
          <SubmitButtonComponent text="Update status" topSpace />

        </fieldset>

      </Form>

      <Form className="account-form" method="post" autoComplete="off">
     
        <fieldset disabled={transition.state === 'loading'}>

          <InputComponent 
            id="deposit-input"
            label="Deposit"
            name="amount"
            type="number"
            step="0.01"
          />
          
          <SubmitButtonComponent text="Fund user" topSpace />

        </fieldset>

      </Form>
    </div>
  );
}
