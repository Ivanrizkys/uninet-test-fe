import { forwardRef } from "react";
import { FieldError } from "react-hook-form";
import { Input, InputProps } from "@/components/ui/input";

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
        {error && (
          <p
            className="mt-1 text-xs text-destructive"
            role="alert"
          >
            {errorMessage ?? ""}
          </p>
        )}
      </div>
    );
  }
);

export default InputLabel;
