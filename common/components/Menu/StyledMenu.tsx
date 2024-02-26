import { Menu, withStyles } from '@material-ui/core';
import React from 'react';

const StyledMenu = withStyles((theme) => ({
  paper: {
    width: 203,
    boxShadow: '0px 4px 20px rgba(28, 67, 104, 0.2)',
    borderRadius: 6,
    top: '19px !important',
    marginTop: theme.spacing(9),
    backgroundColor: '#ffffff',
    marginRight: theme.spacing(2),
    '& > ul': {
      paddingTop: 0,
      paddingBottom: 0,
    },
  },
}))((props) => (
  <Menu
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'center',
      horizontal: 'right',
    }}
    {...props}
  />
));

export default StyledMenu;
