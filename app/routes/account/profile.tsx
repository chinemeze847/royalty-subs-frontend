import { Form } from "@remix-run/react";
import InputComponent from "~/components/form/input.component";
import SubmitButtonComponent from "~/components/form/submit-button.component";
import AccountH2Component from "~/components/header/account-h2.component";

export default function Profile() {
  return (
    <div className="container">

      <AccountH2Component text="Profile" />

      <Form className="account-form">
     
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
        
        <SubmitButtonComponent text="Update profile" topSpace />

      </Form>

    </div>
  );
}
