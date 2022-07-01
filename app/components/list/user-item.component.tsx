import { Link } from '@remix-run/react';
import type User from '~/models/user.model';

export default function UserItemComponent({ user, linkPrefix = '' }: { user: User; linkPrefix?: string; }) {
  return (
    <tr className="border">
      <td className="border p-dimen-xs">{ user.id }</td>
      <td className="border p-dimen-xs">{ user.firstName } { user.lastName }</td>
      <td className="border p-dimen-xs">{ user.email }</td>
      <td className="border p-dimen-xs">{ user.phoneNumber }</td>
      <td className="border p-dimen-xs">{ user.status }</td>
      <td className="border p-dimen-xs">
        <Link to={`${linkPrefix}${user.id}`} className="table-button">View</Link>
      </td>
    </tr>
  );
}
