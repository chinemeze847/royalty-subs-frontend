import { Form, useTransition } from '@remix-run/react';
import InputComponent from '~/components/form/input.component';
import SubmitButtonComponent from '~/components/form/submit-button.component';
import AccountH2Component from '~/components/header/account-h2.component';
import ProfileDLItemComponent from '~/components/list/profile-dl-item.component';
import Transaction from '~/models/transaction.model';

export default function FundWallet() {
  const transition = useTransition();

  return (
    <div className="container">

      <AccountH2Component text="Fund wallet" />

      <div className="font-bold mb-dimen-md bg-color-primary-variant p-dimen-xs rounded-lg">
        Note: Minimium deposit is NGN { Transaction.MINIMIUM_DEPOSIT_AMOUNT }
      </div>

      <section className="mb-20 lg:flex lg:gap-x-dimen-lg lg:justify-center lg:items-center lg:flex-wrap">

        <h3 className="w-full font-bold text-2xl">Paystack</h3>

        <Form className="account-form-2 flex-grow" action="paystack">

          <fieldset disabled={transition.state !== 'idle'}>
            
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
            
          </fieldset>
          
        </Form>

        <div className="hidden lg:account-form-2-right lg:block">
          <img src="/images/paystack.png" alt="Paystack" className="w-full rounded-lg" />
        </div>

      </section>

      <section>

        <h3 className="w-full font-bold text-2xl mb-dimen-md">Manual funding</h3>

        <div className="font-bold text-color-primary">
          Transfer money to the any of these bank accounts and send your proof of payment to our WhatsApp support. 
          <br/>
          Note: Manual funding above NGN 10,000.00 will attract a charge of NGN 100.00.
        </div>

        <div className="mx-auto rounded-lg shadow p-dimen-md my-dimen-lg lg:flex lg:gap-x-dimen-md lg:items-center">

          <dl className="flex-grow">
            <ProfileDLItemComponent heading="Bank name" body="Guaranteed Trust Bank" />
            <ProfileDLItemComponent heading="Account name" body="Samuel Onuegbu I" />
            <ProfileDLItemComponent heading="Account number" body="0171752110" />
            <ProfileDLItemComponent heading="Account type" body="Savings" />
          </dl>

          <div className="font-bold my-dimen-lg text-center bg-color-background rounded-lg p-dimen-sm">OR</div>

          <dl className="flex-grow">
            <ProfileDLItemComponent heading="Bank name" body="Access (Diamond) Bank" />
            <ProfileDLItemComponent heading="Account name" body="Samuel Onuegbu I" />
            <ProfileDLItemComponent heading="Account number" body="0044719501" />
            <ProfileDLItemComponent heading="Account type" body="Savings" />
          </dl>

        </div>

      </section>

    </div>
  );
}
