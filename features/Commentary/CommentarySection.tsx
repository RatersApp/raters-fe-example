import React, { memo, useCallback, useState } from 'react';
import {
  arrayOf,
  number,
  oneOfType,
  object,
  string,
  shape,
  bool,
} from 'prop-types';
import { Dialog, Typography } from '@material-ui/core';
import { Trans, useTranslation } from 'next-i18next';

// components

// common
import {
  EMPTY_STRING_PLACEHOLDER,
  likeI18NextKeys,
} from '../../common/config/strings';
import propShapes from '../../common/config/propShapes';
import { useDispatch } from 'react-redux';
import { fetchLikesStart } from '../Movie/duck/movieActions';
import UserReview from './components/UserReview';
import UserInfoCommentarySection from './components/UserInfoCommentarySection';
import CommentaryLink from '../../common/components/Links/CommentaryLink';
import DefaultPopup from './components/DefaultPopup';
import RecommendedUserSlot from '../RecommendedUsers/components/RecommendedUserSlot';
import LikesListSkeletonsGroup from '../../common/components/Skeletons/LikesListSkeletonsGroup';
import UserLink from '../../common/components/Links/UserLink';
import Description from './components/Description';
import classNames from 'classnames';
import { openSans } from '../../pages/_app';
import { camelize } from 'camelize-snakeize-ts';

const generateUserLink = (userName, userId) => (
  <UserLink userId={userId}>
    <Typography component={'span'}>{userName}</Typography>
  </UserLink>
);

function CommentarySection({
  likesList,
  likesQuantity,
  rating,
  createdAt,
  comments,
  commentsTotal,
  user,
  userId,
  type,
  description,
  id,
  isLikesListLoading,
  allLikes,
  feedUrl,
  descriptionLang,
  lang,
  nativeLang,
  isTranslationActive,
  isSpoilers,
  item,
}) {
  const { t, i18n } = useTranslation();
  const [likesPopupOpen, setLikesPopupOpen] = useState(false);
  const dispatch = useDispatch();

  const handleOpenLikesPopup = useCallback(() => {
    dispatch(fetchLikesStart({ userId, feedId: id }));
    setLikesPopupOpen(true);
  }, [likesPopupOpen]);

  const handleCloseLikesPopup = useCallback(() => {
    setLikesPopupOpen(false);
  }, [likesPopupOpen]);

  const [comment] = comments;

  return (
    <div>
      <>
        {likesList &&
          (!likesList.length || (
            <div className="likesRowContainer">
              <div className="likesDescriptionWrapper">
                <Typography
                  className={classNames([
                    'userLikesString',
                    openSans.className,
                  ])}
                >
                  <Trans
                    i18nKey={
                      likeI18NextKeys[likesQuantity] || 'Feed.LikedByMore'
                    }
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
              </div>
            </div>
          ))}
      </>
      <div>
        <UserReview
          id={id}
          rating={rating}
          user={camelize(user)}
          type={type}
          createdAt={createdAt}
          description={description}
          isFeed={true}
          descriptionLang={descriptionLang}
          lang={lang}
          nativeLang={nativeLang}
          isTranslationActive={isTranslationActive}
          isSpoilers={isSpoilers}
          item={item}
        />
        <>
          {commentsTotal !== 1 || (
            <div className="oneCommentaryContainer">
              <div>
                <UserInfoCommentarySection
                  userId={comment.user.id}
                  image={comment.user.image}
                  correlation={comment.user.correlation}
                  userName={comment.user.username}
                />
                <div className="commentaryTextContainer">
                  <Typography
                    className={classNames(
                      'likesDescription',
                      openSans.className,
                    )}
                  >
                    <Description text={comment.comment} />
                  </Typography>
                </div>
              </div>
            </div>
          )}
        </>
        {commentsTotal > 1 && (
          <div>
            <div className="moreCommentsDescriptionWrapper">
              <CommentaryLink postId={feedUrl} type={type}>
                <Typography className="userSlotFullName">
                  {t('Feed.MoreComments', { quantity: commentsTotal - 1 })}
                </Typography>
              </CommentaryLink>
            </div>
            <div>
              <UserInfoCommentarySection
                userId={comment.user.id}
                image={comment.user.image}
                correlation={comment.user.correlation}
                userName={comment.user.username}
              />
              <div className="commentaryTextContainer">
                <Typography
                  className={classNames('likesDescription', openSans.className)}
                >
                  <Description text={comment.comment} />
                </Typography>
              </div>
            </div>
          </div>
        )}
      </div>
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
              allLikes.map((item, index) => {
                const { user } = item;
                const preparedUserFullName =
                  !user.first_name && !user.last_name
                    ? EMPTY_STRING_PLACEHOLDER
                    : `${user.first_name || ''} ${user.last_name || ''}`;
                return (
                  <RecommendedUserSlot
                    withHover={false}
                    userId={user.id}
                    img={user.image}
                    fullName={preparedUserFullName}
                    userName={user.username}
                    isFollowing={user.is_following}
                    correlation={item.correlation}
                    key={index}
                  />
                );
              })
            ) : (
              <LikesListSkeletonsGroup />
            )}
          </div>
        </DefaultPopup>
      </Dialog>
    </div>
  );
}

CommentarySection.propTypes = {
  likesList: oneOfType([arrayOf(object), number]).isRequired,
  likesQuantity: number.isRequired,
  rating: number,
  comments: arrayOf(object).isRequired,
  createdAt: number.isRequired,
  commentsTotal: number.isRequired,
  user: shape(propShapes.userShape).isRequired,
  type: string.isRequired,
  id: number.isRequired,
  description: oneOfType([string, number]),
  isSpoilers: bool,
};

export default memo(CommentarySection);
