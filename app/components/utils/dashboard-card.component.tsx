import type { ReactNode } from "react";
import type { IconType } from "react-icons";
import EmptyListComponent from "./empty-list.component";

export default function DashboardCardComponent<T>(
  { title, list, empty, renderItem, flexGrow = true }: 
  { title: string; list: T[]; empty: { Icon: IconType; text: string }; renderItem: (item: T) => ReactNode; flexGrow?: boolean; }
) {
  return (
    <div 
      className={`
        shadow 
        p-dimen-md 
        rounded-lg 
        mb-dimen-md
        shadow-color-primary 
        ${flexGrow ? 'lg:flex-grow' : ''}
      `}
    >
      <div className="font-bold">{ title }</div>
      <ul>
        { list.map(renderItem) }
        { 
          list.length === 0 && (
            <EmptyListComponent Icon={empty.Icon} text={empty.text} /> 
          )
        }
      </ul>
    </div>
  );
}
