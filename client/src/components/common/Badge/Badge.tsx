import "./Badge.scss";

export interface IBadgeProps {
  content: string | number;
}

export function Badge({ content }: IBadgeProps) {
  return (
    <div className="badge-container flex justify-center items-center">
      {content}
    </div>
  );
}
