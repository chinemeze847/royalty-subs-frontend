import useDateFormat from '~/hooks/date-format.hook';
import type User from '~/models/user.model';

export default function ReferralItemComponent({ user }: { user: User; }) {
  const dateFormater = useDateFormat();

  return (
    <tr className="border">
      <td className="border p-dimen-xs">{ user.firstName } { user.lastName }</td>
      <td className="border p-dimen-xs">{ user.phoneNumber }</td>
      <td className="border p-dimen-xs">{ dateFormater(user.createdAt) }</td>
    </tr>
  );
}
