import type { FC } from 'react';
import React, { memo, useState } from 'react';
import AppContainer from '../../common/components/AppContainer/AppContainer';
import Account from './components/Account';
import TabPanel from '../../common/components/TabPanel/TabPanel';
import EditProfile from './components/EditProfile';
import Country from './components/Country';
import FooterMarketPlace from '../Container/components/FooterMarketPlace';
import { SettingsTabs } from './components/SettingsTabs';
import { Email } from './components/Email';
import type { TFuncKey } from 'i18next';
import { Password } from './components/Password';
import { apiClient } from '../../common/api/apiClient';
import type { IMyProfile } from '../../common/api/apiTypes';
import Web3Connect from './components/Web3Connect';
import { Actors } from '../Auth/components/ICP/Actor';
import { InternetIdentityProvider } from 'ic-use-internet-identity';

const Settings = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const { data } = apiClient.endpoints.myProfile.useQuery();
  const user = data?.data;

  const tabs: {
    title: TFuncKey;
    Component: FC<{ user: IMyProfile }>;
    status?: TFuncKey;
  }[] = [
    { title: 'Settings.ProfileSection', Component: EditProfile },
    { title: 'Settings.password.tab', Component: Password },
    {
      title: 'Settings.email.tab',
      status: !user?.emailVerified ? 'Settings.email.tab.status' : undefined,
      Component: Email,
    },
    { title: 'Web.Settings.CountryLanguage', Component: Country },
    { title: 'Settings.web3.tab', Component: Web3Connect },
    { title: 'Account.Title', Component: Account },
    { title: 'Settings.LogOut', Component: () => null },
  ];

  return (
    <InternetIdentityProvider>
      <Actors>
        <AppContainer
          className="settings"
          leftSide={
            <div className="flex-space-between">
              <SettingsTabs
                tabs={tabs}
                currentTab={currentTab}
                setCurrentTab={setCurrentTab}
              />
              <div style={{ marginTop: 'auto' }}>
                <FooterMarketPlace className="hide-on-sm-down" />
              </div>
            </div>
          }
          main={
            <>
              <div className="show-on-sm-down">
                <SettingsTabs
                  tabs={tabs}
                  currentTab={currentTab}
                  setCurrentTab={setCurrentTab}
                />
              </div>
              {tabs.slice(0, -1).map(({ Component }, i) => (
                <TabPanel key={i} index={i} value={currentTab}>
                  {user ? <Component user={user} /> : null}
                </TabPanel>
              ))}
              <div className="show-on-sm-down">
                <FooterMarketPlace />
              </div>
            </>
          }
          rightSide={<></>}
          options={{
            leftSide: {
              className: 'content-space-between hide-on-sm-down',
            },
            main: {
              className: '',
            },
            rightSide: {
              className: 'hide-on-lg-down',
            },
          }}
        />
      </Actors>
    </InternetIdentityProvider>
  );
};

export default memo(Settings);
