// @ts-nocheck

export const init = ():any => {
  const element = document.createElement('script');
  element.src = 'https://www.googletagmanager.com/gtag/js?id=UA-98212043-2';
  element.async = true;
  document.head.appendChild(element);
  window.dataLayer = window.dataLayer || [];
  const gtag = function (...args) {
    window.dataLayer.push(args);
  };

  gtag('js', new Date());

  gtag('config', this.id);

  return gtag;
};
