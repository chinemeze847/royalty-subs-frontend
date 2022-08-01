import { Form, useNavigate } from '@remix-run/react';
import OptionButtonComponent from '~/components/form/option-button.component';
import AccountH2Component from '~/components/header/account-h2.component';

export default function LogoutFormComponent() {
  const navigate = useNavigate();

  return (
    <div className="container">

      <AccountH2Component text="Log out" />

      <div className="my-dimen-xxl account-form">

        <div className="mb-dimen-md font-bold text-lg">Are you sure you want to logout?</div>

        <div className="flex justify-between gap-x-dimen-md">
          <OptionButtonComponent type="button" text="No" action={() => navigate(-1)} />
          <Form method="post" className="flex flex-grow">
            <OptionButtonComponent type="submit" text="Yes" />
          </Form>
        </div>

      </div>

    </div>
  );
}
