import "./Notification.scss"

export interface INotifyItemProps {
  notiTypes: "friendRequest" | "others";
}

export function NotifyItem({ notiTypes }: INotifyItemProps) {
  return <>
  {notiTypes === "friendRequest" ? <div >
  
  </div> : <div ></div>}
  </>;
}
