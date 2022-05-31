import { IoCube, IoGrid, IoPerson } from "react-icons/io5";
import type { AccountMenuItem, SideBarItem } from "~/components/utils/layout.component";
import LayoutComponent from "~/components/utils/layout.component";

const SIDE_BAR_ITEMS: SideBarItem[] = [
  { text: 'Dashboard', to: '', Icon: IoGrid },
  { text: 'Products', to: 'products', Icon: IoCube },
  { text: 'Users', to: 'users', Icon: IoPerson },
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
