import castboxLogo from 'assets/castbox.png';
import googlePodcastsLogo from 'assets/google-podcasts-logo.png';
import pocketCastsLogo from 'assets/pocket-casts.png';
import { FaSpotify, FaPodcast, FaMixcloud } from 'react-icons/fa';

export const links = {
  left: [
    {
      provider: `Castbox`,
      src: castboxLogo,
      url: `https://castbox.fm/channel/White-Market-Podcast-id242607`,
    },
    {
      provider: `Google Podcasts`,
      src: googlePodcastsLogo,
      url: `https://www.google.com/podcasts?feed=aHR0cHM6Ly93d3cud2hpdGVtYXJrZXRwb2RjYXN0LmV1L3Jzcy54bWw%3D`,
    },
    {
      Icon: FaPodcast,
      provider: `Apple Podcasts`,
      url: `https://itunes.apple.com/gb/podcast/white-market-podcast/id1033024096`,
      style: { color: '#de50ed' },
    },
  ],
  right: [
    {
      Icon: FaSpotify,
      provider: `Spotify`,
      url: `https://open.spotify.com/show/4o2iPfNaRrP73gWsmQ7yF3?si=CoK9hmBnQHSb1MQVuluNcQ`,
      style: { color: '#1db954' },
    },
    {
      provider: `Pocket Casts`,
      src: pocketCastsLogo,
      url: `https://pca.st/wfkj`,
    },
    {
      Icon: FaMixcloud,
      provider: `Mixcloud`,
      url: `https://www.mixcloud.com/whitemarketpodcast/`,
      style: { color: '#4fa6d3' },
    },
  ],
};
