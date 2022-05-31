import { Form } from "@remix-run/react";
import InputComponent from "~/components/form/input.component";
import SubmitButtonComponent from "~/components/form/submit-button.component";
import AuthH1Component from "~/components/header/auth-h1.component";
import AuthH2Component from "~/components/header/auth-h2.component";

export default function ForgotPassword() {
  return (
    <div className="container py-dimen-xxxl">
      
      <Form className="auth-form">

        <AuthH1Component />

        <AuthH2Component text="Forgot password" />
        
        <InputComponent 
          id="email-address-input"
          label="Email address"
          name="email"
          type="email"
        />

        <SubmitButtonComponent text="Find my account" topSpace />

      </Form>

    </div>
  );
}
