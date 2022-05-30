import { forwardRef, type LegacyRef } from 'react';

type Props = {
  id: string;
  label: string;
  name: string; 
  value?: string;
  type?: string;
  step?: string;
  required?: boolean;
  disabled?: boolean;
}

export default forwardRef(function InputCmponent(
  { id, label, name, required = true, step, value = '', type = 'text', disabled = false }: Props, 
  ref: LegacyRef<HTMLInputElement>
) {
  return (
    <div className="mb-dimen-sm">
      <label htmlFor={id} className="font-bold">{ label } { !required && '(optional)' }</label>
      <input 
        id={id}
        ref={ref}
        type={type} 
        name={name} 
        step={step}
        disabled={disabled}
        required={required}
        defaultValue={value}
        className="block w-full p-dimen-sm border border-color-primary rounded-lg outline-none disabled:bg-color-background" 
      />
    </div>
  );
});
