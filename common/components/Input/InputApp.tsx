import type {
  FieldPath,
  FieldValues,
  UseControllerProps,
} from 'react-hook-form';
import { Controller } from 'react-hook-form';
import type { InputProps } from '@material-ui/core';
import {
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
} from '@material-ui/core';
import cls from 'classnames';
import type { TFunction } from 'i18next';
import { openSans } from '../../../pages/_app';
import { InputError } from './InputError';
import React, { useState } from 'react';
import PasswordVisibleIcon from '../../assets/svg/PasswordVisibleIcon.svg';
import PasswordHiddenIcon from '../../assets/svg/PasswordHiddenIcon.svg';

export const InputApp = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>({
  name,
  rules,
  shouldUnregister,
  defaultValue,
  control,
  className,
  inputProps,
  label,
  handleError = true,
  ...muiInputProps
}: UseControllerProps<TFieldValues, TName> &
  InputProps & {
    label?: string;
    handleError?: boolean;
  }) => {
  const passwordProps = usePasswordInput();
  return (
    <Controller
      {...{ name, rules, shouldUnregister, defaultValue, control }}
      render={({ field, fieldState }) => (
        <>
          {label && (
            <InputLabel className={'inputLabel'} htmlFor={name}>
              {label}
            </InputLabel>
          )}
          <Input
            className={cls(
              'inputApp',
              fieldState.error && 'inputAppError',
              openSans.className,
              className,
            )}
            id={field.name}
            disableUnderline
            inputProps={{ ...field, ...inputProps }}
            inputRef={field.ref}
            {...muiInputProps}
            {...(muiInputProps.type == 'password' ? passwordProps : {})}
          />
          {handleError && <InputError error={fieldState.error} />}
        </>
      )}
    />
  );
};

const usePasswordInput = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  return {
    type: passwordVisible ? 'text' : 'password',
    endAdornment: (
      <InputAdornment
        onClick={() => setPasswordVisible((prev) => !prev)}
        position="end"
      >
        <IconButton size={'small'}>
          {passwordVisible ? <PasswordVisibleIcon /> : <PasswordHiddenIcon />}
        </IconButton>
      </InputAdornment>
    ),
  };
};

const emailRegex = /^[\w+]+([.-]?[\w+]+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

export const emailRules = {
  required: true,
  pattern: { value: emailRegex, message: 'Errors.email' },
};

export const passwordRules = (t: TFunction) => ({
  required: true,
  ...getLengthRule(t, 'minLength', 8),
  pattern: { value: /[^A-Za-z0-9]/, message: 'Errors.password' },
});

export const getLengthRule = (
  t: TFunction,
  rule: 'minLength' | 'maxLength',
  value: number,
) => {
  return { [rule]: { value, message: t(rule, { length: value }) } };
};

export const repeatPasswordRules = (getPassword: () => string) => ({
  required: true,
  validate: (repeatPassword: string) =>
    repeatPassword !== getPassword() ? 'Errors.repeatPassword' : undefined,
});
