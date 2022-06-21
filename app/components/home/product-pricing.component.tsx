import type ProductUnit from "../../models/product-unit.model";

const ProductPricingItem = ({ unit: { price, name, duration }, borderColor }: { unit: ProductUnit, borderColor: string }) => {
  return (
    <li>
      <div className={`py-dimen-sm flex justify-between font-bold border-b ${borderColor}`}>
        <span>{ name }</span>
        <span>NGN { price }</span>
        <span>{ duration } days</span>
      </div>
    </li>
  );
}

export default function ProductPricingComponent(
  { src, alt, bgColor, shadowColor, unitBorderColor, units }: 
  { src: string; alt: string, bgColor: string; shadowColor: string; unitBorderColor: string; units: ProductUnit[] }
) {
  return (
    <li>
      <div className={`transition-colors duration-500 shadow p-dimen-md rounded-lg ${shadowColor} ${bgColor}`}>
        <img 
          src={src} 
          alt={alt} 
          className={`w-40 h-40 rounded-lg mx-auto mb-dimen-md shadow ${shadowColor}`}
        />
        <ul>
          {
            units.map(item => (
              <ProductPricingItem unit={item} key={item.name} borderColor={unitBorderColor}  />
            ))
          }
        </ul>
      </div>
    </li>
  );
}