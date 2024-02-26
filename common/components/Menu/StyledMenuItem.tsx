import { MenuItem, withStyles } from '@material-ui/core';
import React from 'react';

const StyledMenuItem = withStyles({
  root: {
    width: 203,
    paddingTop: 12,
    height: 53,
    paddingBottom: 13,
    borderRadius: '6px 6px 0px 0px',
    backgroundColor: '#f7f7f7',
    '&:last-child': {
      paddingTop: 9,
      '& > a': {
        whiteSpace: 'normal',
      },
    },
    '& > a': {
      width: 149,
      height: 15,
      color: '#494949',
      fontSize: 12,
      fontWeight: 700,
    },
    '& > div': {
      minWidth: 34,
    },
  },
})((props) => <MenuItem {...props} />);

export default StyledMenuItem;
