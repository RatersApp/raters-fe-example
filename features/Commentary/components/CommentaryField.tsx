import React, { useState, useCallback, useRef, memo } from 'react';
import {
  Box,
  Avatar,
  TextField,
  CircularProgress,
  InputAdornment,
} from '@material-ui/core';
import { useTranslation } from 'next-i18next';
import { useDispatch, useSelector } from 'react-redux';
import StormTrooperFallback from '../../../common/assets/png/AvaStormtrooperLarge.png';
import { sendCommentStart } from '../duck/commentaryActions';
import loadingSelectors from '../../../common/appFlow/loading/loadingSelectors';
import EmojiPickerIcon from '../../../common/assets/svg/EmojiPickerIcon.svg';
import Image from 'next/image';
import {
  fetchUsersForTagStart,
  resetSearchContent,
} from '../../Search/duck/searchActions';
import UsersForTag from '../../Search/components/UsersForTag';
import searchSelectors from '../../Search/duck/searchSelectors';
import { dataLayerPush } from '../../../common/helpers/dataLayerHelper';
import { usePushLogin } from '../../Auth/common/hooks';
import { apiClient } from '../../../common/api/apiClient';
import { useSyncStorage } from '../../../common/helpers/syncStorage';

function CommentaryField({ type, id, isGuestUser }) {
  const a = useRef(null);
  const { userId } = useSyncStorage();
  const { data } = apiClient.endpoints.userProfile.useQuery({});
  const userImage = data?.data.image;
  const isCommentSending = useSelector(loadingSelectors.isCommentSending);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [value, setValue] = useState('');
  const [em, setEm] = useState(false);
  const textFieldRef = useRef();
  const usersForTag = useSelector(searchSelectors.getUsersForTag);
  const { pushLogin } = usePushLogin();

  const [openedSearchUser, openSearchUser] = useState(false);
  const [searchableWord, setSearchableWord] = useState('');

  const handleChange = (e) => {
    if (isGuestUser) {
      pushLogin();
      setValue('');
    } else {
      const words = e.target.value
        .substring(0, e.target.selectionStart)
        .split(' ');
      const lastWords = e.target.value
        .substring(e.target.selectionEnd, e.target.value.length)
        .split(' ');

      const lastWord = words[words.length - 1] + lastWords[0];
      if (lastWord[0] === '@') {
        openSearchUser(true);
      } else {
        openSearchUser(false);
        dispatch(resetSearchContent());
      }
      if (openedSearchUser) {
        dispatch(fetchUsersForTagStart(lastWord.replace('@', '')));
        setSearchableWord(lastWord.replace('@', ''));
      }
      setValue(e.target.value);
    }
  };

  const handleTagClick = (tag) => {
    setValue(value.replace(searchableWord, tag));
    openSearchUser(false);
    textFieldRef.current.focus();
    dispatch(resetSearchContent());
  };

  const handlePressEnter = useCallback(
    (event) => {
      if (!isGuestUser) {
        if (
          event.key === 'Enter' ||
          event.key === 'NumpadEnter' ||
          event.keyCode === 13
        ) {
          if (value.trim()) {
            dataLayerPush('comment_send');
            dispatch(sendCommentStart({ comment: value, id, userId, type }));
            setValue('');
            dispatch(resetSearchContent());
          }
        }
      }
    },
    [dispatch, value],
  );

  return !isCommentSending ? (
    <Box className="commentaryFieldWrapper">
      {openedSearchUser && usersForTag.length > 0 && (
        <UsersForTag handleTag={handleTagClick} users={usersForTag} />
      )}

      <Avatar className="userSlotAvatar" variant="square" src={userImage}>
        <Image
          src={StormTrooperFallback}
          className="userSlotAvatarFallback"
          alt="actor avatar fallback"
        />
      </Avatar>
      <TextField
        onKeyDown={handlePressEnter}
        onChange={handleChange}
        value={value}
        inputRef={textFieldRef}
        placeholder={t('Comments.CommentPlaceholder')}
        className="commentaryInput"
        InputProps={{
          disableUnderline: true,
          endAdornment: (
            <InputAdornment className="emojiPickerButton" position="end">
              <div ref={a}>
                <EmojiPickerIcon
                  style={{ cursor: 'pointer' }}
                  onClick={() => setEm(!em)}
                />
              </div>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  ) : (
    <div className="commentaryProgressContainer">
      <CircularProgress />
    </div>
  );
}

export default memo(CommentaryField);
