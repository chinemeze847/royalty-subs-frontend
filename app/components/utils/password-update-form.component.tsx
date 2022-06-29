import { Form, useTransition } from '@remix-run/react';
import React, { useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import PasswordInputComponent from '~/components/form/password-input.component';
import SubmitButtonComponent from '~/components/form/submit-button.component';
import AccountH2Component from '~/components/header/account-h2.component';
import type { LoaderData } from '~/server/user-password.server';

export default function PasswordUpdateFormComponent(
  { data: { errors, success } }: { data: LoaderData }
) {
  const transition = useTransition();

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
