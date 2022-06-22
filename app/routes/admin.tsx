import { redirect, type LoaderFunction } from "@remix-run/node";
import { IoBulb, IoCall, IoCard, IoCube, IoGrid, IoPerson, IoTv, IoWifi } from "react-icons/io5";
import type { AccountMenuItem, SideBarItem } from "~/components/utils/layout.component";
import LayoutComponent from "~/components/utils/layout.component";
import { getSession } from "~/session.server";

const SIDE_BAR_ITEMS: SideBarItem[] = [
  { text: 'Dashboard', to: '', Icon: IoGrid },
  { text: 'Users', to: 'users', Icon: IoPerson },
  { text: 'Products', to: 'products', Icon: IoCube },
  { text: 'Data', to: 'products/data', Icon: IoWifi },
  { text: 'Airtime', to: 'products/airtime', Icon: IoCall },
  { text: 'Electricity bill', to: 'products/electricity-bill', Icon: IoBulb },
  { text: 'Cable subscription', to: 'products/cable-subcription', Icon: IoTv },
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

  if (!session.has('userId') || !session.has('userIsAdmin')) {
    const searchParams = new URLSearchParams([["redirectTo", redirectTo]]);
    throw redirect(`/admin/login?${searchParams}`);
  }

  return null;
}

export default function Admin() {
  return (
    <LayoutComponent 
      sideBarItems={SIDE_BAR_ITEMS} 
      accoutMenuItems={ACCOUNT_MENU_ITEMS} 
    />
  );
}
