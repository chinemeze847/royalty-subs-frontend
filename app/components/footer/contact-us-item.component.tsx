import type { IconType } from 'react-icons';

export default function ContactUsItemComponent({ Icon, heading, body }: { Icon: IconType, heading: string; body: string }) {
  return (
    <li>
      <div className="flex gap-x-dimen-sm py-dimen-md items-start">
        <Icon className="text-xl" />
        <div>
          <div className="font-bold">{ heading }</div>
          <div>{ body }</div>
        </div>
      </div>
    </li>
  );
}
