import { Link, NavLink, Outlet, useTransition } from "@remix-run/react";
import { useState } from "react";
import type { IconType } from "react-icons";
import { IoClose, IoMenu, IoPerson } from "react-icons/io5";
import TopLoaderComponent from "../loader/top-loader.component";

const NavItem = (
  { to, Icon, text, onClick }: 
  { to: string, Icon: IconType, text: string, onClick: () => void }
) => {
  return (
    <li className="mb-dimen-sm">
      <NavLink 
        end
        to={to} 
        onClick={onClick}
        className={({ isActive }) => `
          flex 
          p-dimen-sm 
          items-center 
          mr-dimen-md
          gap-x-dimen-sm 
          rounded-tr-full 
          rounded-br-full
          ${
            isActive 
              ? 'bg-color-primary text-color-on-primary' 
              : 'text-color-primary bg-color-surface hover:bg-color-primary-variant'
          }
        `}
      >
        <Icon className="text-2xl" />
        <span className="">{ text }</span>
      </NavLink>
    </li>
  );
}

const AccountLink = ({ to, text, onClick }: { to: string; text: string; onClick: () => void }) => {
  return (
    <li>
      <Link 
        to={to} 
        onClick={onClick} 
        className="block px-dimen-sm py-dimen-xs hover:bg-color-background"
      >
        { text }
      </Link>
    </li>
  );
}

export type AccountMenuItem = { to: string; text: string; };

export type SideBarItem = { to: string; text: string; Icon: IconType; };

export default function LayoutComponent(
  { sideBarItems, accoutMenuItems }: 
  { sideBarItems: SideBarItem[], accoutMenuItems: AccountMenuItem[] }
) {

  const transition = useTransition();

  const [showNav, setShowNav] = useState(false);

  const [showAccountNav, setShowAccountNav] = useState(false);

  const closeNav = () => setShowNav(false);

  const closeAccountNav = () => setShowAccountNav(false);

  return (
    <>
      <header className=" border-b fixed w-full left-0 top-0 bg-color-surface z-10 lg:pl-64">
        { transition.state === 'loading' && <TopLoaderComponent /> }
        
        <div className="container py-dimen-md flex justify-between">
          <button onClick={() => setShowNav(true)} className="hover:bg-color-primary-variant lg:hidden">
            <IoMenu className="text-4xl text-color-primary" />
            <span className="sr-only">Menu</span>
          </button>

          <h1 className="text-color-primary font-bold text-3xl sr-only lg:not-sr-only">
            <Link to="/">Royaltysubs</Link>
          </h1>

          <div className="relative flex-grow text-right">
            <button 
              onClick={() => setShowAccountNav(!showAccountNav)} 
              className="border rounded-full border-color-primary p-dimen-xs hover:bg-color-primary-variant"
            >
              <IoPerson className="text-xl text-color-primary" />
              <span className="sr-only">Account</span>
            </button>
            <ul 
              className={`
                absolute 
                top-full 
                right-0 
                shadow 
                text-left 
                rounded-lg
                duration-300 
                overflow-hidden 
                bg-color-surface 
                shadow-color-primary 
                transition-[max-height]
                ${showAccountNav ? 'max-h-96' : 'max-h-0'}
              `}
            >
              { 
                accoutMenuItems.map(item => (
                  <AccountLink key={item.text} to={item.to} text={item.text} onClick={closeAccountNav} />
                ))
              }
            </ul>
          </div>
        </div>
      </header>
      
      <nav 
        className={`
          w-64 
          fixed 
          top-0
          h-full 
          shadow
          z-20
          py-20 
          overflow-auto 
          transition-[left]
          bg-color-surface
          lg:left-0
          ${showNav ? 'left-0' : '-left-full'}
        `}
      >
        <button className="absolute top-2 right-2 lg:hidden" onClick={closeNav}>
          <IoClose className="text-4xl" />
          <span className="sr-only">Close menu</span>
        </button>
        <ul>
          { 
            sideBarItems.map(item => (
              <NavItem key={item.text} text={item.text} to={item.to} Icon={item.Icon} onClick={closeNav} /> 
            ))
          }
        </ul>
      </nav>

      <main className="pt-20 lg:pl-64">
        <Outlet />
      </main>
    </>
  );
}
