import { forwardRef, type LegacyRef } from 'react';

type Props = {
  id: string;
  label: string;
  name: string; 
  value?: any;
  type?: string;
  step?: string;
  min?: number;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
};

export default forwardRef(function InputCmponent(
  { 
    id, 
    label, 
    name, 
    step, 
    error, 
    min, 
    placeholder, 
    value = '', 
    type = 'text', 
    required = true, 
    disabled = false 
  }: Props, 
  ref: LegacyRef<HTMLInputElement>
) {
  return (
    <div className="mb-dimen-sm flex-grow">
      <label htmlFor={id} className="font-bold">{ label } { !required && '(optional)' }</label>
      <input 
        id={id}
        min={min}
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
