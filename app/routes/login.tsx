import { type ActionFunction, json, redirect, type LoaderFunction } from '@remix-run/node';
import { Form, Link, useActionData, useLoaderData, useLocation, useTransition } from '@remix-run/react';
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import InputComponent from '~/components/form/input.component';
import PasswordInputComponent from '~/components/form/password-input.component';
import SubmitButtonComponent from '~/components/form/submit-button.component';
import AuthH1Component from '~/components/header/auth-h1.component';
import AuthH2Component from '~/components/header/auth-h2.component';
import TopLoaderComponent from '~/components/loader/top-loader.component';
import AuthApiService from '~/services/auth-api.service';
import { commitSession, getSession } from '~/server/session.server';
import type AuthPermissionError from '~/models/auth-permission-error.model';
import type Auth from '~/models/auth.model';

type LoaderData = {
  errors: {
    auth: string;
  };
};

export const loader: LoaderFunction = async ({ request }) => {
  const queryParams = new URL(request.url).searchParams;
  const session = await getSession(request.headers.get('Cookie'));

  if (session.has('accessToken')) {
    return redirect(queryParams.get('redirectTo') ?? '/account');
  }

  const data = { 
    errors: {
      auth: session.get('authError'),
    }
  };

  return json<LoaderData>(data, {
    headers: {
      'Set-Cookie': await commitSession(session),
    },
  });
}

export const action: ActionFunction = async ({ request }) => {
  let redirectTo = request.url;
  
  const queryParams = new URL(request.url).searchParams;

  const session = await getSession(request.headers.get('Cookie'));

  const form = await request.formData();
  const email = form.get('email')?.toString();
  const password = form.get('password')?.toString();

  const apiResponse = await AuthApiService.create({ email, password });

  if (apiResponse.statusCode === 200) {
    const data = apiResponse.data as Auth;

    session.set('userId', data.userId);
    session.set('accessToken', data.accessToken);

    redirectTo = queryParams.get('redirectTo') ?? '/account';
  } else if (apiResponse.statusCode === 401) {
    session.flash('authError', 'Credentials are incorrect');
  } else if (apiResponse.statusCode === 403) {
    const errorData = apiResponse.data as AuthPermissionError;

    if (errorData.errorCode === 'ACCOUNT_EMAIL_UNVERIFIED') {
      session.set('userId', errorData.userId);
      redirectTo = `/verify-email?${queryParams.toString()}`;
    } else if (errorData.errorCode === 'ACCOUNT_DEACTIVATED') {
      session.flash('authError', 'Sorry, your account has been deactivated. Please contact support.');
    }
  } else {
    session.flash('authError', 'Oops! An error occured.');
  }
  
  return redirect(redirectTo, {
    headers: {
      'Set-Cookie': await commitSession(session),
    },
  });
}

export default function Login() {
  const location = useLocation();

  const transition = useTransition();

  const data = useActionData();

  const { errors } = useLoaderData<LoaderData>();

  useEffect(() => { 
    if (transition.state === 'idle' && errors.auth !== undefined) { 
      toast.error(errors.auth);
    }
  }, [errors.auth, transition.state]);

  return (
    <main>
      <TopLoaderComponent />
    
      <div className="container py-dimen-xxxl">
        
        <Form 
          method="post" 
          autoComplete="off"
          className="auth-form" 
          action={`${location.pathname}${location.search}`} 
        >

          <AuthH1Component />

          <AuthH2Component text="Log in" />
          
          <fieldset disabled={transition.state !== 'idle'}>

            <InputComponent 
              id="email-address-input"
              label="Email address"
              name="email"
              type="email"
              value={data?.email}
            />
            
            <PasswordInputComponent 
              id="password-input"
              label="Password"
              name="password"
              value={data?.password}
            />

            <div className="mb-dimen-sm">
              <Link to="/forgot-password" className="text-color-primary">Forgot password?</Link>
            </div>

            <SubmitButtonComponent text="Log in" />

          </fieldset>

          <div className="text-center">
            <span>Don't have an account? </span>
            <Link to="/register" className="text-color-primary">Register</Link>
          </div>

        </Form>

      </div>

      <ToastContainer />
    </main>
  );
}
