import { Form } from "@remix-run/react";
import InputComponent from "~/components/form/input.component";
import SelectComponent from "~/components/form/select.component";
import SubmitButtonComponent from "~/components/form/submit-button.component";
import AccountH2Component from "~/components/header/account-h2.component";

export default function ElectricityPayment() {
  return (
    <div className="container">

      <AccountH2Component text="Electricity Payment" />

      <Form className="flex-grow lg:shadow lg:p-dimen-md">

        <SelectComponent 
          id="company-input"
          name="company"
          label="Distribution company"
          options={[
            { text: 'PHED', value: 1 },
            { text: 'EECD', value: 2 },
          ]}
        />

        <InputComponent 
          id="meter-number-input" 
          name="meter_number" 
          label="Meter number" 
          type="number"
        />

        <SelectComponent 
          id="meter-type-input"
          name="meter_type"
          label="Meter type"
          options={[
            { text: 'Good', value: 1 },
            { text: 'Bad', value: 2 },
          ]}
        />

        <InputComponent 
          id="amount-input" 
          name="amount" 
          label="Amount" 
          type="number"
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
