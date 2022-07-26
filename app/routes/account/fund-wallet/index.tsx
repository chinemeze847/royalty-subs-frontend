import { Form } from '@remix-run/react';
import InputComponent from '~/components/form/input.component';
import SubmitButtonComponent from '~/components/form/submit-button.component';
import AccountH2Component from '~/components/header/account-h2.component';
import ProfileDLItemComponent from '~/components/list/profile-dl-item.component';
import Transaction from '~/models/transaction.model';

export default function FundWallet() {
  return (
    <div className="container">

      <AccountH2Component text="Fund wallet" />

      <div className="font-bold mb-dimen-md bg-color-primary-variant p-dimen-xs rounded-lg">
        Note: Minimium deposit is NGN { Transaction.MINIMIUM_DEPOSIT_AMOUNT }
      </div>

      <section className="mb-20 lg:flex lg:gap-x-dimen-lg lg:justify-center lg:items-center lg:flex-wrap">

        <h3 className="w-full font-bold text-2xl">Paystack</h3>

        <Form className="account-form-2 flex-grow" action="paystack">

          <InputComponent 
            id="amount-input" 
            name="amount" 
            label="Amount" 
            type="number" 
            step="0.01"
            placeholder="0.00" 
            min={Transaction.MINIMIUM_DEPOSIT_AMOUNT}
          />

          <SubmitButtonComponent text="Continue" topSpace />
          
        </Form>

        <div className="hidden lg:account-form-2-right lg:block">
          <img src="/images/paystack.png" alt="Paystack" className="w-full rounded-lg" />
        </div>

      </section>

      <section>

        <h3 className="w-full font-bold text-2xl">Manual bank funding</h3>

        <div className="mx-auto rounded-lg shadow p-dimen-md my-dimen-lg">

          <dl>
            <ProfileDLItemComponent heading="Bank name" body="Guaranteed Trust Bank" />
            <ProfileDLItemComponent heading="Account name" body="Samuel Onuegbu I" />
            <ProfileDLItemComponent heading="Account number" body="0171752110" />
            <ProfileDLItemComponent heading="Account type" body="Savings" />
          </dl>

          <div className="font-bold text-color-primary">
            Transfer money to the above bank account and send your proof of payment to our WhatsApp support.
          </div>
          
        </div>

      </section>

    </div>
  );
}
