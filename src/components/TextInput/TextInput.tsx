import { forwardRef, useEffect, type HTMLProps } from 'react';
import clsx from 'clsx';
import './text-input.css';
import { useFormField } from '../FormField/form-field-context';

type TextInputProps = HTMLProps<HTMLInputElement> & {
  isValid?: boolean;
};

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ className, disabled, required, ...props }, ref) => {
    const { inputProps, registerDisabled, registerRequired } = useFormField();

    useEffect(() => {
      if (disabled) {
        registerDisabled(true);
      }

      if (required) {
        registerRequired(true);
      }

      return () => {
        registerDisabled(false);
        registerRequired(false);
      }
    }, [disabled, required]);

    return (
      <input
        ref={ref}
        className={clsx('text-input', className)}
        {...inputProps}
        {...props}
        disabled={disabled}
      />
    );
  },
);
