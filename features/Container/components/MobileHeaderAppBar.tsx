import { useCallback, useEffect, useState } from 'react';
import {
  AppBar,
  Tab,
  Tabs,
  Toolbar,
  withStyles,
} from '@material-ui/core';
import Feed from '../../../common/assets/svg/Feeds.svg';
import FeedSolid from '../../../common/assets/svg/Feeds solid.svg';
import Explore from '../../../common/assets/svg/Explore.svg';
import ExploreSolid from '../../../common/assets/svg/Explore solid.svg';
import SearchIcon from '../../../common/assets/svg/SearchIcon.svg';
import NotificationIcon from '../../../common/assets/svg/NotificationIcon.svg';
import SearchIconSolid from '../../../common/assets/svg/SearchIconSolid.svg';
import NotificationIconSolid from '../../../common/assets/svg/NotificationIconSolid.svg';
import { useRouter } from 'next/router';
import { dataLayerPush } from '../../../common/helpers/dataLayerHelper';

const StyledTabs = withStyles((theme) => ({
  flexContainer: {
    '& > button': {
      '@media(min-width: 600px)': {
        minWidth: '75px',
      },
    },
  },
  indicator: {
    display: 'flex',
    justifyContent: 'center',
    height: '3px',
    backgroundColor: 'transparent',
    '& > span': {
      backgroundColor: theme.palette.primary.main,
      borderRadius: '2px 2px 0 0',
      width: '78px',
    },
  },
}))((props) => (
  <Tabs
    {...props}
    TabIndicatorProps={{
      children:
        props.pathname === '/feed' ||
        props.pathname === '/explore' ||
        props.pathname === '/search' ||
        props.pathname.match('/users/') ? (
          <span />
        ) : (
          <></>
        ),
    }}
  />
));

const StyledTab = withStyles((theme) => ({
  root: {
    textTransform: 'none',
    height: 20,
    color: theme.palette.primary.light,
    fontFamily: 'Montserrat',
    fontWeight: 400,
    fontSize: theme.typography.pxToRem(16),
    marginRight: theme.spacing(1),
    '&:focus': {
      opacity: 1,
    },
  },
}))((props) => (
  <Tab
    style={{
      color:
        props.pathname === '/feed' || props.pathname === '/explore'
          ? ''
          : '#848C9B',
    }}
    disableRipple
    {...props}
  />
));

const MobileHeaderAppBar = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const [notcon, setNotCon] = useState(false);

  const [showPromo] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const height = document.getElementById('appBar')?.offsetHeight;
    if (height) {
      document.getElementById('app').style.paddingTop = height + 'px';
    }
  }, [showPromo, router.pathname]);

  useEffect(() => {
    if (router.pathname === '/feed') {
      setCurrentTab(0);
    } else if (router.pathname === '/explore') {
      setCurrentTab(1);
    } else if (router.pathname === '/search') {
      setCurrentTab(2);
    }
  }, [router.pathname]);

  const handleChange = useCallback(
    (event, newValue) => {
      setCurrentTab(newValue);
    },
    [setCurrentTab],
  );

  const handleRedirectToFeed = useCallback(async () => {
    setCurrentTab(0);
    dataLayerPush('feed_tab_click');
    await router.push('/feed');
  }, [router.pathname, currentTab]);

  const handleRedirectToCollection = useCallback(async () => {
    setCurrentTab(2);
    await router.push('/search');
    dataLayerPush('search_tab_click');
  }, [router.pathname, currentTab]);

  const handleRedirectToExplore = useCallback(async () => {
    setCurrentTab(1);
    await router.push('/explore');
    dataLayerPush('recs_tab_click');
  }, [router.pathname, currentTab]);

  return (
    <>
      <AppBar position="fixed" elevation={0} color="transparent" id="appBar">
        <Toolbar variant="dense" disableGutters className="headerToolBar">
          <StyledTabs
            pathname={router.pathname}
            not={notcon}
            className="tabsRoot"
            value={currentTab}
            onChange={handleChange}
          >
            <StyledTab
              onClick={handleRedirectToFeed}
              className="appBarTab op1"
              pathname={router.pathname}
              label={
                <>{router.pathname === '/feed' ? <FeedSolid /> : <Feed />}</>
              }
            />
            <StyledTab
              onClick={handleRedirectToExplore}
              className="appBarTab op1"
              label={
                <>
                  {router.pathname === '/explore' ? (
                    <ExploreSolid />
                  ) : (
                    <Explore />
                  )}
                </>
              }
            />
            <StyledTab
              className="appBarTab op1"
              onClick={handleRedirectToCollection}
              disableFocusRipple
              label={
                <>
                  {router.pathname === '/search' ? (
                    <SearchIconSolid />
                  ) : (
                    <SearchIcon />
                  )}
                </>
              }
            />
            <div
              onClick={() => setNotCon(!notcon)}
              style={{
                display: 'flex',
                alignItems: 'center',
                marginTop: 4,
              }}
            >
              {notcon ? (
                <div style={{ height: 24 }}>
                  <NotificationIconSolid />
                </div>
              ) : (
                <div style={{ height: 24 }}>
                  <NotificationIcon />
                </div>
              )}
            </div>
          </StyledTabs>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default MobileHeaderAppBar;
