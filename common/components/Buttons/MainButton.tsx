import type { ButtonProps } from '@material-ui/core';
import { Button } from '@material-ui/core';
import cls from 'classnames';

export interface IMainButtonProps extends ButtonProps {
  text?: string;
}

export const MainButton = ({ text, ...props }: IMainButtonProps) => {
  return (
    <Button
      disableFocusRipple
      color="primary"
      variant="contained"
      {...props}
      className={cls(
        'mainButton',
        props.variant == 'outlined' ? 'mainOutlinedButton' : '',
        props.className,
      )}
    >
      {props.children || <p>{text}</p>}
    </Button>
  );
};
