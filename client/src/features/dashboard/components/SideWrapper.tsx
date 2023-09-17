import "./Side.scss";

import * as React from "react";

export interface ISidesProps {
  title: string;
  className?: string;

  icon?: React.ReactNode;
  header?: React.ReactNode;
  children?: React.ReactNode;
}

export function SideWrapper({
  title,
  icon,
  children,
  header,
  className,
}: ISidesProps) {
  return (
    <div className={`side-info ${className}`}>
      <div className="side-header">
        <h4 className="mb-6 font-semibold flex justify-between">
          {" "}
          {title} {icon}{" "}
        </h4>

        {header}
      </div>

      <div className="side-content">{children}</div>
    </div>
  );
}
