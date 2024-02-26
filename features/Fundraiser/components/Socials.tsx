import type { CSSProperties } from 'react';
import { dataLayerPush } from '../../../common/helpers/dataLayerHelper';
import Facebook from '../../../common/assets/svg/social/Facebook.svg';
import DarkFacebook from '../../../common/assets/svg/social/DarkFacebook.svg';
import Instagram from '../../../common/assets/svg/social/Instargam.svg';
import DarkInstagram from '../../../common/assets/svg/social/DarkInstagram.svg';
import Telegram from '../../../common/assets/svg/social/Telegram.svg';
import DarkTelegram from '../../../common/assets/svg/social/DarkTelegram.svg';
import YouTube from '../../../common/assets/svg/social/YouTube.svg';
import DarkYouTube from '../../../common/assets/svg/social/DarkYouTube.svg';
import Medium from '../../../common/assets/svg/social/Medium.svg';
import DarkMedium from '../../../common/assets/svg/social/DarkMedium.svg';
import Twitter from '../../../common/assets/svg/social/Twitter.svg';
import DarkTwitter from '../../../common/assets/svg/social/DarkTwitter.svg';
import TikTok from '../../../common/assets/svg/social/TikTok.svg';
import DarkTikTok from '../../../common/assets/svg/social/DarkTikTok.svg';
import Discord from '../../../common/assets/svg/social/Discord.svg';
import DarkDiscord from '../../../common/assets/svg/social/DarkDiscord.svg';

export const Socials = (props: {
  className?: string;
  style?: CSSProperties;
  variant?: 'light' | 'dark';
}) => {
  return (
    <div {...props}>
      {socialsArray.map(({ link, Element, DarkElement }) => (
        <div key={link}>
          <a
            rel="noreferrer"
            href={link}
            target="_blank"
            onClick={() => dataLayerPush('socials_click')}
          >
            {props.variant && props.variant == 'dark' ? (
              <DarkElement />
            ) : (
              <Element />
            )}
          </a>
        </div>
      ))}
    </div>
  );
};

const socialsArray = [
  {
    link: 'https://www.facebook.com/ratersapp/',
    Element: Facebook,
    DarkElement: DarkFacebook,
  },
  {
    link: 'https://www.instagram.com/ratersapp/',
    Element: Instagram,
    DarkElement: DarkInstagram,
  },
  {
    link: 'https://t.me/RatersApp',
    Element: Telegram,
    DarkElement: DarkTelegram,
  },
  {
    link: 'https://www.youtube.com/@ratersapp',
    Element: YouTube,
    DarkElement: DarkYouTube,
  },
  {
    link: 'https://medium.com/@raters',
    Element: Medium,
    DarkElement: DarkMedium,
  },
  {
    link: 'https://twitter.com/raters_app',
    Element: Twitter,
    DarkElement: DarkTwitter,
  },
  {
    link: 'https://www.tiktok.com/@ratersapp',
    Element: TikTok,
    DarkElement: DarkTikTok,
  },
  {
    link: 'https://discord.gg/K7msrj5TYg',
    Element: Discord,
    DarkElement: DarkDiscord,
  },
];
