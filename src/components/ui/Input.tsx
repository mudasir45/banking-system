import React, { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  helperText?: string;
  fullWidth?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      className = "",
      leftIcon,
      rightIcon,
      helperText,
      fullWidth = true,
      ...props
    },
    ref
  ) => {
    const inputClasses = `
      flex h-10 rounded-md border px-3 py-2 text-sm
      ${
        error
          ? "border-danger focus:border-danger focus:ring-danger"
          : "border-gray-300 focus:border-primary focus:ring-primary"
      }
      ${leftIcon ? "pl-10" : ""}
      ${rightIcon ? "pr-10" : ""}
      ${fullWidth ? "w-full" : ""}
      focus:outline-none focus:ring-1
      disabled:cursor-not-allowed disabled:opacity-50
      ${className}
    `;

    return (
      <div className={`space-y-1 ${fullWidth ? "w-full" : ""}`}>
        {label && (
          <label
            htmlFor={props.id}
            className="text-sm font-medium text-text-primary"
          >
            {label}
          </label>
        )}

        <div className="relative">
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-text-secondary">
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            className={inputClasses}
            aria-invalid={!!error}
            aria-describedby={props.id ? `${props.id}-error` : undefined}
            {...props}
          />

          {rightIcon && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-text-secondary">
              {rightIcon}
            </div>
          )}
        </div>

        {helperText && !error && (
          <p className="text-xs text-text-secondary">{helperText}</p>
        )}

        {error && (
          <p
            className="text-xs text-danger"
            id={props.id ? `${props.id}-error` : undefined}
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
