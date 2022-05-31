import { Form } from "@remix-run/react";
import InputComponent from "~/components/form/input.component";
import SelectComponent from "~/components/form/select.component";
import SubmitButtonComponent from "~/components/form/submit-button.component";
import AccountH2Component from "~/components/header/account-h2.component";

export default function BuyAirtime() {
  return (
    <div className="container">

      <AccountH2Component text="Buy Airtime" />

      <Form className="account-form">

        <SelectComponent 
          id="network-input"
          name="network"
          label="Network"
          options={[
            { text: 'MTN', value: 1 },
            { text: 'Glo', value: 2 },
            { text: 'Airtel', value: 3 },
            { text: '9mobile', value: 4 },
          ]}
        />

        <SelectComponent 
          id="amount-input"
          name="amount"
          label="Amount"
          options={[
            { text: 'NGN 100', value: 1 },
            { text: 'NGN 200', value: 2 },
            { text: 'NGN 1000', value: 3 },
            { text: 'NGN 2000', value: 4 },
          ]}
        />

        <InputComponent 
          id="phone-number-input" 
          name="phone_number" 
          label="Phone number" 
          type="tel"
        />

        <SubmitButtonComponent text="Buy Now" topSpace />
        
      </Form>
    </div>
  );
}
