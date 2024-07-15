import { useTranslation } from 'next-i18next';
import { useOpenPopup } from '../../../common/components/Popups/hooks/useOpenPopup';
import UserProfile from '../../UserProfile/UserProfile';
import { Typography } from '@material-ui/core';
import {
  StyledTabRow,
  StyledTabs,
  StyledVerticalTab,
} from '../../UserProfilePage/components/ExtendedUserInfo';
import type { TFuncKey } from 'i18next';

export const SettingsTabs = ({
  currentTab,
  setCurrentTab,
  tabs,
}: {
  currentTab: number;
  setCurrentTab: (newTab: number) => void;
  tabs: { title: TFuncKey; status?: TFuncKey }[];
}) => {
  const { t } = useTranslation();
  const openLogoutPopup = useOpenPopup('logout');

  return (
    <div className="settings-side">
      <UserProfile />
      <div className="recommendedUsersContainer">
        <div>
          <Typography className="recommendedUsersTitle">
            {t(tabs[currentTab].title)}
          </Typography>
        </div>
        <div className="recommendedUsersCard settings-tabs">
          <StyledTabs
            orientation="vertical"
            variant="standard"
            indicatorColor="primary"
            value={currentTab}
            onChange={(event, newTab) =>
              newTab < tabs.length - 1
                ? setCurrentTab(newTab)
                : openLogoutPopup()
            }
            aria-label="vertical content tabs"
          >
            {tabs.map((el, i) => (
              <StyledVerticalTab
                key={i}
                label={<StyledTabRow caption={el.title} status={el.status} />}
              />
            ))}
          </StyledTabs>
        </div>
      </div>
    </div>
  );
};
