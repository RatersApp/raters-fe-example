import React, { memo, useCallback, useState } from 'react';
import { arrayOf, number, oneOfType, object, string, shape } from 'prop-types';
import {
  Box,
  ButtonBase,
  Dialog,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from '@material-ui/core';
import { Trans, useTranslation } from 'next-i18next';

// components
import UserReview from '../../../features/Commentary/components/UserReview';
import UserInfoCommentarySection from '../../../features/Commentary/components/UserInfoCommentarySection';
import CommentaryField from '../../../features/Commentary/components/CommentaryField';
import DefaultPopup from '../../../features/Commentary/components/DefaultPopup';
import RecommendedUserSlot from '../../../features/RecommendedUsers/components/RecommendedUserSlot';
import LikesListSkeletonsGroup from '../../../common/components/Skeletons/LikesListSkeletonsGroup';

// common
import {
  EMPTY_STRING_PLACEHOLDER,
  likeI18NextKeys,
} from '../../../common/config/strings';
import propShapes from '../../../common/config/propShapes';
import { useDispatch } from 'react-redux';
import DotsIcon from '../../../common/assets/svg/Dots.svg';
import { deleteCommentStart } from '../duck/commentaryActions';
import UserLink from '../../../common/components/Links/UserLink';
import Description from './Description';
import classNames from 'classnames';
import { openSans } from '../../../pages/_app';
import { useSyncStorage } from '../../../common/helpers/syncStorage';
import { camelize } from 'camelize-snakeize-ts';

const generateUserLink = (userName, userId) => (
  <UserLink userId={userId}>
    <Typography component={'span'}>{userName}</Typography>
  </UserLink>
);

function CommentariesList({
  likesList,
  likesQuantity,
  rating,
  createdAt,
  comments,
  user,
  type,
  description,
  id,
  fetchLikes,
  isLikesListLoading,
  allLikes,
  isGuestUser,
  lang,
  nativeLang,
  isTranslationActive,
  descriptionLang,
  isSpoilers,
  item,
}) {
  const [likesPopupOpen, setLikesPopupOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const { userId } = useSyncStorage();
  const dispatch = useDispatch();

  const handleOpenLikesPopup = useCallback(() => {
    fetchLikes({ userId, feedId: id });
    setLikesPopupOpen(true);
  }, [likesPopupOpen, fetchLikes, userId, id]);

  const handleCloseLikesPopup = useCallback(() => {
    setLikesPopupOpen(false);
  }, []);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleControlMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteComment = (id) => {
    dispatch(deleteCommentStart({ id }));
  };

  return (
    <Box>
      <>
        {!likesList.length || (
          <Box className="likesRowContainer">
            <Box className="likesDescriptionWrapper">
              <Typography
                className={classNames(['userLikesString', openSans.className])}
              >
                <Trans
                  i18nKey={likeI18NextKeys[likesQuantity] || 'Feed.LikedByMore'}
                  i18n={i18n}
                >
                  `Liked by $
                  {generateUserLink(
                    { who: likesList[0]?.username },
                    likesList[0]?.id,
                  )}
                  , $
                  {generateUserLink(
                    { whoElse: likesList[1]?.username },
                    likesList[1]?.id,
                  )}{' '}
                  <a
                    onClick={handleOpenLikesPopup}
                    className="otherLikesButton"
                  >
                    <Typography component="span">
                      {{ quantity: likesQuantity - 2 }}
                    </Typography>
                  </a>{' '}
                  others`
                </Trans>
              </Typography>
            </Box>
          </Box>
        )}
      </>
      <Box>
        <UserReview
          id={id}
          rating={rating}
          user={camelize(user)}
          type={type}
          createdAt={createdAt}
          description={description}
          isFeed={true}
          lang={lang}
          descriptionLang={descriptionLang}
          isTranslationActive={isTranslationActive}
          nativeLang={nativeLang}
          isSpoilers={isSpoilers}
          item={item}
        />
        {comments.map((item, i) => (
          <Box key={i} className="commentariesListContainer">
            <UserInfoCommentarySection
              userId={item.user.id}
              image={item.user.image}
              correlation={item.user.correlation}
              userName={item.user.username}
            />
            <Box className="commentaryTextContainer">
              <Typography
                className={classNames('likesDescription', openSans.className)}
              >
                <Description text={item.comment} />
              </Typography>
              {userId === item.user.id && (
                <ButtonBase>
                  <IconButton
                    className="rateButtonIcon"
                    color="primary.light"
                    size="small"
                    style={{ width: '22px', height: '22px' }}
                    onClick={handleOpenMenu}
                  >
                    {' '}
                    <DotsIcon />
                  </IconButton>
                  <Menu
                    className="shareMenuBox"
                    anchorEl={anchorEl}
                    onClose={handleControlMenuClose}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'center',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'center',
                    }}
                    aria-labelledby="simple-dialog-title"
                    open={Boolean(anchorEl)}
                    style={{ marginTop: '50px' }}
                  >
                    <MenuItem
                      style={{ paddingTop: '0px', paddingBottom: '0px' }}
                      onClick={() => handleDeleteComment(item.id)}
                    >
                      <p className="removeReviewText">
                        {t('Action.DeleteComment')}
                      </p>
                    </MenuItem>
                  </Menu>
                </ButtonBase>
              )}
            </Box>
          </Box>
        ))}
      </Box>
      <CommentaryField isGuestUser={isGuestUser} type={type} id={id} />
      <Dialog
        onClose={handleCloseLikesPopup}
        className="recommendedUsersDialog"
        open={likesPopupOpen}
      >
        <DefaultPopup
          handleClose={handleCloseLikesPopup}
          title={t('Likes.Title')}
        >
          <div className="likesPopupContent">
            {!isLikesListLoading ? (
              allLikes &&
              allLikes.map((item, i) => {
                const { user } = item;
                const preparedUserFullName =
                  !user.first_name && !user.last_name
                    ? EMPTY_STRING_PLACEHOLDER
                    : `${user.first_name || ''} ${user.last_name || ''}`;
                return (
                  <RecommendedUserSlot
                    key={i}
                    handleClosePopup={handleCloseLikesPopup}
                    isGuestUser={isGuestUser}
                    withHover={false}
                    userId={user.id}
                    img={user.image}
                    fullName={preparedUserFullName}
                    userName={user.username}
                    isFollowing={user.is_following}
                    correlation={item.correlation}
                  />
                );
              })
            ) : (
              <LikesListSkeletonsGroup />
            )}
          </div>
        </DefaultPopup>
      </Dialog>
    </Box>
  );
}

CommentariesList.propTypes = {
  likesList: oneOfType([arrayOf(object), number]).isRequired,
  likesQuantity: number.isRequired,
  rating: number.isRequired,
  comments: arrayOf(object).isRequired,
  createdAt: number.isRequired,
  commentsTotal: number.isRequired,
  user: shape(propShapes.userShape).isRequired,
  type: string.isRequired,
  id: number.isRequired,
  description: oneOfType([string, number]).isRequired,
};

export default memo(CommentariesList);
