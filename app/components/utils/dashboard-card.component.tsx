import type { ReactNode } from "react";
import type { IconType } from "react-icons";
import EmptyListComponent from "./empty-list.component";

export default function DashboardCardComponent<T>(
  { title, list, listTitles, empty, renderItem, flexGrow = true }: 
  { 
    title: string; 
    list: T[]; 
    listTitles: string[]; 
    empty: { Icon: IconType; text: string }; 
    renderItem: (item: T) => ReactNode; 
    flexGrow?: boolean; 
  }
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
      <h3 className="font-bold mb-dimen-sm">{ title }</h3>

      <div className="overflow-x-auto">
        
        {
          list.length > 0 ? (
            <table className="min-w-full">
              <thead>
                  <tr>
                    {
                      listTitles.map(item => (
                        <th key={item} className="border p-dimen-xs text-left">{ item }</th>
                      ))
                    }
                  </tr>
                </thead>
                <tbody>
                  { list.map(renderItem) }
                </tbody>
            </table>
          ) : (
            <EmptyListComponent Icon={empty.Icon} text={empty.text} /> 
          )
        }
        
      </div>
      
    </div>
  );
}
