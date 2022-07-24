import type { ReactNode } from 'react';
import type { IconType } from 'react-icons';

export default function ContactUsItemComponent(
  { Icon, heading, children }: { Icon: IconType, heading: string; children?: ReactNode }
) {
  return (
    <li>
      <div className="flex gap-x-dimen-sm py-dimen-md items-start">
        <Icon className="text-xl" />
        <div>
          <div className="font-bold">{ heading }</div>
          <div>{ children }</div>
        </div>
      </div>
    </li>
  );
}
