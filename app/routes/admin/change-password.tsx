import { Form } from "@remix-run/react";
import PasswordInputComponent from "~/components/form/password-input.component";
import SubmitButtonComponent from "~/components/form/submit-button.component";
import AccountH2Component from "~/components/header/account-h2.component";

export default function ChangePassword() {
  return (
    <div className="container">

      <AccountH2Component text="Change password" />

      <Form className="account-form">

        <PasswordInputComponent 
          id="password-input"
          label="Password"
          name="password"
        />

        <PasswordInputComponent 
          id="new-password-input"
          label="New Password"
          name="new_password"
        />

        <SubmitButtonComponent text="Change password" topSpace />

      </Form>

    </div>
  );
}
