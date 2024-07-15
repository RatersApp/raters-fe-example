import React from 'react';
import type { StaticImageData } from 'next/image';
import Image from 'next/image';
import { Typography } from '@material-ui/core';

interface Web3ButtonModalProps {
  title: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>> | StaticImageData;
  handler: () => void;
  disable?: boolean;
}

export const Web3ButtonModal: React.FC<Web3ButtonModalProps> = ({
  title,
  icon: Icon,
  handler,
  disable = false,
}) => {
  return (
    <button
      onClick={handler}
      className={`authWeb3Modal-button ${disable ? 'disable' : ''}`}
      disabled={disable}
    >
      {Icon ? (
        <>
          {typeof Icon === 'function' ? (
            <Icon />
          ) : (
            <Image src={Icon} alt={title} />
          )}
        </>
      ) : null}
      <Typography variant={'h6'} className="authWeb3Modal-title">
        {title}
      </Typography>
    </button>
  );
};
