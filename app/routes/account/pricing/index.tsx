import { IoPricetagsOutline } from "react-icons/io5";
import EmptyListComponent from "~/components/utils/empty-list.component";

export default function PricingIndex() {
  return (
    <div className="p-dimen-md">
      <EmptyListComponent Icon={IoPricetagsOutline} text="Select a product from the tabs to see it's prices." />
    </div>
  );
}
