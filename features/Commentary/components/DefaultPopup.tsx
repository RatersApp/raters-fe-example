import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import CloseButtonIcon from '../../../common/assets/svg/closeButton.svg';

DefaultPopup.propTypes = {};

function DefaultPopup({ title, children, handleClose }) {
  return (
    <div className="recommendedUsersPopupContent">
      <div className="ratePopupControlSection">
        <button
          onClick={handleClose}
          type="button"
          className="handleCloseRatePopup"
        >
          <CloseButtonIcon />
        </button>
      </div>
      <Typography className="recommendedUsersPopupTitle">{title}</Typography>
      {children}
    </div>
  );
}

export default DefaultPopup;
