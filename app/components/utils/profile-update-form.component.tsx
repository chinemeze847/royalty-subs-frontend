import { Form, useTransition } from '@remix-run/react';
import { useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import InputComponent from '~/components/form/input.component';
import SubmitButtonComponent from '~/components/form/submit-button.component';
import AccountH2Component from '~/components/header/account-h2.component';
import type { LoaderData } from '~/server/user-profile.server';

export default function ProfileUpdateFormComponent(
  { data: { errors, user, success } }: { data: LoaderData }
) {
  const transition = useTransition();

  useEffect(() => { 
    if (transition.state === 'idle' && success !== undefined) { 
      toast.success(success);
    } else if (transition.state === 'idle' && errors.form !== undefined) { 
      toast.error(errors.form);
    }
  }, [success, errors.form, transition.state]);

  return (
    <div className="container">

      <AccountH2Component text="Profile" />

      <Form className="account-form" method="post" autoComplete="off">
     
        <fieldset disabled={transition.state === 'loading'}>

          <InputComponent 
            id="first-name-input"
            label="First name"
            name="firstName"
            value={user.firstName}
            error={errors.firstName}
          />

          <InputComponent 
            id="last-name-input"
            label="Last name"
            name="lastName"
            value={user.lastName}
            error={errors.lastName}
          />
          
          <InputComponent 
            id="email-address-input"
            label="Email address"
            name="email"
            type="email"
            value={user.email}
            error={errors.email}
          />

          <InputComponent 
            id="phone-number-input"
            label="Phone number"
            name="phoneNumber"
            type="tel"
            value={user.phoneNumber}
            error={errors.phoneNumber}
          />
          
          <SubmitButtonComponent text="Update profile" topSpace />

        </fieldset>

      </Form>

      <ToastContainer />

    </div>
  );
}
