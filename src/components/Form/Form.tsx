import { type PropsWithChildren, type HTMLProps, forwardRef } from 'react';
import clsx from 'clsx';
import './form.css';

type FormProps = PropsWithChildren<HTMLProps<HTMLFormElement>>;

export const Form = forwardRef<HTMLFormElement, FormProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <form
        ref={ref}
        className={clsx('form', className)}
        {...props}
      >
        {children}
      </form>
    );
  }
);
