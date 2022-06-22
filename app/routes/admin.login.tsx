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
import { commitSession, getSession } from '~/session.server';

type LoaderData = {
  errors: {
    auth: string;
  };
};

export const loader: LoaderFunction = async ({ request }) => {
  const queryParams = new URL(request.url).searchParams;
  const session = await getSession(request.headers.get('Cookie'));

  if (session.has('userId') && session.has('userIsAdmin')) {
    return redirect(queryParams.get('redirectTo') ?? '/admin');
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

  if (apiResponse.status === 200) {
    const data = apiResponse.body.data;

    if (data.userIsAdmin) {
      session.set('userId', data.userId);
      session.set('accessToken', data.accessToken);
      session.set('userIsAdmin', data.userIsAdmin);

      redirectTo = queryParams.get('redirectTo') ?? '/admin';
    } else {
      session.flash('authError', 'Credentials are do not have admin permissions');
    }
  } else if (apiResponse.status === 401) {
    session.flash('authError', 'Credentials are incorrect');
  }
  
  return redirect(redirectTo, {
    headers: {
      'Set-Cookie': await commitSession(session),
    },
  });
}

export default function AdminLogin() {
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

          <AuthH2Component text="Admin Log in" />
          
          <fieldset disabled={transition.state === 'loading'}>

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

        </Form>

      </div>

      <ToastContainer />
    </main>
  );
}
