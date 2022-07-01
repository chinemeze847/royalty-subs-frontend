import { forwardRef, type LegacyRef } from 'react';
import { Link } from '@remix-run/react';

type Props = {
  id: string;
  label: string;
  name: string; 
  error?: string;
  checked?: boolean;
  required?: boolean;
  disabled?: boolean;
  labelLink?: { to: string; text: string };
};

export default forwardRef(function CheckboxComponent(
  { id, label, name, labelLink, error, required = true, checked = false, disabled = false }: Props, 
  ref: LegacyRef<HTMLInputElement>
) {
  return (
    <div className="flex gap-x-dimen-xs items-center mb-dimen-sm">
      <input 
        id={id}
        ref={ref}
        name={name}
        type="checkbox" 
        required={required}
        disabled={disabled}
        defaultChecked={checked}
        className="w-dimen-lg h-dimen-lg accent-color-primary" 
      />
      <label htmlFor={id}>
        <span>{ label }</span>
        { 
          labelLink !== undefined && (
            <Link to={labelLink.to} className="text-color-primary"> { labelLink.text }</Link>
          )
        }
      </label>
      <div className="text-color-error">{ error }</div>
    </div>
  );
});
