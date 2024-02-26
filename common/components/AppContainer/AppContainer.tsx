import type { ReactElement, ReactNode } from 'react';
import { memo } from 'react';
import { Container } from '@material-ui/core';

interface AppContainerProps {
  leftSide?: ReactNode;
  main: ReactNode;
  rightSide?: ReactNode;
  className?: string;
  options?: {
    leftSide: {
      className: string;
    };
    main: {
      className: string;
    };
    rightSide: {
      className: string;
    };
  };
}

const AppContainer = ({
  leftSide,
  main,
  rightSide,
  className,
  options,
}: AppContainerProps): ReactElement => (
  <Container>
    <div className={`app-container ${className}`}>
      {!options ? (
        <>
          <aside className="left-side">{leftSide}</aside>
          <main className="main">{main}</main>
          <aside className="right-side">{rightSide}</aside>
        </>
      ) : (
        <>
          <aside className={`left-side ${options.leftSide.className}`}>
            {leftSide}
          </aside>
          <main className={`main ${options.main.className}`} id="main">
            {main}
          </main>
          <aside className={`right-side ${options.rightSide.className}`}>
            {rightSide}
          </aside>
        </>
      )}
    </div>
  </Container>
);

export default memo(AppContainer);
