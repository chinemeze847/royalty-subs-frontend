import { json, redirect, type ActionFunction, type LoaderFunction } from "@remix-run/node";
import { Form, useLoaderData, useTransition } from "@remix-run/react";
import InputComponent from "~/components/form/input.component";
import SubmitButtonComponent from "~/components/form/submit-button.component";
import AccountH2Component from "~/components/header/account-h2.component";
import type User from "~/models/user.model";
import type ValidationError from "~/models/validation-error.model";
import UserApiService from "~/services/user-api.service";
import { commitSession, getSession } from "~/session.server";
import { ToastContainer, toast } from 'react-toastify';
import { useEffect } from "react";

type LoaderData = {
  user: User;
  success: string;
  errors: {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
  };
};

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get('Cookie'));

  const userId = session.get('userId');
  const accessToken = session.get('accessToken');

  const apiResponse = await UserApiService.readOne(userId, accessToken);

  const data = { 
    user: apiResponse.body.data,
    success: session.get('success'),
    errors: {
      firstName: session.get('firstNameError'),
      lastName: session.get('lastNameError'),
      email: session.get('emailError'),
      phoneNumber: session.get('phoneNumberError'),
    }
  };

  return json<LoaderData>(data, {
    headers: {
      'Set-Cookie': await commitSession(session),
    },
  });
}

export const action: ActionFunction = async ({ request, context }) => {
  const session = await getSession(request.headers.get('Cookie'));

  const userId = session.get('userId');
  const accessToken = session.get('accessToken');

  const userResponse = await UserApiService.readOne(userId, accessToken);

  const user = userResponse.body.data;

  const form = await request.formData();
  const firstName = form.get('firstName')?.toString();
  const lastName = form.get('lastName')?.toString();
  const email = form.get('email')?.toString();
  const phoneNumber = form.get('phoneNumber')?.toString();

  const apiResponse = await UserApiService.update(
    userId, 
    {
      email: user.email !== email ? email : undefined,
      lastName: user.lastName !== lastName ? lastName : undefined,
      firstName: user.firstName !== firstName ? firstName : undefined,
      phoneNumber: user.phoneNumber !== phoneNumber ? phoneNumber : undefined,
    }, 
    accessToken
  );

  if (apiResponse.status === 200) {
    session.flash('success', apiResponse.body.message);
  } else if (apiResponse.status === 400) {
    const errors = apiResponse.body.data as ValidationError[];
    errors.forEach(item => session.flash(`${item.name}Error`, item.message));
  }
  
  return redirect('/account/profile', {
    headers: {
      'Set-Cookie': await commitSession(session),
    },
  });
}

export default function Profile() {
  const transition = useTransition();

  const { errors, user, success } = useLoaderData<LoaderData>();

  useEffect(() => { 
    if (transition.state === 'idle' && success !== undefined) { 
      toast.success(success);
    }
  }, [success, transition.state]);

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
