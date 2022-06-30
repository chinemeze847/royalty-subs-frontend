import { json, type LoaderFunction, redirect, type ActionFunction } from '@remix-run/node';
import { Form, Link, useActionData, useLoaderData, useTransition } from '@remix-run/react';
import CheckboxComponent from '~/components/form/checkbox.component';
import InputComponent from '~/components/form/input.component';
import PasswordInputComponent from '~/components/form/password-input.component';
import SubmitButtonComponent from '~/components/form/submit-button.component';
import AuthH1Component from '~/components/header/auth-h1.component';
import AuthH2Component from '~/components/header/auth-h2.component';
import TopLoaderComponent from '~/components/loader/top-loader.component';
import type ValidationError from '~/models/validation-error.model';
import { commitSession, getSession } from '~/server/session.server';
import UserApiService from '~/services/user-api.service';

type LoaderData = {
  errors: {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
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
      firstName: session.get('firstNameError'),
      lastName: session.get('lastNameError'),
      email: session.get('emailError'),
      phoneNumber: session.get('phoneNumberError'),
      password: session.get('passwordError'),
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

  const form = await request.formData();
  const firstName = form.get('firstName')?.toString();
  const lastName = form.get('lastName')?.toString();
  const email = form.get('email')?.toString();
  const phoneNumber = form.get('phoneNumber')?.toString();
  const password = form.get('password')?.toString();

  const apiResponse = await UserApiService.create({ 
    firstName, 
    lastName, 
    email, 
    phoneNumber, 
    password 
  });

  if (apiResponse.statusCode === 201) {
    return redirect('/login');
  } else if (apiResponse.statusCode === 400) {
    const errors = apiResponse.data as ValidationError[];
    errors.forEach(item => session.flash(`${item.name}Error`, item.message));
  }
  
  return redirect('/register', {
    headers: {
      'Set-Cookie': await commitSession(session),
    },
  });
}

export default function Register() {
  const data = useActionData();
  
  const transition = useTransition();

  const { errors } = useLoaderData<LoaderData>();
  
  return (
    <main>
      <TopLoaderComponent />
    
      <div className="container py-dimen-xxxl">
        
        <Form className="auth-form" method="post" autoComplete="off">

          <AuthH1Component />

          <AuthH2Component text="Register" />

          <fieldset disabled={transition.state === 'loading'}>
      
            <InputComponent 
              id="first-name-input"
              label="First name"
              name="firstName"
              value={data?.firstName}
              error={errors.firstName}
            />

            <InputComponent 
              id="last-name-input"
              label="Last name"
              name="lastName"
              value={data?.lastName}
              error={errors.lastName}
            />
            
            <InputComponent 
              id="email-address-input"
              label="Email address"
              name="email"
              type="email"
              value={data?.email}
              error={errors.email}
            />

            <InputComponent 
              id="phone-number-input"
              label="Phone number"
              name="phoneNumber"
              type="tel"
              value={data?.phoneNumber}
              error={errors.phoneNumber}
            />
            
            <PasswordInputComponent 
              id="password-input"
              label="Password"
              name="password"
              value={data?.password}
              error={errors.password}
            />

            <CheckboxComponent 
              id="terms-input"
              name="terms"
              label="I Agree the"
              labelLink={{ to: '/terms', text: 'terms of service.' }}
            />

            <SubmitButtonComponent text="Register" />
          
          </fieldset>

          <div className="text-center">
            <span>Already have an account? </span>
            <Link to="/login" className="text-color-primary">Log in</Link>
          </div>

        </Form>

      </div>
    </main>
  );
}
