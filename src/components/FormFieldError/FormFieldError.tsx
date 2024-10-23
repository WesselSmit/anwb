import { type HTMLAttributes, type PropsWithChildren, useEffect, forwardRef } from 'react';
import clsx from 'clsx';
import './form-field-error.css';
import { useFormField } from '../FormField/form-field-context';

type FormFieldErrorProps = PropsWithChildren<Omit<HTMLAttributes<HTMLParagraphElement>, 'id'>>;

export const FormFieldError = forwardRef<HTMLParagraphElement, FormFieldErrorProps>(
  ({ children, className, ...props }, ref) => {
    const { registerError, errorProps } = useFormField();

    useEffect(() => {
      registerError(true);

      return () => registerError(false);
    }, []);

    return (
      <p
        className={clsx(className, 'form-field-error')}
        {...errorProps}
        {...props}
        ref={ref}
        role="alert"
      >
        {children}
      </p>
    );
  }
);
