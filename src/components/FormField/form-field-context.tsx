import { createContext, type PropsWithChildren, useContext, useState } from 'react';
import { nanoid } from 'nanoid';

type Props = Record<string, string | boolean | undefined>;

const FormFieldContext = createContext<{
  inputProps: Props;
  labelProps: Props;
  errorProps: Props;
  registerError: (value: boolean) => void;
  registerDisabled: (value: boolean) => void;
  registerRequired: (value: boolean) => void;
}>({
  inputProps: {},
  labelProps: {},
  errorProps: {},
  registerError: () => null,
  registerDisabled: () => null,
  registerRequired: () => null,
});

type FormFieldProviderProps = {
  id?: string;
};

export const FormFieldProvider = ({ children, id }: PropsWithChildren<FormFieldProviderProps>) => {
  const [hasError, setHasError] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isRequired, setIsRequired] = useState(false);
  const inputId = id ? `${id}-${nanoid()}` : nanoid();
  const labelId = id ? `${id}-${nanoid()}` : nanoid();
  const errorId = id ? `${id}-${nanoid()}` : nanoid();

  const inputProps = {
    'id': inputId,
    'aria-describedby':[hasError && errorId].filter(Boolean).join(' ') || undefined,
    'disabled': isDisabled,
  };

  const labelProps = {
    id: labelId,
    htmlFor: inputId,
    ...(isRequired && { required: true }),
  };

  const errorProps = {
    id: errorId,
  };

  // 'value' is needed because we also need to be able to indicate that the error is gone
  function registerError(value: boolean) {
    setHasError(value);
  }

  // 'value' is needed because we also need to be able to indicate when its not disabled anymore
  function registerDisabled(value: boolean) {
    setIsDisabled(value);
  }

  // 'value' is needed because we also need to be able to indicate when its not required anymore
  function registerRequired(value: boolean) {
    setIsRequired(value);
  }

  return (
    <FormFieldContext.Provider
      value={{
        inputProps,
        labelProps,
        errorProps,
        registerError,
        registerDisabled,
        registerRequired,
      }}
    >
      {children}
    </FormFieldContext.Provider>
  );
};

export const useFormField = () => {
  const context = useContext(FormFieldContext);

  if (!context) {
    throw new Error('useFormField must be used within a FormFieldContext');
  }

  return context;
};
