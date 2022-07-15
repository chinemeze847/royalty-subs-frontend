import { Link } from "@remix-run/react";

type TabItem = { id: number; name: string; };

const TabLinkComponent = ({ item, isActive }: { item: TabItem; isActive: boolean; }) => {
  return (
    <li>
      <Link 
        to={`?brand=${item.id}`}
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

export default function TabComponent({ items, activeItem }: { items: TabItem[]; activeItem: number; }) {
  return (
    <ul className="flex gap-dimen-sm overflow-x-auto">
      {
        items.map((item) => (
          <TabLinkComponent key={item.id} item={item} isActive={activeItem === item.id} />
        ))
      }
    </ul>
  );
}
