import { CircularProgress, withStyles } from '@material-ui/core';
import type { IMainButtonProps } from './MainButton';
import { MainButton } from './MainButton';

export interface ILoadingButtonProps extends IMainButtonProps {
  isLoading: boolean;
  loaderColor?: string;
}

export const LoadingButton = ({
  isLoading,
  disabled,
  children,
  loaderColor,
  ...buttonProps
}: ILoadingButtonProps) => {
  const color =
    loaderColor || buttonProps.variant != 'outlined' ? '#fff' : undefined;
  const ColoredCircularProgress = withStyles(() => ({
    root: {
      color: color ? color + ' !important' : undefined,
    },
  }))(CircularProgress);

  return (
    <MainButton {...buttonProps} disabled={isLoading || disabled}>
      {isLoading ? <ColoredCircularProgress size={20} /> : children}
    </MainButton>
  );
};
