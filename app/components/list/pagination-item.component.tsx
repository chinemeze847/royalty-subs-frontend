import { Link } from "@remix-run/react";

const PageLink = ({ text, to }: { text: 'Next' | 'Previous'; to: string; }) => {
  return (
    <li>
      <Link 
        to={to} 
        className="bg-color-primary-variant rounded p-dimen-xs hover:bg-color-primary"
      >
        { text }
      </Link>
    </li>
  );
}

export default function PaginationItemComponent() {
  return (
    <tfoot>
      <tr>
        <td colSpan={6}>
          <ul className="flex gap-dimen-sm justify-center py-dimen-xl px-dimen-sm">
            <PageLink text="Previous" to="" />
            <PageLink text="Next" to="" />
          </ul>
        </td>
      </tr>
    </tfoot>
  );
}
