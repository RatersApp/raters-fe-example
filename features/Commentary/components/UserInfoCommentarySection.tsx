import React, { memo, useState } from 'react';
import { string, number } from 'prop-types';
import { Avatar, Box, Typography, Tooltip } from '@material-ui/core';
import VerifiedICon from '../../../common/assets/svg/VerifiedIconBig.svg';

// components
import UserCorrelationBar from '../../../common/components/Progress/UserCorrelationBar';
import UserLink from '../../../common/components/Links/UserLink';

// utils
import useRandomFallback from '../../../common/helpers/useRandomFallback';
import { deleteFacebookAccessToken } from '../../../common/helpers/objectUtils';
import Image from 'next/image';
import { useSyncStorage } from '../../../common/helpers/syncStorage';

function UserInfoCommentarySection({
  correlation,
  userName,
  image,
  userId,
  isProActive,
  isWeb3,
}) {
  const fallback = useRandomFallback(userId, 'md');

  const { userId: authId } = useSyncStorage();

  const [fallbackImage, setFallbackImage] = useState(image);

  const userCorrelation = userId === authId ? 100 : correlation;

  return (
    <Box className="commentaryUserInfo">
      <UserLink userId={userId}>
        <div style={{ width: '40px', height: '40px' }}>
          {fallback && (
            <Image
              onError={() => setFallbackImage(fallback)}
              src={
                fallbackImage && fallbackImage !== 'null'
                  ? deleteFacebookAccessToken(fallbackImage)
                  : fallback
              }
              width={40}
              height={40}
              className="userSlotAvatar"
              alt="avatar fallback"
            />
          )}
        </div>
      </UserLink>
      <UserLink userId={userId}>
        <Box className="userCorrelationContainer">
          <Typography className="commentSectionUserName">{userName}</Typography>
          <UserCorrelationBar correlation={userCorrelation} width={30} />
        </Box>
      </UserLink>
      {isWeb3 && (
        <Tooltip title="Web3 Verified" className="commentaryWeb3">
          <div style={{ marginRight: 3 }}>
            <VerifiedICon />
          </div>
        </Tooltip>
      )}
      {isProActive && <Box className={'userReviewProLabel'}>{'PRO'}</Box>}
    </Box>
  );
}

UserInfoCommentarySection.propTypes = {
  correlation: number.isRequired,
  userName: string.isRequired,
  image: string.isRequired,
};

export default memo(UserInfoCommentarySection);
