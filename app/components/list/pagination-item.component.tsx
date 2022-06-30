import { Link } from "@remix-run/react";
import type PaginationDto from "~/models/pagination-dto.model";

const PageLink = (
  { text, to, disabled }: 
  { text: 'Next' | 'Previous'; to: string; disabled: boolean }
) => {
  return (
    <li>
      {
        disabled ? (
          <span 
            className="inline-block bg-color-background rounded p-dimen-x"
          >
            { text }
          </span>
        ) : (
          <Link 
            to={to} 
            className="bg-color-primary-variant rounded p-dimen-xs hover:bg-color-primary"
          >
            { text }
          </Link>
        )
      }
    </li>
  );
}

export default function PaginationItemComponent(
  { pagination, span = 10 }: 
  { pagination: PaginationDto, span?: number }
) {
  return (
    <tfoot>
      <tr>
        <td colSpan={span}>
          <ul className="flex gap-dimen-sm justify-center py-dimen-xl px-dimen-sm">
            <PageLink 
              text="Previous" 
              to={`?after=${pagination.after}`} 
              disabled={pagination.after === null} 
            />

            <PageLink 
              text="Next" 
              to={`?before=${pagination.before}`} 
              disabled={pagination.before === null} 
            />
          </ul>
        </td>
      </tr>
    </tfoot>
  );
}
