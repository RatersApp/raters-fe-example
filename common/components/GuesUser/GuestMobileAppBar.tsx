import { memo, useCallback, useEffect, useState } from 'react';
import {
  AppBar,
  Button,
  IconButton,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Toolbar,
  Tooltip,
  Typography,
} from '@material-ui/core';
import { useTranslation } from 'next-i18next';
import Backdrop from '@mui/material/Backdrop';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import MenuIcon from '../../assets/svg/Menu.svg';
import CloseIcon from '../../assets/svg/Close.svg';
import SearchIcon from '../../../common/assets/svg/SearchIcon.svg';
import SearchIconSolid from '../../../common/assets/svg/SearchIconSolid.svg';
import Vector from '../../../common/assets/svg/Vector.svg';
import { languageCodes } from '../../config/strings';
import { useRouter } from 'next/router';
import TransparentRatersLogo from '../../../common/assets/svg/Sign.svg';
import { dataLayerPush } from '../../helpers/dataLayerHelper';
import PropTypes from 'prop-types';
import { usePushLogin } from '../../../features/Auth/common/hooks';
import { syncStorage } from '../../helpers/syncStorage';

const BackdropMenu = ({ withBackdrop, children, ...props }) =>
  withBackdrop ? (
    <Backdrop open={withBackdrop} {...props} transitionDuration={0}>
      {children}
    </Backdrop>
  ) : (
    <>{children}</>
  );

BackdropMenu.propTypes = {
  withBackdrop: PropTypes.bool,
  children: PropTypes.element,
};

const GuestMobileAppBar = () => {
  const [searchIconHovered, setSearchIconHovered] = useState(false);

  const { t, i18n } = useTranslation();
  const router = useRouter();
  const { pushLogin } = usePushLogin();
  const { pathname, asPath, query } = router;

  const [height, setHeight] = useState(60);

  const currentLanguage = i18n.language;

  const [language, setLanguage] = useState(currentLanguage);

  const [openSideMenu, setOpenSideMenu] = useState(false);

  const isFundraising = router.route.includes('/fundraising');
  const [showPromo, setShowPromo] = useState(!isFundraising);

  useEffect(() => {
    setShowPromo(!isFundraising);
  }, [isFundraising]);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setOpenSideMenu(open);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const htmlElement = document.querySelector('html');
      if (openSideMenu && !htmlElement.classList.contains('overflow-hidden')) {
        htmlElement.classList.add('overflow-hidden');
      } else {
        htmlElement.classList.remove('overflow-hidden');
      }
    }
  }, [openSideMenu]);

  useEffect(() => {
    const height = document.getElementById('appBar')?.offsetHeight;
    setHeight(height);
    if (height) {
      document.getElementById('app').style.paddingTop = height + 'px';
    }
  }, [showPromo, router.pathname]);

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      toggleDrawer(false);
    } else if (event.key === 'Escape') {
      toggleDrawer(false);
    }
  }

  const handleRedirect = useCallback(
    (route) => {
      return async () => {
        await router.push(route).then(toggleDrawer());
      };
    },
    [router],
  );

  const handleSearchIconHover = useCallback(() => {
    setSearchIconHovered(true);
  }, []);

  const handleSearchMouseOut = useCallback(() => {
    setSearchIconHovered(false);
  }, []);

  const [openedLangMenu, setOpenLangMenu] = useState(false);

  const handleOpenLanguageMenu = () => {
    dataLayerPush('language_click');
    setOpenLangMenu(!openedLangMenu);
  };

  return (
    <BackdropMenu
      withBackdrop={openSideMenu}
      sx={{ color: '#fff', zIndex: 999 }}
    >
      <AppBar
        className={'guestHeaderAppBar'}
        position="fixed"
        elevation={0}
        color="transparent"
        id="appBar"
      >
        <div
          style={{
            boxShadow: '0px 3px 5px #d2d9e1',
            width: '100%',
            zIndex: '999',
          }}
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
              edge="start"
            >
              <TransparentRatersLogo />
              <Typography className={'logoTitle'}>{'Raters'}</Typography>
            </IconButton>
            <div className="appBarGuestUserActions" style={{ maxWidth: '52%' }}>
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
                  {searchIconHovered || router.pathname === '/search' ? (
                    <SearchIconSolid />
                  ) : (
                    <SearchIcon />
                  )}
                </IconButton>
              </Tooltip>
              <Typography
                className={'signInHeaderButton'}
                onClick={() => {
                  pushLogin();
                  dataLayerPush('login_initiated');
                }}
                variant="contained"
              >
                {t('Landing.Login.Mobile')}
              </Typography>
              <IconButton
                style={{ maxWidth: '30px', padding: '0' }}
                onClick={toggleDrawer(!openSideMenu)}
              >
                {openSideMenu ? <CloseIcon /> : <MenuIcon />}
              </IconButton>
            </div>
          </Toolbar>
          {router.pathname === '/genres/[...slug]' && (
            <MobileAllCollections type="genre" />
          )}
          {router.pathname === '/collections/[...slug]' && (
            <MobileAllCollections type="collection" />
          )}
        </div>
        <Popper
          open={openSideMenu}
          role={undefined}
          placement="bottom-start"
          transition
          disablePortal
          style={{
            width: '100%',
            top: `${height}px`,
            position: 'absolute',
            boxShadow: '0px 3px 5px #d2d9e1 inse',
          }}
        >
          <Paper className={'headerMobileMenu'}>
            <MenuList
              autoFocusItem={openSideMenu}
              id="composition-menu"
              aria-labelledby="composition-button"
              onKeyDown={handleListKeyDown}
              className={'headerMobileMenuList'}
            >
              <MenuItem disableRipple>
                <Typography
                  onClick={() => {
                    dataLayerPush('collections_tab_click');
                    handleRedirect('/collections')();
                  }}
                  className={'signInHeaderButton'}
                  style={{ fontSize: '16px' }}
                >
                  {t('NewSearch.MovieLists')}
                </Typography>
              </MenuItem>
              <MenuItem disableRipple>
                <Typography
                  onClick={() => {
                    dataLayerPush('genres_tab_click');
                    handleRedirect('/genres')();
                  }}
                  className={'signInHeaderButton'}
                  style={{ fontSize: '16px' }}
                >
                  {t('NewExplore.Genres')}
                </Typography>
              </MenuItem>
              <MenuItem disableRipple>
                <Button
                  id="demo-customized-button"
                  aria-controls="demo-customized-menu"
                  aria-haspopup="true"
                  variant="contained"
                  disableElevation
                  disableRipple
                  className={'signInHeaderButton'}
                  style={{
                    padding: 0,
                    textTransform: 'none',
                    fontSize: '16px',
                  }}
                  endIcon={<KeyboardArrowDownIcon style={{ width: '20px' }} />}
                  startIcon={<Vector style={{ width: '20px' }} />}
                  onClick={handleOpenLanguageMenu}
                >
                  {languageCodes[language]}
                </Button>
              </MenuItem>
              {openedLangMenu && (
                <MenuItem disableRipple>
                  <MenuList
                    open={openedLangMenu}
                    className={'mobileGuestHeaderLanguages'}
                    renderValue={() => i18n.language}
                    IconComponent={(props) => (
                      <KeyboardArrowDownIcon
                        style={{ marginTop: '2px' }}
                        {...props}
                        fontSize={'small'}
                      />
                    )}
                  >
                    {Object.entries(languageCodes).map(([code, name]) => (
                      <MenuItem
                        onClick={async () => {
                          syncStorage.userLang = code;
                          router
                            .push({ pathname, query }, asPath, { locale: code })
                            .then(() => setLanguage(name));
                        }}
                        key={code}
                        className={'signInHeaderButton'}
                        value={code}
                      >
                        {name}
                      </MenuItem>
                    ))}
                  </MenuList>
                </MenuItem>
              )}
            </MenuList>
          </Paper>
        </Popper>
      </AppBar>
    </BackdropMenu>
  );
};

export default memo(GuestMobileAppBar);
