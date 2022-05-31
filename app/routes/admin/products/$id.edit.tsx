import { Form } from "@remix-run/react";
import CheckboxComponent from "~/components/form/checkbox.component";
import InputComponent from "~/components/form/input.component";
import SubmitButtonComponent from "~/components/form/submit-button.component";
import TextareaComponent from "~/components/form/textarea.component";
import AccountH2Component from "~/components/header/account-h2.component";

export default function ProductEdit() {
  return (
    <div className="container">

      <AccountH2Component text="Edit product" />

      <Form className="account-form">

        <InputComponent 
          id="name-input" 
          name="name" 
          label="Product name"
        />

        <TextareaComponent 
          id="description-input" 
          name="description" 
          label="Product description" 
        />

        <CheckboxComponent 
          id="availability-input"
          name="availability"
          label="Product availability"
        />

        <SubmitButtonComponent text="Edit" topSpace />
        
      </Form>

    </div>
  );
}
