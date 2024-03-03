import { Images } from "../../../../constants";
import NotFound from "../../../../components/common/NotFound/NotFound";
import { NotifyItem } from "./NotifyItem";
import { SideWrapper } from "../SideWrapper";
import { selectNotify } from "../../dashboardSlice";
import { useAppSelector } from "../../../../app/store";

export interface INotificationSideProps { }

export function NotificationSide() {
  const notifies = useAppSelector(selectNotify)

  return (
    <SideWrapper title="Notifications">
      <div className="notification">
        {notifies.length === 0 ? <NotFound title="You don't have any notifications" icon={Images.error} /> : notifies.map((notify, key) => {
          return <NotifyItem notify={notify} key={key} />;
        })}
      </div>
    </SideWrapper>
  );
}
