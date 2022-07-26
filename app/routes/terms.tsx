import AccountH2Component from "~/components/header/account-h2.component";
import AuthH1Component from "~/components/header/auth-h1.component";

const TermItem = ({ head, body }: { head: string; body: string; }) => {
  return (
    <div className="shadow shadow-color-primary rounded-lg p-dimen-md mb-dimen-md">
      <dt className="font-bold text-lg mb-dimen-sm">{ head }</dt>
      <dd>{ body }</dd>
    </div>
  );
}

export default function Terms() {
  return (
    <>
      <header className="py-dimen-lg border-b mb-dimen-md">
        <AuthH1Component />
      </header>
      <main className="pb-dimen-xxxl">
        <div className="container">

          <AccountH2Component text="Terms of service" />

          <dl>

            <TermItem
              head="Issues and inquires" 
              body="The admin should be contacted if any issues arises while using the site, clients should always be patient while admin attends to complains." 
            />
            
            <TermItem
              head="Wallet funding" 
              body="Manual funding and automated funding are available, kindly send receipt to the admin when you fund manually." 
            />

            <TermItem
              head="Wallet funding fee" 
              body="Manual funding above NGN 10,000.00 will attract a charge of NGN 100.00." 
            />
            
            <TermItem
              head="Purchases and refunds" 
              body="Clients should make sure the correct no are inputed before sending airtime or data, there is no refund when you send Data or Airtime to a wrong no." 
            />
            
            <TermItem
              head="Security" 
              body="Clients are advise to always remember their log in password and also use strong password so as to avoid hacker." 
            />
       
          </dl>

        </div>
      </main>
    </>
  );
}
