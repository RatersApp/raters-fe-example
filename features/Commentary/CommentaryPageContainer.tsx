import React, { memo } from 'react';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';

// common

// components

// duck
import commentarySelectors from '../../features/Commentary/duck/commentarySelectors';
import { fetchLikesStart } from '../../features/Movie/duck/movieActions';
import loadingSelectors from '../../common/appFlow/loading/loadingSelectors';
import movieSelectors from '../../features/Movie/duck/movieSelectors';
import FeedPostSkeleton from '../../common/components/Skeletons/FeedPostSkeleton';

import useWidgetSrc from '../../common/helpers/hooks/useCreateJWSrc';
import WhereToWatch from '../Movie/components/WhereToWatch';
import AppContainer from '../../common/components/AppContainer/AppContainer';
import UserProfile from '../UserProfile/UserProfile';
import RecommendedUsers from '../RecommendedUsers/RecommendedUsers';
import FooterMarketPlace from '../Container/components/FooterMarketPlace';
import FeedDetails from '../Feed/components/FeedDetails';
import FooterSocialLinks from '../Container/components/FooterSocialLinks';
import { useSyncStorage } from '../../common/helpers/syncStorage';

function CommentaryPageContainer({
  feedDetails,
  allLikes,
  fetchLikes,
  isLikesListLoading,
  isFeedDetailsLoading,
}) {
  const widgetSrc = useWidgetSrc({
    id: feedDetails.movie ? feedDetails?.movie.imdb : 0,
    iframeIndex: 0,
  });
  const isGuestUser = !useSyncStorage().userId;

  return (
    <>
      <AppContainer
        className="commentary"
        leftSide={
          <div className="flex-space-between">
            <div>
              {!isGuestUser && (
                <>
                  <UserProfile />
                  <RecommendedUsers />
                </>
              )}
            </div>
            <div style={{ marginTop: 'auto' }}>
              <FooterMarketPlace />
            </div>
          </div>
        }
        main={
          !isEmpty(feedDetails) && (
            <>
              {!isFeedDetailsLoading ? (
                <FeedDetails
                  allLikes={allLikes}
                  fetchLikes={fetchLikes}
                  isLikesListLoading={isLikesListLoading}
                  feedDetails={feedDetails}
                  isGuestUser={isGuestUser}
                />
              ) : (
                <div className="commentarySkeletonWrapper">
                  <FeedPostSkeleton />
                </div>
              )}
              <div className="show-on-sm-down">
                <FooterMarketPlace />
              </div>
            </>
          )
        }
        rightSide={
          <div className="flex-space-between">
            <WhereToWatch widgetSrc={widgetSrc} />
            <div style={{ marginTop: 'auto' }}>
              <FooterSocialLinks />
            </div>
          </div>
        }
        options={{
          leftSide: {
            className: 'hide-on-sm-down content-space-between',
          },
          main: {
            className: '',
          },
          rightSide: {
            className: 'hide-on-lg-down content-space-between',
          },
        }}
      />
    </>
  );
}

const mapStateToProps = (state) => ({
  feedDetails: commentarySelectors.getFeedDetails(state),
  isLikesListLoading: loadingSelectors.isLikesListLoading(state),
  allLikes: movieSelectors.getPostLikesList(state),
  isFeedDetailsLoading: loadingSelectors.isFeedDetailsLoading(state),
});

const mapDispatchToProps = {
  fetchLikes: fetchLikesStart,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(memo(CommentaryPageContainer));
