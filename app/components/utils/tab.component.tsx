import { Link } from "@remix-run/react";

type TabItem = { id: number | string; name: string; };

const TabLinkComponent = (
  { item, isActive, filter }: { item: TabItem; isActive: boolean; filter: string }
) => {
  return (
    <li>
      <Link 
        to={`?${filter}=${item.id}`}
        className={`
          block 
          py-dimen-xs 
          px-dimen-lg 
          rounded-lg 
          font-bold 
          text-color-on-primary
          ${
            isActive 
              ? 'bg-color-primary'
              : 'bg-color-primary-variant '
          }
        `}
      >
        { item.name }
      </Link>
    </li>
  );
}

export default function TabComponent(
  { items, activeItem, filter }: { items: TabItem[]; activeItem: number | string; filter: string }
) {
  return (
    <ul className="flex gap-dimen-sm overflow-x-auto">
      {
        items.map((item) => (
          <TabLinkComponent 
            key={item.id} 
            item={item} 
            filter={filter} 
            isActive={activeItem === item.id} 
          />
        ))
      }
    </ul>
  );
}
