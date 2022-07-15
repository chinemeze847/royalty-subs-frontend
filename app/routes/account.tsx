import { type LoaderFunction, redirect } from "@remix-run/node";
import { IoBulb, IoCall, IoCard, IoGrid, IoPeople, IoTv, IoWallet, IoWifi } from "react-icons/io5";
import type { AccountMenuItem, SideBarItem } from "~/components/utils/layout.component";
import LayoutComponent from "~/components/utils/layout.component";
import Product from "~/models/product.model";
import { getSession } from "~/server/session.server";

const SIDE_BAR_ITEMS: SideBarItem[] = [
  { text: 'Dashboard', to: '', Icon: IoGrid },
  { text: 'Fund wallet', to: 'fund-wallet', Icon: IoWallet },
  { text: 'Buy Data', to: `products/${Product.TYPE_DATA}`, Icon: IoWifi },
  { text: 'Buy Airtime', to: `products/${Product.TYPE_AIRTIME}`, Icon: IoCall },
  { text: 'Cable subscription', to: `products/${Product.TYPE_CABLE}`, Icon: IoTv },
  { text: 'Electricity bill', to: `products/${Product.TYPE_ELECTRICITY}`, Icon: IoBulb },
  { text: 'Referrals', to: 'referrals', Icon: IoPeople },
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
