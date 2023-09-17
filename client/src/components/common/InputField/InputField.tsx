"use client";

import * as React from "react";

import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";

export interface ICustomTextfieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  placeholder?: string;
  name?: string;
  className?: string;

  type: "text" | "password" | "email";

  onChange: any;
  onBlur?: any;
  helperText?: any;
  error?: any;
  inputProps?: any;

  autoFocus?: boolean;

  prependIcon?: React.ReactNode;
  appendIcon?: React.ReactNode;
}

export function InputField({
  label,
  placeholder,
  onChange,
  onBlur,
  name,
  className,
  type,
  helperText,
  error,
  prependIcon,
  appendIcon,
  autoFocus,
}: ICustomTextfieldProps) {
  return (
    <div className={className}>
      <FormControl fullWidth variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">{label} </InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          type={type}
          placeholder={placeholder}
          onChange={onChange}
          onBlur={onBlur}
          name={name}
          endAdornment={appendIcon}
          startAdornment={prependIcon}
          label={label}
          error={error}
          autoFocus={autoFocus}
        />

        {helperText && (
          <p className="text-red-600 font-semibold my-1"> {helperText} </p>
        )}
      </FormControl>
    </div>
  );
}
