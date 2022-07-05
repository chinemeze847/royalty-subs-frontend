import { type ActionFunction, json, redirect, type LoaderFunction } from "@remix-run/node";
import { Form, useActionData, useLoaderData, useTransition } from "@remix-run/react";
import InputComponent from "~/components/form/input.component";
import SubmitButtonComponent from "~/components/form/submit-button.component";
import AuthH1Component from "~/components/header/auth-h1.component";
import AuthH2Component from "~/components/header/auth-h2.component";
import TopLoaderComponent from "~/components/loader/top-loader.component";
import type ValidationError from "~/models/validation-error.model";
import { commitSession, getSession } from "~/server/session.server";
import AuthApiService from "~/services/auth-api.service";

type LoaderData = {
  errors: {
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
      email: session.get('emailError'),
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
  const email = form.get('email')?.toString();

  const apiResponse = await AuthApiService.forgotPassword({ email });

  if (apiResponse.statusCode === 200) {
    redirectTo = '/reset-password';
  } else if (apiResponse.statusCode === 400) {
    const errors = apiResponse.data as ValidationError[];
    errors.forEach(item => session.flash(`${item.name}Error`, item.message));
  }
  
  return redirect(redirectTo, {
    headers: {
      'Set-Cookie': await commitSession(session),
    },
  });
}

export default function ForgotPassword() {
  const data = useActionData();
  
  const transition = useTransition();

  const { errors } = useLoaderData<LoaderData>();

  return (
    <main>
      <TopLoaderComponent />

      <div className="container py-dimen-xxxl">
        
        <Form className="auth-form" method="post" autoComplete="off">

          <AuthH1Component />

          <AuthH2Component text="Forgot password" />
          
          <fieldset disabled={transition.state === 'loading'}>

            <InputComponent 
              id="email-address-input"
              label="Email address"
              name="email"
              type="email"
              value={data?.email}
              error={errors.email}
            />

            <SubmitButtonComponent text="Find my account" topSpace />

          </fieldset>

        </Form>

      </div>
      
    </main>
  );
}
