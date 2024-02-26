import { CircularProgress } from '@material-ui/core';

export const Loader = () => {
  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        marginTop: '20px',
      }}
    >
      <CircularProgress color="primary" />
    </div>
  );
};
