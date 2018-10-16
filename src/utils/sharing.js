// Facebook
const FACEBOOK_SHARE_URL = `https://www.facebook.com/sharer/sharer.php?u=`;
const getFacebookURL = (encodedURL) => `${FACEBOOK_SHARE_URL}${encodedURL}`;

// Twitter
const TWITTER_SHARE_URL = `https://twitter.com/intent/tweet?related=WhiteMarketCast&via=WhiteMarketCast`;

export function getTwitterURL({ url, text }) {
  const urlParts = [TWITTER_SHARE_URL, `original_referer=${url}`, `url=${url}`];
  if (text) urlParts.push(`text=${text}`);

  return urlParts.join(`&`);
}

// WhatsApp
const getWhatsAppURL = ({ url, text }) => `https://wa.me/?text=${encodeURIComponent(text)} - ${url}`;

// Email
const getMailto = ({ url, text }) => `mailto:?body=${text} - ${url}`;

export function getShareURLs({ url, text }) {
  const encodedURL = encodeURIComponent(url);
  const encodedText = encodeURIComponent(text);
  const encodedOptions = { url: encodedURL, text: encodedText };

  const facebookURL = getFacebookURL(encodedURL);
  const twitterURL = getTwitterURL(encodedOptions);
  const whatsAppURL = getWhatsAppURL(encodedOptions);
  const mailto = getMailto(encodedOptions);

  return { facebookURL, twitterURL, whatsAppURL, mailto };
}
