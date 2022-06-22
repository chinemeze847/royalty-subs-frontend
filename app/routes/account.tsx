import { type LoaderFunction, redirect } from "@remix-run/node";
import { IoBulb, IoCall, IoCard, IoGrid, IoPricetags, IoTv, IoWifi } from "react-icons/io5";
import type { AccountMenuItem, SideBarItem } from "~/components/utils/layout.component";
import LayoutComponent from "~/components/utils/layout.component";
import { getSession } from "~/session.server";

const SIDE_BAR_ITEMS: SideBarItem[] = [
  { text: 'Dashboard', to: '', Icon: IoGrid },
  { text: 'Buy Data', to: 'buy-data', Icon: IoWifi },
  { text: 'Buy Airtime', to: 'buy-airtime', Icon: IoCall },
  { text: 'Electricity Payment', to: 'electricity-payment', Icon: IoBulb },
  { text: 'Cable Payment', to: 'cable-payment', Icon: IoTv },
  { text: 'Pricing', to: 'pricing', Icon: IoPricetags },
  { text: 'Transactions', to: 'transactions', Icon: IoCard },
];

const ACCOUNT_MENU_ITEMS: AccountMenuItem[] = [
  { to: 'profile', text: 'Profile' },
  { to: 'change-password', text: 'Change password' },
  { to: 'logout', text: 'Log out' },
];

export const loader: LoaderFunction = async ({ request }) => {
  const redirectTo = new URL(request.url).pathname;
  
  const session = await getSession(request.headers.get('Cookie'));

  if (!session.has('userId')) {
    const searchParams = new URLSearchParams([["redirectTo", redirectTo]]);
    throw redirect(`/login?${searchParams}`);
  }

  return null;
}

export default function Account() {

  return (
    <LayoutComponent 
      sideBarItems={SIDE_BAR_ITEMS} 
      accoutMenuItems={ACCOUNT_MENU_ITEMS} 
    />
  );
}
