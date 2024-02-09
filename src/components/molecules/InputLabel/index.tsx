import { forwardRef } from "react";
import { Input, InputProps } from "@/components/ui/input";
import { FieldError } from "react-hook-form";

interface InputLabelProps extends InputProps {
  label: string;
  error?: FieldError;
  errorMessage?: string;
}

const InputLabel = forwardRef<HTMLInputElement, InputLabelProps>(
  (props, ref) => {
    const { error, errorMessage, label, className, name, ...resProps } = props;

    return (
      <div className={className}>
        <label htmlFor={name} className="text-sm text-muted-foreground">
          {label}
        </label>
        <Input className="w-full mt-2" name={name} ref={ref} {...resProps} />
        <p
          className={`mt-1 text-xs transition-opacity duration-500 text-destructive ${
            error ? "opacity-100" : "opacity-0"
          }`}
        >
          {errorMessage ?? ""}
        </p>
      </div>
    );
  }
);

export default InputLabel;
