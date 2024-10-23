import { type PropsWithChildren, type HTMLAttributes, forwardRef } from 'react';
import clsx from 'clsx';
import { FormFieldProvider } from './form-field-context';
import './form-field.css';

type FormFieldProps = PropsWithChildren<HTMLAttributes<HTMLDivElement>> & {
  id?: string;
}

export const FormField = forwardRef<HTMLDivElement, FormFieldProps>(
  ({ className, id, children, ...props }, ref) => {
    return (
      <FormFieldProvider id={id}>
        <div
          ref={ref}
          className={clsx('form-field', className)}
          {...props}
        >
          {children}
        </div>
      </FormFieldProvider>
    );
  }
);
