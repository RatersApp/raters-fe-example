import { memo, useCallback, useState } from 'react';
import {
  AppBar,
  Button,
  FormControl,
  IconButton,
  MenuItem,
  Select,
  Toolbar,
  Tooltip,
  Typography,
} from '@material-ui/core';
import { useTranslation } from 'next-i18next';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import TransparentRatersLogo from '../../../common/assets/svg/RatersLogoIcon.svg';
import SearchIcon from '../../../common/assets/svg/SearchIcon.svg';
import SearchIconSolid from '../../../common/assets/svg/SearchIconSolid.svg';
import Vector from '../../../common/assets/svg/Vector.svg';
import GetAppButton from '../../../common/components/Buttons/GetAppButton';
import { languageCodes } from '../../config/strings';
import type { NextRouter } from 'next/router';
import { useRouter } from 'next/router';
import { dataLayerPush } from '../../helpers/dataLayerHelper';
import { usePushLogin } from '../../../features/Auth/common/hooks';
import { syncStorage } from '../../helpers/syncStorage';

const GuestAppBar = () => {
  const [searchIconHovered, setSearchIconHovered] = useState(false);

  const { t, i18n } = useTranslation();
  const { query, push, pathname, asPath }: NextRouter = useRouter();

  const currentLanguage = i18n.language as keyof typeof languageCodes;

  const [language, setLanguage] = useState(currentLanguage);

  const { pushLogin } = usePushLogin();
  const handleRedirect = useCallback(
    (route: string) => {
      return async () => {
        await push(route);
      };
    },
    [push],
  );

  const handleSearchIconHover = useCallback(() => {
    setSearchIconHovered(true);
  }, []);

  const handleSearchMouseOut = useCallback(() => {
    setSearchIconHovered(false);
  }, []);

  return (
    <>
      <AppBar
        className={'guestHeaderAppBar'}
        position="absolute"
        elevation={0}
        color="transparent"
      >
        <Toolbar
          variant="dense"
          disableGutters
          className="headerToolBar"
          style={{ boxShadow: 'none', backgroundColor: 'transparent' }}
        >
          <IconButton
            onClick={() => {
              dataLayerPush('home_logo_click');
              handleRedirect('/')();
            }}
            disableFocusRipple
            disableRipple
            className="headerRatersLogo"
            edge="start"
          >
            <TransparentRatersLogo />
            <div className="hide-on-sm-down">
              <Typography className={'logoTitle'}>{'Raters'}</Typography>
            </div>
          </IconButton>
          <div className="appBarGuestUserActions">
            <Tooltip title={t('Search.Title')}>
              <IconButton
                onMouseEnter={handleSearchIconHover}
                onMouseLeave={handleSearchMouseOut}
                disableRipple
                className="appBarSearchIcon disableHover"
                onClick={() => {
                  dataLayerPush('search_tab_click');
                  handleRedirect('/search')();
                }}
              >
                {searchIconHovered || pathname === '/search' ? (
                  <SearchIconSolid />
                ) : (
                  <SearchIcon />
                )}
              </IconButton>
            </Tooltip>
            <Typography
              onClick={() => {
                dataLayerPush('collections_tab_click');
                handleRedirect('/collections')();
              }}
              className={'signInHeaderButton'}
            >
              {t('NewSearch.MovieLists')}
            </Typography>
            <Typography
              onClick={() => {
                dataLayerPush('genres_tab_click');
                handleRedirect('/genres')();
              }}
              className={'signInHeaderButton'}
            >
              {t('NewExplore.Genres')}
            </Typography>
            <GetAppButton />
            <FormControl style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Vector />
              <Select
                id="select"
                defaultValue={language}
                className="dropdown dropdownHeader"
                value={languageCodes[language]}
                onChange={async (event) => {
                  dataLayerPush('language_click');
                  const locale = event.target
                    .value as keyof typeof languageCodes;
                  syncStorage.userLang = locale;
                  push({ pathname, query }, asPath, {
                    locale,
                  }).then(() => setLanguage(locale));
                }}
                renderValue={() => languageCodes[language]}
                IconComponent={(props) => (
                  <KeyboardArrowDownIcon
                    style={{ marginTop: '2px', right: '-3px' }}
                    {...props}
                    fontSize={'small'}
                  />
                )}
              >
                {Object.entries(languageCodes).map(([code, name]) => (
                  <MenuItem
                    key={code}
                    className={'signInHeaderButton'}
                    value={code}
                  >
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button
              style={{ fontSize: '14px' }}
              color="primary"
              className={'postReviewButton'}
              onClick={() => {
                pushLogin();
                dataLayerPush('login_initiated');
              }}
              variant="contained"
            >
              {t('Landing.Login.Mobile')}
            </Button>
          </div>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default memo(GuestAppBar);
