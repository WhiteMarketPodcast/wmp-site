import { getShareURLs } from './sharing'

const testURL = 'https://web.site/page'
const encodedTestURL = encodeURIComponent(testURL)

const text = 'Great article'
const encodedText = encodeURIComponent(text)
const twitterUsername = 'TweetTweet'

describe('getShareURLs', () => {
  const urls = getShareURLs({ url: testURL, text, twitterUsername })

  it('returns a Facebook URL', () => {
    expect(urls.facebookURL).toContain(encodedTestURL)
  })

  it('returns a Twitter URL', () => {
    expect(urls.twitterURL).toContain('twitter.com')
    expect(urls.twitterURL).toContain(encodedTestURL)
    expect(urls.twitterURL).toContain(twitterUsername)
  })

  it('returns a WhatsApp URL', () => {
    const whatsAppURL = new URL(urls.whatsAppURL)
    const textParam = whatsAppURL.searchParams.get('text')

    expect(textParam).toContain(text)
    expect(textParam).toContain(testURL)
  })

  it('returns an email link', () => {
    expect(urls.mailto).toContain(encodedText)
    expect(urls.mailto).toContain(encodedTestURL)
  })
})
