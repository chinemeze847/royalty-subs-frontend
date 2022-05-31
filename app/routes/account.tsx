import { IoBulb, IoCall, IoCard, IoGrid, IoPricetags, IoTv, IoWifi } from "react-icons/io5";
import type { AccountMenuItem, SideBarItem } from "~/components/utils/layout.component";
import LayoutComponent from "~/components/utils/layout.component";

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
]

export default function Account() {

  return (
    <LayoutComponent 
      sideBarItems={SIDE_BAR_ITEMS} 
      accoutMenuItems={ACCOUNT_MENU_ITEMS} 
    />
  );
}
