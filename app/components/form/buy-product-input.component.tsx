import InputComponent from '~/components/form/input.component';
import Product from '~/models/product.model';

export default function BuyProductInputComponent(
  { productId, value, error }: { productId: number; value?: any; error?: string; }
) {
  switch(productId) {
    case Product.TYPE_DATA:
    case Product.TYPE_AIRTIME:
      return (
        <InputComponent 
          id="phone-number-input" 
          label="Phone number" 
          name="phoneNumber" 
          value={value?.phoneNumber} 
          error={error} 
        />
      );
    
    case Product.TYPE_CABLE:
      return (
        <InputComponent 
          id="smart-card-number-input" 
          label="Smart card number" 
          name="smartCardNumber" 
          value={value?.smartCardNumber} 
          error={error} 
        />
      );

    case Product.TYPE_ELECTRICITY:
      return (
        <InputComponent 
          id="meter-number-input" 
          label="Meter number" 
          name="meterNumber" 
          value={value?.meterNumber} 
          error={error} 
        />
      );

    default: 
      return <div className="font-bold text-center">Unknown product</div>
  }
}
