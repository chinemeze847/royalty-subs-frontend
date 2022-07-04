import { IoBulb, IoCall, IoCube, IoTv, IoWifi } from "react-icons/io5";
import Product from "~/models/product.model"

export default function useProductIcon() {
  return (id: number) => {
    switch(id) {
      case Product.TYPE_DATA: return IoWifi;
      case Product.TYPE_AIRTIME: return IoCall;
      case Product.TYPE_CABLE: return IoTv;
      case Product.TYPE_ELECTRICITY: return IoBulb;
      default: return IoCube;
    }
  }
}
