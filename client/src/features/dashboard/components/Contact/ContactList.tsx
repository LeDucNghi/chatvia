import { AlphabetItem } from "./AlphabetItem";
import { BaseItemLoader } from "../../../../components/common/Loader/BaseItemLoader";
import { UserProfile } from "../../../../models";
import { selectFetching } from "../../dashboardSlice";
import { useAppSelector } from "../../../../app/store";
import { users } from "../../../../mock";

export function ContactList() {
  const fetching = useAppSelector(selectFetching);

  const itemsByLetter: UserProfile = {};

  users.forEach((item) => {
    const firstLetter = item.username?.charAt(0).toUpperCase();
    if (!itemsByLetter[firstLetter!]) {
      itemsByLetter[firstLetter!] = [];
    }
    itemsByLetter[firstLetter!].push(item);
  });

  return (
    <div className="contacts w-full h-[500px] overflow-auto">
      <div className="contact-item">
        {fetching.isConversation ? (
          <BaseItemLoader listToRender={5} />
        ) : (
          <AlphabetItem itemsByLetter={itemsByLetter} />
        )}
      </div>
    </div>
  );
}
