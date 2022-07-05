import { json, type LoaderFunction } from "@remix-run/node";
import { useLoaderData, useTransition } from "@remix-run/react";
import { useState } from "react";
import { IoCall, IoClose, IoLocation, IoMail, IoMenu } from "react-icons/io5";
import HomeHeaderNavItemComponent from "../components/header/home-header-nav-item.component";
import TopLoaderComponent from "../components/loader/top-loader.component";
import FooterNavItemComponent from "../components/footer/footer-nav-item.component";
import ContactUsItemComponent from "../components/footer/contact-us-item.component";
import TopSectionLinkComponent from "../components/home/top-section-link.component";
import Heading3Component from "../components/home/heading-3.component";
import AboutUsItemComponent from "../components/home/about-us-item.component";
import ServiceItemComponent from "../components/home/service-item.component";
import ProductPricingComponent from "../components/home/product-pricing.component";
import ProductApiService from "../services/product-api.service";
import type Product from "../models/product.model";
import type Brand from "../models/brand.model";

type LoaderData = {
  brandsAndProducts: {
    product: Product;
    brands: Brand[];
  }[];
};

export const loader: LoaderFunction = async () => {
  const data = await ProductApiService.read();

  const units = await Promise.all(
    data.data.map((item) => ProductApiService.readProductUnits(item.id))
  );

  const data2 = data.data.map((product, index) => {
    const productUnits = units[index].data;
    const brands: Brand[] = [];

    for(const unit of productUnits) {
      let brandIndex = brands.findIndex((item) => item.id === unit.brandId);
      if (brandIndex === -1) {
        brands.push({ ...unit.brand, productUnits: [] });
        brandIndex = brands.length - 1;
      }
      brands[brandIndex].productUnits.push(unit);
    }

    return { product, brands };
  });

  return json<LoaderData>({ brandsAndProducts: data2 });
};

export default function Index() {
  const transition = useTransition();

  const [showNav, setShowNav] = useState(false);
  
  const { brandsAndProducts } = useLoaderData<LoaderData>();

  return (
    <>
      { transition.state === 'loading' && <TopLoaderComponent /> }
      
      <header className="py-dimen-md border-b fixed w-full left-0 top-0 bg-color-surface z-10">
        <div className="container flex items-center gap-x-dimen-md">
          <h1 className="text-color-primary font-bold text-3xl">Royaltysubs</h1>
          <nav className="flex flex-grow justify-end bordler relative lg:justify-center">
            <button onClick={() => setShowNav(!showNav)} className="hover:bg-color-primary-variant lg:hidden">
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
              <HomeHeaderNavItemComponent to="#home" text="Home" />
              <HomeHeaderNavItemComponent to="#about" text="About us" />
              <HomeHeaderNavItemComponent to="#products" text="Our products" />
              <HomeHeaderNavItemComponent to="#pricing" text="Pricing" />
              <HomeHeaderNavItemComponent to="login" text="Log in" />
              <HomeHeaderNavItemComponent to="register" text="Register" />
              <HomeHeaderNavItemComponent to="account" text="Account" />
              <HomeHeaderNavItemComponent to="admin" text="Admin" />
            </ul>
          </nav>
        </div>
      </header>

      <main className="py-20">
        <div className="container">

          <section id="home" className="py-dimen-lg lg:flex lg:gap-x-dimen-xxxl">
            <div className="py-dimen-xxl lg:py-40">
              <h2 className="font-bold text-2xl mb-dimen-sm lg:text-3xl">Welcome to Royaltysubs</h2>
              <div className="text-3xl mb-dimen-xxl xl:text-5xl">Your #1 Mobile Data, Cable Sub, Electric Bill, Airtime (VTU) vendor.</div>
              <ul className="flex gap-x-dimen-sm">
                <TopSectionLinkComponent to="login" text="Login" inverse />
                <TopSectionLinkComponent to="register" text="Register" />
              </ul>
            </div>
            <div className="py-dimen-md lg:-rotate-6 lg:py-16 hover:rotate-0 transition-all duration-500">
              <img 
                src="/images/index-1.jpg" 
                alt="Man making a phone call" 
                className="w-full lg:w-[80em] shadow shadow-color-primary rounded-lg" 
              />
            </div>
          </section>

          <section id="about" className="py-dimen-xxxl">
            <Heading3Component text="About us" />
            <div className="lg:flex lg:gap-x-dimen-lg lg:items-center">
              <img 
                alt="Light bulb" 
                src="/images/index-2.jpg" 
                className="transition-all block w-96 h-96 mx-auto rounded-full hover:shadow-2xl hover:shadow-color-primary lg:w-[100rem] lg:h-[30rem]" 
              />
              <div>
                <p className="text-xl mt-dimen-md lg:mt-0">
                  Royaltysubs is a platform that provides internet services with a touch of Royalty. 
                  We provide best internet services using cutting edge technologies for the benefits of our clients.
                </p>
                <ul className="my-dimen-md">
                  <AboutUsItemComponent text="We Are Automated" />
                  <AboutUsItemComponent text="Customer Support" />
                  <AboutUsItemComponent text="We Are Reliable" />
                  <AboutUsItemComponent text="24/7 Support!" />
                </ul>
              </div>
            </div>
          </section>

          <section id="products" className="py-dimen-xxxl">
            <Heading3Component text="Our Products" />
            <ul className="md:grid md:grid-cols-2 md:gap-x-dimen-md md:items-stretch lg:grid-cols-4">
              <ServiceItemComponent 
                src="service-airtime.jpg"
                alt="Airtime purchase"
                heading="Airtime TopUp"
                body="Making an Online recharge has become very easy and safe on Royaltysubs."
              />
              <ServiceItemComponent 
                src="service-data.jpg"
                alt="Data purchase"
                heading="Buy Data"
                body="Purchase and enjoy our very low rate data plans for your internet browsing data bundle."
              />
              <ServiceItemComponent 
                src="service-cable.jpg"
                alt="Cable Subscription purchase"
                heading="Cable Subscription"
                body="Instantly activate cable subscription with favourable discount compare to others."
              />
              <ServiceItemComponent 
                src="service-utility.jpg"
                alt="Utility bills payment"
                heading="Utility Bills Payment"
                body="Because we understand your needs, we have made bill and utilities payment more convenient."
              />
            </ul>
          </section>
          
          {
            brandsAndProducts.map(item => (
              <section className="py-dimen-xxxl" key={item.product.id}>
                <Heading3Component text={`${item.product.name} Pricing`} />
                <ul className="grid gap-dimen-md md:grid-cols-2 xl:grid-cols-3">

                  {
                    item.brands.map(item => (
                      <ProductPricingComponent 
                        key={item.id}
                        src={item.photo.href} 
                        alt={item.name}
                        units={item.productUnits}
                      />
                    ))
                  }

                </ul>
              </section>
            ))
          }

        </div>
      </main>

      <footer className="bg-color-background py-dimen-xxxl">
        <div className="container md:flex md:gap-x-dimen-md justify-around">
          <div className="mb-dimen-md">
            <h5 className="font-bold uppercase">Resources</h5>
            <ul>
              <FooterNavItemComponent to="#home" text="Home" />
              <FooterNavItemComponent to="#about" text="About us" />
              <FooterNavItemComponent to="#products" text="Our products" />
              <FooterNavItemComponent to="#pricing" text="Pricing" />
              <FooterNavItemComponent to="terms" text="Terms of service" />
              <FooterNavItemComponent to="login" text="Log in" />
              <FooterNavItemComponent to="register" text="Register" />
            </ul>
          </div>
          <div>
            <h5 className="font-bold uppercase">Contact us</h5>
            <ul>
              <ContactUsItemComponent Icon={IoCall} heading="Phone number" body="08109260088" />
              <ContactUsItemComponent Icon={IoMail} heading="Email address" body="iykesamuel0@gmail.com" />
              <ContactUsItemComponent Icon={IoLocation} heading="Address" body="#56 Ojokwu street, Olodi Apapa, Lagos" />
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
}
