import { Link, NavLink } from "@remix-run/react";
import { useState } from "react";
import { IoClose, IoMenu } from "react-icons/io5";

const HeaderNavItem = ({ to, text }: { to: string; text: string }) => {
  return (
    <li>
      <NavLink className="block p-dimen-sm lg:text-color-primary lg:font-bold" to={to}>{ text }</NavLink>
    </li>
  );
}

const TopSectionLink = ({ to, text, inverse = false }: { to: string; text: string; inverse?: boolean }) => {
  return (
    <li>
      <Link 
        to={to}
        className={`
          block 
          border 
          border-color-primary
          p-dimen-sm 
          rounded-lg 
          hover:bg-color-primary-variant
          ${ 
            inverse 
              ? 'text-color-primary'
              : 'text-color-on-primary bg-color-primary'
          }
        `}
      >
        { text }
      </Link>
    </li>
  );
}

export default function Index() {

  const [showNav, setShowNav] = useState(false);

  return (
    <>
      <header className="py-dimen-md border">
        <div className="container flex items-center gap-x-dimen-md">
          <h1 className="text-color-primary font-bold text-3xl">Royaltysubs</h1>
          <nav className="flex flex-grow justify-end bordler relative lg:justify-center">
            <button onClick={() => setShowNav(!showNav)} className="lg:hidden">
              { 
                showNav 
                  ? <IoClose className="text-4xl text-color-primary" /> 
                  : <IoMenu className="text-4xl text-color-primary" /> 
              }
              <span className="sr-only">Menu</span>
            </button>
            <ul 
              className={`
                w-full 
                absolute 
                top-full 
                bg-color-surface 
                rounded 
                shadow 
                shadow-color-primary 
                overflow-hidden 
                transition-[max-height]
                duration-300 
                ${showNav ? 'max-h-96' : 'max-h-0'}
                lg:max-h-max
                lg:static
                lg:flex
                lg:gap-x-dimen-sm
                lg:w-fit
                lg:shadow-none
              `}
            >
              <HeaderNavItem to="#" text="Home" />
              <HeaderNavItem to="#about" text="About us" />
              <HeaderNavItem to="#services" text="Our services" />
              <HeaderNavItem to="#pricing" text="Pricing" />
              <HeaderNavItem to="#login" text="Log in" />
              <HeaderNavItem to="#register" text="Register" />
            </ul>
          </nav>
        </div>
      </header>
      <main>
        <div className="container">
          <section className="py-dimen-lg lg:flex lg:gap-x-dimen-xxxl">
            <div className="py-dimen-xxl lg:py-40">
              <h2 className="font-bold text-2xl mb-dimen-sm lg:text-3xl">Welcome to Royaltysubs</h2>
              <div className="text-5xl mb-dimen-xxl lg:text-6xl">Your #1 Mobile Data, Cable Sub, Electric Bill, Airtime (VTU) vendor.</div>
              <ul className="flex gap-x-dimen-sm">
                <TopSectionLink to="/auth/login" text="Login" inverse />
                <TopSectionLink to="/user/register" text="Register" />
              </ul>
            </div>
            <div className="py-dimen-md lg:-rotate-6 lg:py-16">
              <img 
                src="/images/index-1.jpg" 
                alt="Man making a phone call" 
                className="w-full lg:w-[80em] shadow shadow-color-primary rounded-lg" 
              />
            </div>
          </section>

          <section className="py-dimen-lg">
            <h3 
              className="w-fit font-bold text-color text-3xl text-color-primary mb-dimen-lg pb-dimen-xs px-dimen-md border-b-4 border-color-primary"
            >
              About us
            </h3>
            <div className="lg:gap-x-dimen-lg lg:items-center">
              <div className="w-96 h-96 mb-dimen-md flex-grow">
                <img 
                  alt="Light bulb" 
                  src="/images/index-2.jpg" 
                  className="w-full h-full rounded-full" 
                />
              </div>
              <p className="">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                Iure deserunt voluptas voluptatem velit neque doloribus natus delectus nisi nam inventore, 
                veritatis, sequi vel alias itaque culpa tenetur saepe suscipit! Dolorem.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                Iure deserunt voluptas voluptatem velit neque doloribus natus delectus nisi nam inventore, 
                veritatis, sequi vel alias itaque culpa tenetur saepe suscipit! Dolorem.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                Iure deserunt voluptas voluptatem velit neque doloribus natus delectus nisi nam inventore, 
                veritatis, sequi vel alias itaque culpa tenetur saepe suscipit! Dolorem.
              </p>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
