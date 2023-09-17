import "./Loader.scss";

import * as React from "react";

export interface ILoaderProps {
  style?: React.CSSProperties;
}

export function Loader({ style }: ILoaderProps) {
  return (
    <div className="load" style={style}>
      <div className="progress"></div>
      <div className="progress"></div>
      <div className="progress"></div>
    </div>
  );
}
