export const dataLayerPush = (event) => {
  if (typeof window !== 'undefined') {
    window.dataLayer.push({
      event,
    });
  }
};
