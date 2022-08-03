import { Link, useSearchParams } from "@remix-run/react";
import type PaginationDto from "~/models/pagination-dto.model";

const PageLink = (
  { text, to }: { text: 'Next' | 'Previous'; to: number | null; }
) => {

  const [urlParams] = useSearchParams();

  urlParams.set('page', to as any);

  return (
    <li>
      {
        to === null ? (
          <span 
            className="inline-block bg-color-background rounded p-dimen-xs"
          >
            { text }
          </span>
        ) : (
          <Link 
            to={`?${urlParams.toString()}`} 
            className="inline-block bg-color-primary-variant rounded p-dimen-xs hover:bg-color-primary"
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
          <ul className="flex gap-dimen-sm justify-center items-center py-dimen-lg px-dimen-sm">
            <PageLink 
              text="Previous" 
              to={pagination.previousPage} 
            />

            <PageLink 
              text="Next" 
              to={pagination.nextPage} 
            />
          </ul>
        </td>
      </tr>
    </tfoot>
  );
}
