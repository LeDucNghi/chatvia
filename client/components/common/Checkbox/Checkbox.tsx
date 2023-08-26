"use client";

import "./Checkbox.scss";

import * as React from "react";

export interface ICheckboxProps {
  type?: "checkbox" | "radio";

  name: string;
  value: string;
  typeName?: string;
  className?: string;

  handleChange: (value: string) => any;

  style?: React.CSSProperties;
}

export function Checkboxes({
  name,
  value,
  type,
  typeName,
  handleChange,
  style,
  className,
}: ICheckboxProps) {
  const handleFilterChange = () => {
    handleChange(value);
  };

  return (
    <label
      className={
        className ? `checkbox-container ${className}` : `checkbox-container`
      }
      style={style}
    >
      <input onChange={handleFilterChange} name={typeName} type={type} />
      <div className="checkmark"></div>

      {name}
    </label>
  );
}
