import { IoBulb, IoCall, IoCard, IoCube, IoGrid, IoPerson, IoTv, IoWifi } from "react-icons/io5";
import type { AccountMenuItem, SideBarItem } from "~/components/utils/layout.component";
import LayoutComponent from "~/components/utils/layout.component";

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
]

export default function Admin() {
  return (
    <LayoutComponent 
      sideBarItems={SIDE_BAR_ITEMS} 
      accoutMenuItems={ACCOUNT_MENU_ITEMS} 
    />
  );
}
