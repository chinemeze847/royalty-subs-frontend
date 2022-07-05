import type ProductUnit from "../../models/product-unit.model";

const ProductPricingItem = ({ unit: { price, name, duration } }: { unit: ProductUnit }) => {
  return (
    <li>
      <div className="py-dimen-sm flex justify-between font-bold border-b border-color-primary">
        <span>{ name }</span>
        <span>NGN { price }</span>
        { duration && <span>{ duration } days</span> }
      </div>
    </li>
  );
}

export default function ProductPricingComponent(
  { src, alt, units }: 
  { src: string; alt: string, units: ProductUnit[] }
) {
  return (
    <li>
      <div className="duration-500 shadow p-dimen-md rounded-lg shadow-color-primary-variant">
        <img 
          src={src} 
          alt={alt} 
          className="w-40 h-40 rounded-lg mx-auto mb-dimen-md shadow shadow-color-primary"
        />
        <ul>
          {
            units.map(item => (
              <ProductPricingItem unit={item} key={item.name} />
            ))
          }
        </ul>
      </div>
    </li>
  );
}
