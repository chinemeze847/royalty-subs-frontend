import { forwardRef, useState, type LegacyRef } from 'react';
import { IoEye, IoEyeOff } from 'react-icons/io5';

type Props = {
  id: string;
  label: string;
  name: string; 
  value?: string;
  required?: boolean;
}

export default forwardRef(function PasswordInputCmponent(
  { id, label, name, required = true, value = '' }: Props, 
  ref: LegacyRef<HTMLInputElement>
) {

  const [show, setShow] = useState(false);

  return (
    <div className="mb-dimen-sm">
      <label htmlFor={id} className="font-bold">{ label } { !required && '(optional)' }</label>
      <div className="relative">
        <input 
          id={id}
          ref={ref}
          name={name} 
          required={required}
          defaultValue={value}
          type={show ? 'text' : 'password'} 
          className="w-full p-dimen-sm border border-color-primary rounded-lg outline-none pr-10" 
        />
        <button type="button" onClick={() => setShow(!show)} className="-ml-dimen-xxxl ">
          { show ? <IoEyeOff className="text-xl" /> : <IoEye className="text-xl" /> }
        </button>
      </div>
    </div>
  );
});
