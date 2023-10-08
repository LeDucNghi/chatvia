import { NotifyItem } from "./NotifyItem";
import { SideWrapper } from "../SideWrapper";

export interface INotificationSideProps {}

export function NotificationSide(props: INotificationSideProps) {
  return (
    <SideWrapper title="Notifications">
      <NotifyItem notiTypes="friendRequest" />
    </SideWrapper>
  );
}
