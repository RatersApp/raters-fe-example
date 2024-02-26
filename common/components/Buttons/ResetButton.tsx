import type { ButtonProps } from '@material-ui/core';
import { Button } from '@material-ui/core';
import cls from 'classnames';

export interface IResetButtonProps extends ButtonProps {
  text?: string;
}

export const ResetButton = ({ text, ...props }: IResetButtonProps) => {
  return (
    <Button
      disableFocusRipple
      color="primary"
      variant="outlined"
      {...props}
      className={cls(
        'resetButton',
        props.variant == 'outlined' ? 'mainOutlinedButton' : '',
        props.className,
      )}
    >
      {props.children || <p>{text}</p>}
    </Button>
  );
};
