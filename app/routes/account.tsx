import { Link, NavLink, Outlet } from "@remix-run/react";
import { useState } from "react";
import type { IconType } from "react-icons";
import { IoBulb, IoCall, IoCard, IoClose, IoGrid, IoMenu, IoPerson, IoPricetags, IoTv, IoWifi } from "react-icons/io5";

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
      <Link onClick={onClick} to={to} className="block px-dimen-sm py-dimen-xs">{ text }</Link>
    </li>
  );
}

export default function Account() {

  const [showNav, setShowNav] = useState(false);

  const [showAccountNav, setShowAccountNav] = useState(false);

  const closeNav = () => setShowNav(false);

  const closeAccountNav = () => setShowAccountNav(false);

  return (
    <>
      <header className="py-dimen-md border-b fixed w-full left-0 top-0 bg-color-surface z-10 lg:pl-64">
        <div className="container flex justify-between">
          <button onClick={() => setShowNav(true)} className="lg:hidden">
            <IoMenu className="text-4xl text-color-primary" />
            <span className="sr-only">Menu</span>
          </button>

          <h1 className="text-color-primary font-bold text-3xl sr-only lg:not-sr-only">Royaltysubs</h1>

          <div className="relative flex-grow text-right">
            <button 
              onClick={() => setShowAccountNav(!showAccountNav)} 
              className="border rounded-full border-color-primary p-dimen-xs"
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
              <AccountLink to="profile" text="Profile" onClick={closeAccountNav} />
              <AccountLink to="change-password" text="Change password" onClick={closeAccountNav} />
              <AccountLink to="logout" text="Log out" onClick={closeAccountNav} />
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
          <span className="sr-only">Close nav</span>
        </button>
        <ul>
          <NavItem text="Dashboard" to="" Icon={IoGrid} onClick={closeNav} />
          <NavItem text="Buy Data" to="buy-data" Icon={IoWifi} onClick={closeNav} />
          <NavItem text="Buy Airtime" to="buy-airtime" Icon={IoCall} onClick={closeNav} />
          <NavItem text="Electricity Payment" to="electricity-payment" Icon={IoBulb} onClick={closeNav} />
          <NavItem text="Cable Payment" to="cable-payment" Icon={IoTv} onClick={closeNav} />
          <NavItem text="Pricing" to="pricing" Icon={IoPricetags} onClick={closeNav} />
          <NavItem text="Transactions" to="transactions" Icon={IoCard} onClick={closeNav} />
        </ul>
      </nav>

      <main className="pt-20 lg:pl-64">
        <Outlet />
      </main>
    </>
  );
}
