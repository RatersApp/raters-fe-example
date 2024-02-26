import type { ImageProps } from 'next/image';
import Image from 'next/image';
import { useDerivedState } from './hooks/useDerivedState';

const ImageWithFallback = (
  props: ImageProps & { fallbackSrc: ImageProps['src'] },
) => {
  const { src, fallbackSrc, ...rest } = props;
  const [imgSrc, setImgSrc] = useDerivedState(src || fallbackSrc, [src || fallbackSrc]);

  return (
    <Image
      {...rest}
      alt={props.alt}
      src={imgSrc}
      onError={() => setImgSrc(fallbackSrc)}
    />
  );
};

export default ImageWithFallback;
