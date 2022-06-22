import { forwardRef, type LegacyRef } from 'react';

type Props = {
  id: string;
  label: string;
  name: string; 
  value?: string;
  error?: string;
  required?: boolean;
  defaultText?: string;
  options: { value: string | number; text: string }[]
}

export default forwardRef(function SelectCmponent(
  { id, label, name, options, error, required = true, value = '', defaultText = 'Choose one' }: Props, 
  ref: LegacyRef<HTMLSelectElement>
) {
  return (
    <div className="mb-dimen-sm">
      <label htmlFor={id} className="font-bold">{ label } { !required && '(optional)' }</label>
      <select 
        id={id}
        ref={ref}
        name={name} 
        required={required}
        defaultValue={value}
        className="block w-full p-dimen-sm border border-color-primary rounded-lg outline-none bg-color-surface" 
      >
        <option value="">{ defaultText }</option>
        {
          options.map(item => (
            <option key={item.value} value={item.value}>{ item.text }</option>
          ))
        }
      </select>
      <div className="text-color-error">{ error }</div>
    </div>
  );
});
