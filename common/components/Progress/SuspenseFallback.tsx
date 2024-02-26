import React, { memo } from 'react';

import RatersLogoTransparent from '../../assets/svg/RatersLogoTransparent4x-xxxhdpi.svg';

function SuspenseFallback() {
  return (
    <div className="suspense-container">
      <div className="suspense-fallback-content-wrapper">
        <div className="raters-logo-box">
          <RatersLogoTransparent />
        </div>
        <div className="suspense-title-wrapper">
          <p className="suspense-fallback-title">Loading</p>
          <div className="suspense-loading-animation-wrapper">
            <span />
            <span />
            <span />
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(SuspenseFallback);
