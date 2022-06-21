import { IoCheckmark } from 'react-icons/io5';

export default function AboutUsItemComponent({ text }: { text: string }) {
  return (
    <li className="flex gap-x-dimen-sm items-center">
      <IoCheckmark className="text-xl text-color-primary" />
      <div>{ text }</div>
    </li>
  );
}