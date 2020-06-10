type ShareArgs = {
  url: string
  text: string
  twitterUsername?: string
}

// Facebook
const FACEBOOK_SHARE_URL = `https://www.facebook.com/sharer/sharer.php`
const getFacebookURL = (url: string) => {
  const facebookURL = new URL(FACEBOOK_SHARE_URL)
  facebookURL.searchParams.set('u', url)

  return facebookURL.toString()
}

// Twitter
const TWITTER_SHARE_URL = `https://twitter.com/intent/tweet`

function getTwitterURL({ url, text, twitterUsername }: ShareArgs) {
  const twitterURL = new URL(TWITTER_SHARE_URL)

  twitterURL.searchParams.set('url', url)
  if (text) twitterURL.searchParams.set('text', text)
  if (twitterUsername) {
    twitterURL.searchParams.set(`related`, twitterUsername)
    twitterURL.searchParams.set(`via`, twitterUsername)
  }

  return twitterURL.toString()
}

// WhatsApp
const getWhatsAppURL = ({ url, text }: ShareArgs) => {
  const whatsAppURL = new URL(`https://wa.me`)
  whatsAppURL.searchParams.set('text', `${text} - ${url}`)

  return whatsAppURL.toString()
}

// Email
const getMailto = ({ url, text }: ShareArgs) =>
  `mailto:?body=${encodeURIComponent(`${text} - ${url}`)}`

type ShareURLs = {
  facebookURL: string
  twitterURL: string
  whatsAppURL: string
  mailto: string
}

export function getShareURLs({
  url,
  text,
  twitterUsername,
}: ShareArgs): ShareURLs {
  const facebookURL = getFacebookURL(url)
  const twitterURL = getTwitterURL({ url, text, twitterUsername })
  const whatsAppURL = getWhatsAppURL({ url, text })
  const mailto = getMailto({ url, text })

  return { facebookURL, twitterURL, whatsAppURL, mailto }
}
