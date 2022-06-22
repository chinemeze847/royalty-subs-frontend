import { type ActionFunction, json, redirect, type LoaderFunction } from '@remix-run/node';
import { Form, Link, useLoaderData, useTransition } from '@remix-run/react';
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

  data: {
    email: string;
  };
};

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get('Cookie'));

  if (session.has('userId')) {
    return redirect('/account');
  }

  const data = { 
    errors: {
      auth: session.get('authError'),
    },
    data: {
      email: session.get('email'),
    }
  };

  return json<LoaderData>(data, {
    headers: {
      'Set-Cookie': await commitSession(session),
    },
  });
}

export const action: ActionFunction = async ({ request }) => {
  let redirectTo = '/login';

  const session = await getSession(request.headers.get('Cookie'));

  const form = await request.formData();
  const email = form.get('email')?.toString();
  const password = form.get('password')?.toString();

  const apiResponse = await AuthApiService.create({ email, password });

  if (apiResponse.status === 200) {
    const data = apiResponse.body.data;

    session.set('userId', data.userId);
    session.set('accessToken', data.accessToken);

    redirectTo = '/account';
  } else if (apiResponse.status === 401) {
    session.flash('email', email);
    session.flash('authError', 'Credentials are incorrect');
  }
  
  return redirect(redirectTo, {
    headers: {
      'Set-Cookie': await commitSession(session),
    },
  });
}

export default function Login() {
  const transition = useTransition();

  const { data, errors } = useLoaderData<LoaderData>();

  useEffect(() => { 
    if (errors.auth !== undefined) { 
      toast.error(errors.auth);
    }
  }, [errors.auth]);

  return (
    <main>
      { transition.state === 'loading' && <TopLoaderComponent /> }
    
      <div className="container py-dimen-xxxl">
        
        <Form className="auth-form" method="post" autoComplete="off">

          <AuthH1Component />

          <AuthH2Component text="Log in" />
          
          <fieldset disabled={transition.state === 'loading'}>

            <InputComponent 
              id="email-address-input"
              label="Email address"
              name="email"
              type="email"
              value={data.email}
            />
            
            <PasswordInputComponent 
              id="password-input"
              label="Password"
              name="password"
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

      <ToastContainer position={toast.POSITION.TOP_RIGHT} />
    </main>
  );
}
