import { Form } from "@remix-run/react";
import InputComponent from "~/components/form/input.component";
import SelectComponent from "~/components/form/select.component";
import SubmitButtonComponent from "~/components/form/submit-button.component";
import AccountH2Component from "~/components/header/account-h2.component";

const CodeItem = ({ src, alt, text }: { src: string; alt: string; text: string; }) => {
  return (
    <li className="mb-dimen-md">
      <div className="flex items-center gap-x-dimen-sm">
        <img src={`/images/${src}`} alt={alt} className="w-12 h-12 rounded-full" />
        <div className="font-bold">{ text }</div>
      </div>
    </li>
  );
}

export default function BuyData() {
  return (
    <div className="container">

      <AccountH2Component text="Buy Data" />

      <section className="lg:flex lg:gap-x-dimen-lg lg:justify-center">

        <Form className="account-form-2">

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
            id="data-value-input"
            name="data_value"
            label="Data value"
            options={[
              { text: '100MB', value: 1 },
              { text: '200MB', value: 2 },
              { text: '1GB', value: 3 },
              { text: '2GB', value: 4 },
            ]}
          />

          <InputComponent 
            id="amount-input" 
            name="amount" 
            label="Amount" 
            type="number" 
            value="0.00" 
            disabled 
          />

          <InputComponent 
            id="phone-number-input" 
            name="phone_number" 
            label="Phone number" 
            type="tel"
          />

          <SubmitButtonComponent text="Buy Now" topSpace />
          
        </Form>

        <div className="account-form-2-right">
          <h3 className="font-bold mb-dimen-md">Codes for Data Balance (SME)</h3>
          <ul>
            <CodeItem 
              alt="MTN"
              src="mtn.jpg"
              text="MTN (*388#)"
            />
            <CodeItem 
              alt="Airtel"
              src="airtel.png"
              text="Airtel (*388#)"
            />
            <CodeItem 
              alt="Glo"
              src="glo.jpg"
              text="Glo (*388#)"
            />
            <CodeItem 
              alt="9mobile"
              src="9mobile.jpg"
              text="9mobile (*388#)"
            />
          </ul>
        </div>
      </section>

    </div>
  );
}
