import { Form, Link } from '@remix-run/react';
import CheckboxComponent from '~/components/form/checkbox.component';
import InputComponent from '~/components/form/input.component';
import PasswordInputComponent from '~/components/form/password-input.component';
import SubmitButtonComponent from '~/components/form/submit-button.component';
import AuthH1Component from '~/components/header/auth-h1.component';
import AuthH2Component from '~/components/header/auth-h2.component';

export default function Register() {
  return (
    <div className="container py-dimen-xxxl">
      
      <Form className="auth-form">

        <AuthH1Component />

        <AuthH2Component text="Register" />
     
        <InputComponent 
          id="first-name-input"
          label="First name"
          name="first_name"
        />

        <InputComponent 
          id="last-name-input"
          label="Last name"
          name="last_name"
        />
        
        <InputComponent 
          id="email-address-input"
          label="Email address"
          name="email"
          type="email"
        />

        <InputComponent 
          id="phone-number-input"
          label="Phone number"
          name="phone_number"
          type="tel"
        />
        
        <PasswordInputComponent 
          id="password-input"
          label="Password"
          name="password"
        />

        <CheckboxComponent 
          id="terms-input"
          name="terms"
          label="I Agree the"
          labelLink={{ to: '/terms', text: 'terms of service.' }}
        />

        <SubmitButtonComponent text="Register" />

        <div className="text-center">
          <span>Already have an account? </span>
          <Link to="/login" className="text-color-primary">Log in</Link>
        </div>

      </Form>

    </div>
  );
}
