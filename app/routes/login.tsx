import { Form, Link } from '@remix-run/react';
import InputComponent from '~/components/form/input.component';
import PasswordInputComponent from '~/components/form/password-input.component';
import SubmitButtonComponent from '~/components/form/submit-button.component';
import AuthH1Component from '~/components/header/auth-h1.component';
import AuthH2Component from '~/components/header/auth-h2.component';

export default function Login() {
  return (
    <div className="container py-dimen-xxxl">
      
      <Form className="auth-form">

        <AuthH1Component />

        <AuthH2Component text="Log in" />
        
        <InputComponent 
          id="email-address-input"
          label="Email address"
          name="email"
          type="email"
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

        <div className="text-center">
          <span>Don't have an account? </span>
          <Link to="/register" className="text-color-primary">Register</Link>
        </div>

      </Form>

    </div>
  );
}
