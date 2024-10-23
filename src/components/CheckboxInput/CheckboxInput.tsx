import { type HTMLProps, forwardRef } from 'react';
import clsx from 'clsx';
import './checkbox-input.css';
import { useFormField } from '../FormField/form-field-context';

type CheckboxInputProps = HTMLProps<HTMLInputElement>;

export const CheckboxInput = forwardRef<HTMLInputElement, CheckboxInputProps>(
  ({ className, checked, ...props }, ref) => {
    const { inputProps } = useFormField();

    return (
      <input
        className={clsx('checkbox-input', className)}
        type="checkbox"
        ref={ref}
        checked={checked}
        {...inputProps}
        {...props}
      />
    );
  }
);
