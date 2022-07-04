import { forwardRef, type LegacyRef } from 'react';

type Props = {
  id: string;
  label: string;
  name: string; 
  value?: any;
  type?: string;
  step?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
};

export default forwardRef(function InputCmponent(
  { id, label, name, required = true, step, error, placeholder, value = '', type = 'text', disabled = false }: Props, 
  ref: LegacyRef<HTMLInputElement>
) {
  return (
    <div className="mb-dimen-sm flex-grow">
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
        placeholder={placeholder}
        className="block w-full p-dimen-sm border border-color-primary rounded-lg outline-none disabled:bg-color-background" 
      />
      <div className="text-color-error">{ error }</div>
    </div>
  );
});
