import { json, type LoaderFunction, redirect, type ActionFunction } from '@remix-run/node';
import { Form, useActionData, useLoaderData, useTransition } from '@remix-run/react';
import React, { useEffect } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import InputComponent from '~/components/form/input.component';
import PasswordInputComponent from '~/components/form/password-input.component';
import SubmitButtonComponent from '~/components/form/submit-button.component';
import AuthH1Component from '~/components/header/auth-h1.component';
import AuthH2Component from '~/components/header/auth-h2.component';
import TopLoaderComponent from '~/components/loader/top-loader.component';
import type ValidationError from '~/models/validation-error.model';
import { commitSession, getSession } from '~/server/session.server';
import AuthApiService from '~/services/auth-api.service';

type LoaderData = {
  errors: {
    form: string;
    passwordResetToken: string;
    password: string;
  };
};

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get('Cookie'));

  if (session.has('userId')) {
    return redirect('/account');
  }

  const data = { 
    errors: {
      form: session.get('formError'),
      password: session.get('passwordError'),
      passwordResetToken: session.get('passwordResetTokenError'),
    }
  };

  return json<LoaderData>(data, {
    headers: {
      'Set-Cookie': await commitSession(session),
    },
  });
}

export const action: ActionFunction = async ({ request }) => {
  let redirectTo = new URL(request.url).pathname;

  const session = await getSession(request.headers.get('Cookie'));

  const form = await request.formData();
  const password = form.get('password')?.toString();
  const passwordResetToken = form.get('passwordResetToken')?.toString();

  const apiResponse = await AuthApiService.resetPassword({ password, passwordResetToken });

  if (apiResponse.statusCode === 200) {
    redirectTo = '/login';
  } else if (apiResponse.statusCode === 400) {
    const errors = apiResponse.data as ValidationError[];
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

export default function ResetPassword() {
  const data = useActionData();
  
  const transition = useTransition();

  const { errors } = useLoaderData<LoaderData>();

  useEffect(() => { 
    if (transition.state === 'idle' && errors.form !== undefined) { 
      toast.error(errors.form);
    }
  }, [errors.form, transition.state]);

  return (
    <main>
      <TopLoaderComponent />

      <div className="container py-dimen-xxxl">
        
        <Form className="auth-form" method="post" autoComplete="off">

          <AuthH1Component />

          <AuthH2Component text="Reset password" />

          <div className="mb-dimen-md text-gray text-sm">
            A password reset token has been sent to your email, 
            enter the token and a new password to complete resetting your password.
          </div>
          
          <fieldset disabled={transition.state === 'loading'}>

            <InputComponent 
              id="reset-token-input"
              label="Reset token"
              name="passwordResetToken"
              value={data?.passwordResetToken}
              error={errors.passwordResetToken}
            />

            <PasswordInputComponent 
              id="password-input"
              label="Password"
              name="password"
              value={data?.password}
              error={errors.password}
            />

            <SubmitButtonComponent text="Reset password" topSpace />

          </fieldset>

        </Form>

      </div>

      <ToastContainer />
    </main>
  );
}
