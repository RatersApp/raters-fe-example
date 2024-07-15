import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
  useRef,
} from 'react';
import dynamic from 'next/dynamic';
import { string, number, shape, bool } from 'prop-types';
import {
  Box,
  ButtonBase,
  IconButton,
  Typography,
  Tooltip,
} from '@material-ui/core';
import ReactStars from 'react-stars';
import { useTranslation } from 'next-i18next';

// utils
import { getDifferenceInDays } from '../../../common/helpers/dateUtils';

// components
import UserInfoCommentarySection from './UserInfoCommentarySection';
import CommentsIcon from '../../../common/assets/svg/CommentsLogo.svg';
import HeartIcon from '../../../common/assets/svg/HeartLogo.svg';
import { useDispatch } from 'react-redux';
import { likeUnlikeMovie } from '../../Movie/duck/movieActions';
import CommentaryLink from '../../../common/components/Links/CommentaryLink';
import HeartLikedIcon from '../../../common/assets/svg/HeartLikedIcon.svg';
import CryptoLike from '../../../common/assets/svg/CryptoLike.svg';
import VerifiedICon from '../../../common/assets/svg/VerifiedIcon.svg';
import AvaStormtrooper from '../../../common/assets/svg/AvaStormtrooper.svg';
import Description from './Description';
import { usePushLogin } from '../../Auth/common/hooks';
import classNames from 'classnames';
import { openSans } from '../../../pages/_app';
import { useSyncStorage } from '../../../common/helpers/syncStorage';
import { CryptoLikePopup } from '../../Movie/components/CryptoLike';
import { apiClient } from '../../../common/api/apiClient';
import CanisterModal from './CanisterModal';

const PopupSlide = dynamic(
  () => import('../../../common/components/Popups/components/PopupSlide'),
  {
    ssr: false,
  },
);

function UserReview({
  rating,
  createdAt,
  type,
  user,
  description,
  isFeed,
  isLiked,
  id,
  isGuestUser,
  feedUrl,
  descriptionLang,
  lang,
  nativeLang,
  isTranslationActive,
  isSpoilers,
  item,
}) {
  const { t } = useTranslation();
  const { pushLogin } = usePushLogin();

  const [liked, setLiked] = useState(isLiked);

  const [showTranslate, setShowTranslate] = useState(false);

  const [isShowSpoilers, setShowSpoilers] = useState(isSpoilers);

  const [isShowModal, setIsShowModal] = useState(false);

  const handleModal = () => {
    setIsShowModal((prev) => !prev);
  };

  const { userId } = useSyncStorage();
  useEffect(() => {
    setLiked(isLiked);
  }, [isLiked]);

  const showSpoilers = () => {
    setShowSpoilers(false);
  };

  const dispatch = useDispatch();

  const handleLikeClick = useCallback(() => {
    if (isGuestUser) {
      pushLogin();
    } else {
      setLiked(!liked);
      dispatch(likeUnlikeMovie({ userId, id, type }));
    }
  }, [dispatch, id, isGuestUser, liked, type, userId]);

  const openCryptoLikePopup = useCallback(() => {
    if (isGuestUser) {
      pushLogin();
    } else {
      setLiked(!liked);
      dispatch(likeUnlikeMovie({ userId, id, type }));
    }
  }, []);

  const [isSentCryptoLikePopupOpen, setSentCryptoLikePopup] = useState(false);
  const closeSentCryptoLikePopup = useCallback(() => {
    setSentCryptoLikePopup(false);
  }, [setSentCryptoLikePopup]);

  const handleTranslateClick = useCallback(() => {
    setShowTranslate(!showTranslate);
  }, [showTranslate]);

  const ratingSection = useMemo(() => {
    return type === 'rating' ? (
      <ReactStars
        edit={false}
        count={5}
        color1="#d2e4ff"
        color2="#44536C"
        size={12}
        value={rating}
      />
    ) : (
      <Typography className="toWatchText">
        {t(type === 'discussion' ? 'Discussion' : 'Feed.ToWatch')}
      </Typography>
    );
  }, [type, rating, t]);

  return (
    <div>
      <Box>
        {item.canisters && item.canisters.canister && (
          <CanisterModal
            isShowModal={isShowModal}
            handleClose={handleModal}
            canisters={item.canisters}
            createdAt={createdAt}
          />
        )}
        <Box className="commentaryUserInfoWrapper">
          <UserInfoCommentarySection
            userName={user?.username}
            correlation={user?.correlation}
            image={user?.image}
            userId={user?.id}
            isProActive={user?.proActive}
            isWeb3={!!user.web3Account}
          />
          <Box className="ratingStarsContainer">
            {item.canisters && item.canisters.canister && (
              <button
                onClick={handleModal}
                style={{
                  marginRight: 5,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <VerifiedICon />
              </button>
            )}
            <Typography className="ratingStarsValue">
              {getDifferenceInDays(createdAt * 1000)}
            </Typography>
            {isFeed ? (
              ratingSection
            ) : (
              <CommentaryLink postId={feedUrl} type={type}>
                {ratingSection}
              </CommentaryLink>
            )}
          </Box>
        </Box>
        {!isShowSpoilers ? (
          <>
            {isFeed
              ? !!description && (
                  <Box className="reviewTextWrapper">
                    <Typography
                      className={classNames(
                        'likesDescription',
                        openSans.className,
                      )}
                    >
                      {isTranslationActive ? (
                        <Description text={descriptionLang} />
                      ) : (
                        <Description text={description} />
                      )}
                    </Typography>
                    {showTranslate && !!descriptionLang && (
                      <Typography
                        className={classNames(
                          'likesDescription',
                          openSans.className,
                        )}
                        style={{
                          marginTop: '10px',
                          paddingLeft: '10px',
                          borderLeft: '7px #D2E4FF solid',
                          marginLeft: '10px',
                        }}
                      >
                        {isTranslationActive ? (
                          <Description text={description} />
                        ) : (
                          <Description text={descriptionLang} />
                        )}
                      </Typography>
                    )}
                  </Box>
                )
              : !!description && (
                  <CommentaryLink postId={feedUrl} type={type}>
                    <Box className="reviewTextWrapper">
                      <Typography
                        className={classNames(
                          'likesDescription',
                          openSans.className,
                        )}
                      >
                        {isTranslationActive && descriptionLang ? (
                          <Description text={descriptionLang} />
                        ) : (
                          <Description text={description} />
                        )}
                      </Typography>
                      {showTranslate && !!descriptionLang && (
                        <Typography
                          className={classNames(
                            'likesDescription',
                            openSans.className,
                          )}
                          style={{
                            marginTop: '10px',
                            paddingLeft: '10px',
                            borderLeft: '7px #D2E4FF solid',
                            marginLeft: '10px',
                          }}
                        >
                          {isTranslationActive ? (
                            <Description text={description} />
                          ) : (
                            <Description text={descriptionLang} />
                          )}
                        </Typography>
                      )}
                    </Box>
                  </CommentaryLink>
                )}
          </>
        ) : (
          <div className={'spoilerWrapper'} onClick={showSpoilers}>
            <AvaStormtrooper />
            <Typography
              className={classNames('spoilersDescription', openSans.className)}
            >
              {'Post may contain spoilers'}
            </Typography>
          </div>
        )}
      </Box>
      {type === 'rating' && !isFeed && !isShowSpoilers && (
        <div
          style={{
            display: 'flex',
            marginLeft: '5px',
            flexWrap: 'wrap-reverse',
          }}
        >
          <div style={{ flexBasis: '100%', display: 'flex' }}>
            <div className={'actionBoxMoviePage'} style={{ marginTop: '5px' }}>
              <ButtonBase onClick={handleLikeClick}>
                <IconButton color="primary.light" size="small">
                  {liked ? <HeartLikedIcon /> : <HeartIcon />}
                </IconButton>
                {liked ? (
                  <Typography className={`actionDescription`}>
                    {t('MoviePage.Liked')}
                  </Typography>
                ) : (
                  <Typography className={`actionDescription`}>
                    {t('MoviePage.Like')}
                  </Typography>
                )}
              </ButtonBase>
            </div>
            <CommentaryLink postId={feedUrl} type={type}>
              <div
                className={'actionBoxMoviePage'}
                style={{ marginTop: '5px', marginLeft: '10px' }}
              >
                <ButtonBase>
                  <IconButton
                    className="rateButtonIcon"
                    color="primary.light"
                    size="small"
                  >
                    <CommentsIcon />
                  </IconButton>
                  <Typography className={`actionDescription`}>
                    {t('MoviePage.Comment')}
                  </Typography>
                </ButtonBase>
              </div>
            </CommentaryLink>
            {user && user.solPublicKey && type === 'rating' && (
              <div
                className={'actionBoxMoviePage'}
                style={{ marginTop: '5px', marginLeft: '5px' }}
              >
                <ButtonBase
                  onClick={() => {
                    setSentCryptoLikePopup(true);
                  }}
                >
                  <IconButton color="primary.light" size="small">
                    {<CryptoLike />}
                  </IconButton>
                  <Typography className={`actionDescription`}>
                    {t('Cryptolike')}
                  </Typography>
                </ButtonBase>
                <PopupSlide
                  isOpen={isSentCryptoLikePopupOpen}
                  handleClose={closeSentCryptoLikePopup}
                >
                  <CryptoLikePopup
                    handleClose={closeSentCryptoLikePopup}
                    ToAddress={user.solPublicKey}
                    ratingId={id}
                  />
                </PopupSlide>
              </div>
            )}
          </div>
          {descriptionLang && nativeLang !== lang && (
            <ButtonBase
              onClick={handleTranslateClick}
              style={{ marginLeft: 'auto' }}
            >
              {showTranslate ? (
                <Typography
                  className={`actionDescription actionDescriptionBlue`}
                >
                  {isTranslationActive ? t('Hide.Label') : t('Hide.Label')}
                </Typography>
              ) : (
                <Typography
                  className={`actionDescription actionDescriptionBlue`}
                >
                  {isTranslationActive
                    ? t('Original.Label')
                    : t('Original.Label')}
                </Typography>
              )}
              <Typography
                style={{ textTransform: 'uppercase', marginLeft: '3px' }}
                className={`actionDescription actionDescriptionBlue`}
              >
                {' - ' + nativeLang}
              </Typography>
            </ButtonBase>
          )}
        </div>
      )}
      {descriptionLang && isFeed && nativeLang !== lang && !isShowSpoilers && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginTop: '5px',
          }}
        >
          {' '}
          <ButtonBase onClick={handleTranslateClick}>
            {showTranslate ? (
              <Typography className={`actionDescription actionDescriptionBlue`}>
                {isTranslationActive ? t('Hide.Label') : t('Hide.Label')}
              </Typography>
            ) : (
              <Typography className={`actionDescription actionDescriptionBlue`}>
                {isTranslationActive
                  ? t('Original.Label')
                  : t('Original.Label')}
              </Typography>
            )}
            <Typography
              style={{ textTransform: 'uppercase', marginLeft: '3px' }}
              className={`actionDescription actionDescriptionBlue`}
            >
              {' - ' + nativeLang}
            </Typography>
          </ButtonBase>
        </div>
      )}
    </div>
  );
}

UserReview.propTypes = {
  description: string,
  type: string.isRequired,
  createdAt: number.isRequired,
  user: shape({
    id: number,
    username: string,
    firstName: string,
    lastName: string,
    correlation: number,
    image: string,
    solPublicKey: string,
    web3Account: string,
    proActive: bool,
  }).isRequired,
  rating: number,
  feedUrl: string,
  isGuestUser: bool,
};

export default memo(UserReview);
