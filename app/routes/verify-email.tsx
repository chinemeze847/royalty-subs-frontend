import { type ActionFunction, json, redirect, type LoaderFunction } from "@remix-run/node";
import { Form, useLoaderData, useLocation, useTransition } from "@remix-run/react";
import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import InputComponent from "~/components/form/input.component";
import SubmitButtonComponent from "~/components/form/submit-button.component";
import AuthH1Component from "~/components/header/auth-h1.component";
import AuthH2Component from "~/components/header/auth-h2.component";
import TopLoaderComponent from "~/components/loader/top-loader.component";
import type ValidationError from "~/models/validation-error.model";
import { commitSession, getSession } from "~/server/session.server";
import UserApiService from "~/services/user-api.service";

type LoaderData = {
  success: string;
  errors: {
    form: string;
    token: string;
  };
};

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get('Cookie'));

  if (!session.has('userId')) {
    return redirect('/login');
  }

  const data = { 
    success: session.get('success'),
    errors: {
      form: session.get('formError'),
      token: session.get('emailVerificationTokenError'),
    },
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

  const userId = session.get('userId');

  const form = await request.formData();
  const resend = form.get('resend')?.toString();
  const emailVerificationToken = form.get('emailVerificationToken')?.toString();

  if (resend !== undefined) {
    const resendResponse = await UserApiService.updateEmailVerificationToken(userId);

    if (resendResponse.statusCode === 200) {
      session.flash('success', resendResponse.message);
    } else {
      session.flash('formError', 'Oops! An error occured.');
    }

  } else if (emailVerificationToken !== undefined) {
    const verifyResponse = await UserApiService.updateEmailVerified(
      userId, 
      { emailVerificationToken },
    );

    if (verifyResponse.statusCode === 200) {
      redirectTo = `/login?${queryParams.toString()}`;
    } else if (verifyResponse.statusCode === 400) {
      const errors = verifyResponse.data as ValidationError[];
      errors.forEach(item => session.flash(`${item.name}Error`, item.message));
    } else {
      session.flash('formError', 'Oops! An error occured.');
    }
  }

  return redirect(redirectTo, {
    headers: {
      'Set-Cookie': await commitSession(session),
    },
  });
}

export default function VerifyEmail() {
  const location = useLocation();

  const transition = useTransition();

  const { errors, success } = useLoaderData<LoaderData>();

  useEffect(() => { 
    if (transition.state === 'idle' && success !== undefined) { 
      toast.success(success);
    } else if (transition.state === 'idle' && errors.form !== undefined) { 
      toast.error(errors.form);
    }
  }, [success, errors.form, transition.state]);

  return (
    <main>
      <TopLoaderComponent />
    
      <div className="container py-dimen-xxxl">
        
        <div className="auth-form">
          <Form 
            method="post" 
            autoComplete="off"
            action={`${location.pathname}${location.search}`} 
          >

            <AuthH1Component />

            <AuthH2Component text="Verify email" />
            
            <fieldset disabled={transition.state !== 'idle'}>

              <InputComponent 
                id="email-verification-token-input"
                label="Verification token"
                name="emailVerificationToken"
                error={errors.token}
              />
              
              <SubmitButtonComponent text="Verify" />

            </fieldset>

          </Form>

          <Form 
            method="post" 
            className="text-center my-dimen-md"
            action={`${location.pathname}${location.search}`} 
          >
            <button 
              name="resend"
              type="submit"
              className="font-bold bg-color-background rounded-lg p-dimen-xs"
            >
              Resend verification token
            </button>
          </Form>
        </div>
      </div>

      <ToastContainer />
    </main>
  );
}
