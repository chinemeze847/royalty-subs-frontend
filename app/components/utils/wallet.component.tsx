import { Link } from "@remix-run/react";
import { IoRefresh } from "react-icons/io5";
import userMoneyFormat from "~/hooks/money-format.hook";

export default function WalletComponent(
  { name, balance, balanceTitle = 'Wallet balance', fundable = false }: 
  { name: string; balance: number; balanceTitle?: string; fundable?: boolean }
) {

  const money = userMoneyFormat();

  return (
    <section className="text-color-on-primary bg-color-primary-variant p-dimen-lg rounded-lg">
      <div className="text-3xl font-bold mb-dimen-md">Welcome, { name }</div>
     
      <div className="lg:flex lg:justify-between">
        <div>
          <div className="text-lg flex gap-x-dimen-sm items-center">
            <span>{ balanceTitle }</span>
            <Link 
              to="" 
              className="w-dimen-xl h-dimen-xl border-none bg-transparent rounded-full hover:bg-color-primary"
            >
              <IoRefresh className="block mx-auto" />
              <span className="sr-only">Refresh wallet balance</span>
            </Link>
          </div>
          <div className="font-bold text-2xl">NGN { money(balance) }</div>
        </div>
        
        {
          fundable && (
            <Link 
              to="fund-wallet" 
              className="w-fit mt-dimen-md block bg-color-primary shadow shadow-white p-dimen-md rounded-lg hover:shadow-lg"
            >
              Fund wallet
            </Link>
          )
        }
      </div>
    </section>
  )
}
