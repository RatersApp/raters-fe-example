import memoize from 'lodash/memoize';

const useWidgetSrc = ({ id, iframeIndex, lang }) => {
  const queryParams = {
    iframe_key: iframeIndex,
    language: lang,
    id,
    api_key: 'KowVvkZpAh7gQNFaHgcQ42DLaTHIUxmo',
    object_type: 'movie',
    id_type: 'imdb',
  };

  const widgetHost = 'https://widget.justwatch.com';

  const prepareSrc = Object.keys(queryParams)
    .map(
      (key) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(queryParams[key])}`,
    )
    .join('&');

  return `${widgetHost}/inline_widget?/${prepareSrc}`;
};

export default memoize(useWidgetSrc);
