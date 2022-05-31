import { Form } from "@remix-run/react";
import InputComponent from "~/components/form/input.component";
import SelectComponent from "~/components/form/select.component";
import SubmitButtonComponent from "~/components/form/submit-button.component";
import AccountH2Component from "~/components/header/account-h2.component";

export default function CablePayment() {
  return (
    <div className="container">

    <AccountH2Component text="Cable Payment" />

    <Form className="account-form">

      <SelectComponent 
        id="cable-input"
        name="cable"
        label="Cable name"
        options={[
          { text: 'GOTV', value: 1 },
          { text: 'DSTV', value: 2 },
        ]}
      />

      <InputComponent 
        id="card-input" 
        name="card_number" 
        label="Smart card / IUC number" 
      />

      <SelectComponent 
        id="cable-plan-input"
        name="cable_plan"
        label="Cable plan"
        options={[
          { text: 'Max', value: 1 },
          { text: 'Mini', value: 2 },
        ]}
      />

      <InputComponent 
        id="amount-input" 
        name="amount" 
        label="Amount" 
        type="number"
        value="0.00"
        step="0.01"
        disabled
      />

      <SubmitButtonComponent text="Buy Now" topSpace />
      
    </Form>
  </div>
  );
}
