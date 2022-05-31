import { forwardRef, type LegacyRef } from 'react';

type Props = {
  id: string;
  label: string;
  name: string; 
  value?: string;
  required?: boolean;
  disabled?: boolean;
};

export default forwardRef(function TextareaComponent(
  { id, label, name, required = true, value = '', disabled = false }: Props, 
  ref: LegacyRef<HTMLTextAreaElement>
) {
  return (
    <div className="mb-dimen-sm">
      <label htmlFor={id} className="font-bold">{ label } { !required && '(optional)' }</label>
      <textarea 
        id={id}
        ref={ref}
        name={name}
        disabled={disabled}
        required={required}
        defaultValue={value}
        className="block w-full p-dimen-sm border border-color-primary rounded-lg outline-none disabled:bg-color-background" 
      ></textarea>
    </div>
  );
});
