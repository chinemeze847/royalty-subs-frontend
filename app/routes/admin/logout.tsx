import { Form } from "@remix-run/react";
import AccountH2Component from "~/components/header/account-h2.component";

const FormButton = ({ type, text }: { type: 'button' | 'submit'; text: string }) => {
  return (
    <button 
      type={type} 
      className="bg-color-primary font-bold text-color-on-primary px-dimen-xl py-dimen-xs rounded-lg hover:bg-color-primary-variant"
    >
      { text }
    </button>
  );
}

export default function Logout() {
  return (
    <div className="container">

      <AccountH2Component text="Log out" />

      <Form className="my-dimen-xxl account-form">

        <div className="mb-dimen-md font-bold text-lg">Are you sure you want to logout?</div>

        <div className="flex justify-between gap-x-dimen-md">
          <FormButton type="button" text="No" />
          <FormButton type="submit" text="Yes" />
        </div>

      </Form>

    </div>
  );
}
