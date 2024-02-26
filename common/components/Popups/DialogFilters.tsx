import React, { memo } from 'react';
import Popup from './components/Popup';
import ExploreFilters from '../../../features/Explore/components/ExploreFilters';

interface DialogFiltersProps {
  isOpen: boolean;
  setOpenFilterPopup: (status: boolean) => void;
}

const DialogFilters = ({ isOpen, setOpenFilterPopup }: DialogFiltersProps) => {
  return (
    <Popup isOpen={isOpen} handleClose={() => setOpenFilterPopup(false)}>
      <div className="collectionsMobileFilters">
        <ExploreFilters callback={() => setOpenFilterPopup(false)} />
      </div>
    </Popup>
  );
};

export default memo(DialogFilters);
