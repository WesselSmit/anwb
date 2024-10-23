import { forwardRef, type HTMLProps, type PropsWithChildren } from 'react';
import clsx from 'clsx';
import './form-field-label.css';
import { useFormField } from '../FormField/form-field-context';

type FormFieldLabelProps = PropsWithChildren<Omit<HTMLProps<HTMLLabelElement>, 'id'>>

export const FormFieldLabel = forwardRef<HTMLLabelElement, FormFieldLabelProps>(
  ({ className, children, ...props }, ref) => {
    const { labelProps } = useFormField();

    return (
      <label
        ref={ref}
        className={clsx('form-field-label', className)}
        {...labelProps}
        {...props}
      >
        {children}
        {labelProps.required && <span>{' '}*</span>}
      </label>
    );
  },
);
