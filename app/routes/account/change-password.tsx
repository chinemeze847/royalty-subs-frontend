import { type ActionFunction, type LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import PasswordUpdateFormComponent from "~/components/utils/password-update-form.component";
import { userPasswordAction, userPasswordLoader } from "~/server/user-password.server";

export const loader: LoaderFunction = ({ request }) => userPasswordLoader(request);

export const action: ActionFunction = ({ request }) => userPasswordAction(request, 'account');

export default function ChangePassword() {
  return (
    <PasswordUpdateFormComponent data={useLoaderData()} />
  );
}
