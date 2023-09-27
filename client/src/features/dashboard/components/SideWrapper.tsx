import "./Side.scss";

import * as React from "react";

export interface ISidesProps {
  title: string;
  className?: string;

  icon?: React.ReactNode;
  header?: React.ReactNode;
  children?: React.ReactNode;

  style?: React.CSSProperties;
}

export function SideWrapper({
  title,
  icon,
  children,
  header,
  className,
  style,
}: ISidesProps) {
  return (
    <div style={style} className={`side-info ${className}`}>
      <div className="side-header">
        <h4 className="mb-4 font-semibold flex justify-between">
          {" "}
          {title} {icon}{" "}
        </h4>

        {header}
      </div>

      <div className="side-content">{children}</div>
    </div>
  );
}
