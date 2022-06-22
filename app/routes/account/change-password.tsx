import { type ActionFunction, json, redirect, type LoaderFunction } from "@remix-run/node";
import { Form, useLoaderData, useTransition } from "@remix-run/react";
import { useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import PasswordInputComponent from "~/components/form/password-input.component";
import SubmitButtonComponent from "~/components/form/submit-button.component";
import AccountH2Component from "~/components/header/account-h2.component";
import type ValidationError from "~/models/validation-error.model";
import UserApiService from "~/services/user-api.service";
import { commitSession, getSession } from "~/session.server";

type LoaderData = {
  success: string;
  errors: {
    password: string;
    newPassword: string;
  };
};

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get('Cookie'));

  const data = { 
    success: session.get('success'),
    errors: {
      password: session.get('passwordError'),
      newPassword: session.get('newPasswordError'),
    }
  };

  return json<LoaderData>(data, {
    headers: {
      'Set-Cookie': await commitSession(session),
    },
  });
}

export const action: ActionFunction = async ({ request }) => {
  const session = await getSession(request.headers.get('Cookie'));

  const userId = session.get('userId');
  const accessToken = session.get('accessToken');

  const form = await request.formData();
  const password = form.get('password')?.toString();
  const newPassword = form.get('newPassword')?.toString();

  const apiResponse = await UserApiService.updatePassword(
    userId, { password, newPassword }, accessToken
  );

  if (apiResponse.status === 200) {
    session.flash('success', apiResponse.body.message);
  } else if (apiResponse.status === 400) {
    const errors = apiResponse.body.data as ValidationError[];
    errors.forEach(item => session.flash(`${item.name}Error`, item.message));
  }
  
  return redirect('/account/change-password', {
    headers: {
      'Set-Cookie': await commitSession(session),
    },
  });
}

export default function ChangePassword() {
  const transition = useTransition();

  const { errors, success } = useLoaderData<LoaderData>();

  useEffect(() => { 
    if (transition.state === 'idle' && success !== undefined) { 
      toast.success(success);
    }
  }, [success, transition.state]);

  return (
    <div className="container">

      <AccountH2Component text="Change password" />

      <Form className="account-form" method="post" autoComplete="off">

        <fieldset disabled={transition.state === 'loading'}>

          <PasswordInputComponent 
            id="password-input"
            label="Password"
            name="password"
            error={errors.password}
          />

          <PasswordInputComponent 
            id="new-password-input"
            label="New Password"
            name="newPassword"
            error={errors.newPassword}
          />

          <SubmitButtonComponent text="Change password" topSpace />

        </fieldset>

      </Form>

      <ToastContainer />

    </div>
  );
}
