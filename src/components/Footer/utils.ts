export const getSRTextForLinks = ({
  title,
  email,
}: {
  title: string
  email: string
}) => ({
  email: `Email ${email}`,
  rss: `Go to the podcast RSS feed`,
  facebook: `Go to ${title}'s Facebook page`,
  twitter: `Go to ${title}'s profile page on Twitter`,
  spotify: `Listen to ${title} on Spotify`,
  mixcloud: `Go to ${title}'s page on MixCloud`,
  itunes: `Go to ${title}'s page on iTunes`,
  github: `Go to ${title}'s GitHub repo`,
})
