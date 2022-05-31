import React from 'react'
import type { IconType } from 'react-icons'

export default function EmptyListComponent({ Icon, text }: { Icon: IconType, text: string }) {
  return (
    <div>
      <Icon
        className="text-9xl mx-auto my-dimen-md text-color-primary bg-color-primary-variant rounded-full" 
      />
      <div className="text-center font-bold">{ text }</div>
    </div>
  );
}
