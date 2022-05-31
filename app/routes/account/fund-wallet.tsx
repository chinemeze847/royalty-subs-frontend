import { Form } from "@remix-run/react";
import InputComponent from "~/components/form/input.component";
import SubmitButtonComponent from "~/components/form/submit-button.component";
import AccountH2Component from "~/components/header/account-h2.component";

export default function FundWallet() {
  return (
    <div className="container">

      <AccountH2Component text="Fund wallet" />

      <section className="lg:flex lg:gap-x-dimen-lg lg:justify-center lg:mt-dimen-xxxl">

        <Form className="account-form-2 flex-grow">

          <InputComponent 
            id="amount-input" 
            name="amount" 
            label="Amount" 
            type="number" 
            value="0.00" 
            step="0.001"
          />

          <SubmitButtonComponent text="Pay Now" topSpace />
          
        </Form>

        <div className="account-form-2-right">
          <img src="/images/paystack.png" alt="Paystack" className="w-full rounded-lg" />
        </div>

      </section>

    </div>
  );
}
