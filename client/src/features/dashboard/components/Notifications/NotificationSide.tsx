import { NotifyItem } from "./NotifyItem";
import { SideWrapper } from "../SideWrapper";
import { selectNotify } from "../../dashboardSlice";
import { useAppSelector } from "../../../../app/store";

export interface INotificationSideProps { }

export function NotificationSide() {
  const notifies = useAppSelector(selectNotify)
  console.log("🚀 ~ NotificationSide ~ notifies:", notifies)

  return (
    <SideWrapper title="Notifications">
      <div className="notification">
        {notifies.map((notify, key) => {
          return <NotifyItem notify={notify} key={key} />;
        })}
      </div>
    </SideWrapper>
  );
}
