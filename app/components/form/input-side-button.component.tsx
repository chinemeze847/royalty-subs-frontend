import { type IconType } from 'react-icons';

export default function InputSideButtonComponent(
  { Icon, text, type = 'button', action }: 
  { Icon: IconType; text: string; type?: 'button' | 'submit'; action?(): void }
) {
  return (
    <button 
      type={type}
      onClick={action}
      className="p-dimen-sm bg-color-primary mb-dimen-sm text-color-on-primary rounded-lg hover:bg-color-primary-variant"
    >
      <Icon  className="text-2xl" />
      <span className="sr-only">{ text }</span>
    </button>
  );
}
