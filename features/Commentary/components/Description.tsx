import React, { useEffect, useState } from 'react';
import UserLink from '../../../common/components/Links/UserLink';

const Description = ({ text }) => {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    setTags(text?.split(' ').filter((v) => v.startsWith('@')));
  }, [text]);

  return (
    <div>
      {text &&
        text.split(' ').map((word, i) => {
          if (tags && tags.includes(word)) {
            if (
              [',', '.', '?', '!', ':', '%', ')'].includes(
                word[word.length - 1],
              )
            ) {
              console.log(word);
              return (
                <>
                  <UserLink
                    userId={word
                      .replace('@', '')
                      .replace(word[word.length - 1], '')}
                  >
                    {word.replace(word[word.length - 1], '')}
                  </UserLink>
                  <span>{word[word.length - 1]}</span>
                  <span> </span>
                </>
              );
            } else {
              return (
                <>
                  <UserLink userId={word.replace('@', '')}>{word}</UserLink>
                  <span> </span>
                </>
              );
            }
          }
          return <span key={i}>{word + ' '}</span>;
        })}
    </div>
  );
};

export default Description;
