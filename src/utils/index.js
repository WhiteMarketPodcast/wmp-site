export const formatConverter = {
  standard: `blog`,
  audio: `podcast`,
  video: `video`,
};

export const licenceURLs = {
  'CC BY': `https://creativecommons.org/licenses/by/4.0/`,
  'CC BY-SA': `https://creativecommons.org/licenses/by-sa/4.0/`,
  'CC BY-ND': `https://creativecommons.org/licenses/by-nd/4.0/`,
  'CC BY-NC': `https://creativecommons.org/licenses/by-nc/4.0/`,
  'CC BY-NC-SA': `https://creativecommons.org/licenses/by-nc-sa/4.0/`,
  'CC BY-NC-ND': `https://creativecommons.org/licenses/by-nc-nd/4.0/`,
};

export function isFirstPostPodcast(posts) {
  return posts[0].node.frontmatter.format === 'audio';
}
