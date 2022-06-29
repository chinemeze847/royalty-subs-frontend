import { type ActionFunction, type LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import ProfileUpdateFormComponent from "~/components/utils/profile-update-form.component";
import { userProfileAction, userProfileLoader } from "~/server/user-profile.server";

export const loader: LoaderFunction = ({ request }) => userProfileLoader(request);

export const action: ActionFunction = ({ request }) => userProfileAction(request, 'admin');

export default function Profile() {
  return (
    <ProfileUpdateFormComponent 
      data={useLoaderData()} 
    />
  );
}
