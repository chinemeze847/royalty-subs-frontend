import { redirect, type ActionFunction } from "@remix-run/node";
import { Form, useNavigate } from "@remix-run/react";
import AccountH2Component from "~/components/header/account-h2.component";
import { destroySession, getSession } from "~/session.server";

export const action: ActionFunction = async ({ request }) => {
  const session = await getSession(request.headers.get('Cookie'));
  return redirect('/login', {
    headers: {
      'Set-Cookie': await destroySession(session),
    },
  });
}

const FormButton = (
  { type, text, action }: 
  { type: 'button' | 'submit'; text: string; action?(): void }
) => {
  return (
    <button 
      type={type} 
      onClick={action}
      className={`
        bg-color-primary 
        font-bold 
        text-color-on-primary 
        px-dimen-xl 
        py-dimen-xs 
        rounded-lg 
        hover:bg-color-primary-variant
      `}
    >
      { text }
    </button>
  );
}

export default function Logout() {
  const navigate = useNavigate();

  return (
    <div className="container">

      <AccountH2Component text="Log out" />

      <div className="my-dimen-xxl account-form">

        <div className="mb-dimen-md font-bold text-lg">Are you sure you want to logout?</div>

        <div className="flex justify-between gap-x-dimen-md">
          <FormButton type="button" text="No" action={() => navigate(-1)} />
          <Form method="post">
            <FormButton type="submit" text="Yes" />
          </Form>
        </div>

      </div>

    </div>
  );
}
