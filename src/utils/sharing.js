// Facebook
const FACEBOOK_SHARE_URL = `https://www.facebook.com/sharer/sharer.php?u=`
const getFacebookURL = (encodedURL) => `${FACEBOOK_SHARE_URL}${encodedURL}`

// Twitter
const TWITTER_SHARE_URL = `https://twitter.com/intent/tweet`

export function getTwitterURL({ url, text, twitterUsername }) {
  const params = [
    `url=${url}`,
    text && `text=${text}`,
    twitterUsername && `related=${twitterUsername}`,
    twitterUsername && `via=${twitterUsername}`,
  ]
    .filter((x) => x)
    .join('&')

  return `${TWITTER_SHARE_URL}?${params}`
}

// WhatsApp
const getWhatsAppURL = ({ url, text }) =>
  `https://wa.me/?text=${encodeURIComponent(text)} - ${url}`

// Email
const getMailto = ({ url, text }) => `mailto:?body=${text} - ${url}`

export function getShareURLs({ url, text, twitterUsername }) {
  const encodedURL = encodeURIComponent(url)
  const encodedText = encodeURIComponent(text)
  const encodedOptions = { url: encodedURL, text: encodedText }

  const facebookURL = getFacebookURL(encodedURL)
  const twitterURL = getTwitterURL({ ...encodedOptions, twitterUsername })
  const whatsAppURL = getWhatsAppURL(encodedOptions)
  const mailto = getMailto(encodedOptions)

  return { facebookURL, twitterURL, whatsAppURL, mailto }
}
