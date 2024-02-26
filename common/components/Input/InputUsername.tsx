import { getLengthRule, InputApp } from './InputApp';
import { authApiClient } from '../../api/authApiClient';
import { useMemo } from 'react';
import { useTranslation } from 'next-i18next';
import type { UseControllerProps } from 'react-hook-form';
import type { FieldPath, FieldValues } from 'react-hook-form/dist/types';

export const InputUsername = <
  TFieldValues extends FieldValues & { username: string },
  TName extends FieldPath<TFieldValues>,
>({
  control,
  currentUsername,
  label,
  placeholder,
}: Partial<UseControllerProps<TFieldValues, TName>> & {
  currentUsername?: string;
  label: string;
  placeholder: string;
}) => {
  const { t } = useTranslation();
  const [checkHandler] = authApiClient.useCheckUsernameMutation();
  const debouncedCheck = useMemo(() => {
    let resolver: ((value: true) => void) | null = null;
    let timeoutId: NodeJS.Timeout | undefined;
    let resolvedValue = '';

    return (value?: string) => {
      return new Promise<string | true>((resolve) => {
        resolver?.(true);
        clearTimeout(timeoutId);
        resolver = resolve;
        timeoutId = setTimeout(
          () =>
            value && value != resolvedValue && value != currentUsername
              ? checkHandler({ username: value })
                  .unwrap()
                  .then(() => {
                    resolvedValue = value;
                    resolve(true);
                  })
                  .catch((e) => resolve(e.data.message.username[0]))
              : resolve(true),
          300,
        );
      });
    };
  }, []);

  return (
    <InputApp
      name={'username' as TName}
      placeholder={placeholder}
      label={label}
      control={control}
      rules={{
        ...getLengthRule(t, 'minLength', 3),
        ...getLengthRule(t, 'maxLength', 30),
        validate: debouncedCheck,
        required: true,
      }}
    />
  );
};
