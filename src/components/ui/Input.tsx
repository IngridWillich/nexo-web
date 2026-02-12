import { forwardRef, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  touched?: boolean;
  required?: boolean;
  optional?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  error,
  touched,
  required = false,
  optional = false,
  className = "",
  ...props
}, ref) => {
  const hasError = touched && error;
  
  const baseClasses = "w-full rounded-lg border px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed";
  
  const stateClasses = hasError
    ? "border-red-300 focus:border-red-500 focus:ring-red-500/20"
    : "border-gray-300 focus:border-blue-500 focus:ring-blue-500/20";

  return (
    <div className="space-y-1.5">
      {label && (
        <label className="text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
          {optional && <span className="text-gray-400 text-xs ml-2">(opcional)</span>}
        </label>
      )}
      <input
        ref={ref}
        className={`${baseClasses} ${stateClasses} ${className}`}
        {...props}
      />
      {hasError && error && (
        <p className="text-xs text-red-600 mt-1 animate-slideDown">
          {error}
        </p>
      )}
    </div>
  );
});

Input.displayName = "Input";

export default Input;