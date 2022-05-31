import AccountH2Component from "~/components/header/account-h2.component";
import AuthH1Component from "~/components/header/auth-h1.component";

const TermItem = () => {
  return (
    <div className="shadow shadow-color-primary rounded-lg p-dimen-md mb-dimen-md">
      <dt className="font-bold text-lg mb-dimen-sm">Introduction</dt>
      <dd>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
        Doloremque perspiciatis cumque, quibusdam minus sequi corporis tempora quos ab illum iure 
        error provident odit excepturi illo architecto ex saepe debitis blanditiis!
      </dd>
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
            <TermItem />
            <TermItem />
            <TermItem />
            <TermItem />
            <TermItem />
            <TermItem />
          </dl>

        </div>
      </main>
    </>
  );
}
