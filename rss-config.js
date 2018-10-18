const _ = require('lodash');
const fetch = require('node-fetch');
const RSS = require('rss');
const fs = require('fs');
const pify = require('pify');
const mp3Duration = require('mp3-duration');

const writeFile = pify(fs.writeFile);
const ARCHIVE_ORG_BASE_URL = `https://archive.org/details/`;
const getArchiveURL = (id) => `${ARCHIVE_ORG_BASE_URL}${id}?output=json`;
const getMp3FromURL = (url) => _.last(url.split('/'));

function deleteLocalFile(filepath) {
  fs.unlink(filepath, (err) => {
    if (err) throw err;
    console.log(filepath, 'was deleted');
  });
}

function convertSecondsToTime(seconds) {
  return new Date(seconds * 1000)
    .toISOString()
    .split('T')[1]
    .split('.')[0];
}

async function callArchiveAPI(mp3Path, isFirstAttempt) {
  let mp3Id = mp3Path.split(`.`)[0];
  if (isFirstAttempt) mp3Id = mp3Id.replace(/\W/g, '');
  const response = await fetch(getArchiveURL(mp3Id));
  const json = await response.json();
  const { size, length } = json.files[`/${mp3Path}`];
  return { size, duration: convertSecondsToTime(length) };
}

async function getDetailsFromArchive(podcastURL) {
  const mp3Path = getMp3FromURL(podcastURL);
  try {
    const details = await callArchiveAPI(mp3Path, true);
    return details;
  } catch (firstError) {
    try {
      const details = await callArchiveAPI(mp3Path, false);
      return details;
    } catch (secondError) {
      console.log(`!!! failed: ${podcastURL}`);
      console.log(`First error:`, firstError.toString());
      console.log(`Second error:`, secondError.toString());
      return {};
    }
  }
}

async function getDuration(url) {
  try {
    const mp3Path = getMp3FromURL(url);
    const response = await fetch(url);

    // write file data locally
    response.body.pipe(fs.createWriteStream(mp3Path));
    await new Promise((resolve, reject) => {
      response.body.on(`end`, resolve);
      response.body.on(`error`, reject);
    });

    const duration = await mp3Duration(mp3Path);
    deleteLocalFile(mp3Path);
    return convertSecondsToTime(duration);
  } catch (e) {
    console.log(`getDuration error:`, e);
    return '0';
  }
}

async function getFileSize(url) {
  try {
    const { headers } = await fetch(url, { method: 'head' });
    return headers.get('content-length');
  } catch (e) {
    console.log(`getFileSize error:`, e.toString());
    return 0;
  }
}

// This creates the overall channel info
function createChannelSetup(data) {
  const {
    title,
    subtitle,
    description,
    siteUrl,
    siteLogo,
    owner,
    ownerEmail,
    categories,
  } = data.siteMetadata;

  console.log(`========== running RSS setup ==========`);
  const imageUrl = siteLogo || ``;

  return {
    title,
    description,
    feed_url: `${siteUrl}/rss.xml`,
    site_url: siteUrl,
    image_url: imageUrl,
    managingEditor: `${ownerEmail} (${owner})`,
    webMaster: `${ownerEmail} (${owner})`,
    // copyright: `${new Date().getFullYear()} ${owner}`,
    language: 'en',
    categories,
    pubDate: new Date().toUTCString(),
    ttl: '60',
    custom_namespaces: {
      googleplay: 'http://www.google.com/schemas/play-podcasts/1.0',
      itunes: 'http://www.itunes.com/dtds/podcast-1.0.dtd',
    },
    custom_elements: [
      // Google fields
      { 'googleplay:author': owner },
      { 'googleplay:email': ownerEmail },
      { 'googleplay:description': description },
      { 'googleplay:explicit': 'No' },
      { 'googleplay:image': { _attr: { href: imageUrl } } },
      ..._.map(categories, (category) => ({
        'googleplay:category': { _attr: { text: category } },
      })),

      // iTunes fields
      { 'itunes:subtitle': subtitle },
      { 'itunes:author': owner },
      { 'itunes:explicit': 'clean' },
      { 'itunes:summary': description },
      {
        'itunes:owner': [
          { 'itunes:name': owner },
          { 'itunes:email': ownerEmail },
        ],
      },
      { 'itunes:image': { _attr: { href: imageUrl } } },
      ..._.map(categories, (category) => ({
        'itunes:category': { _attr: { text: category } },
      })),
    ],
  };
}

// This creates each item in the feed
async function createEpisodes(site, allMarkdownRemark) {
  const { siteUrl, siteLogo, owner } = site.siteMetadata;

  return allMarkdownRemark.edges.map(async ({ node }) => {
    const { frontmatter, fields, excerpt, html } = node;
    const { podcastURL, title } = frontmatter;
    const url = siteUrl + fields.slug;

    console.log(`~~~ getting ${title} info`);
    let { size, duration } = await getDetailsFromArchive(podcastURL);
    if (!size) size = await getFileSize(podcastURL);
    if (!duration) duration = await getDuration(podcastURL);
    console.log(`~~~ finished ${title}`);

    return Object.assign({}, frontmatter, {
      description: excerpt,
      url,
      guid: url,
      enclosure: { url: podcastURL, size, type: 'audio/mpeg' },
      custom_elements: [
        { 'content:encoded': html },

        // Google fields
        { 'googleplay:author': owner },
        { 'googleplay:description': excerpt },
        { 'googleplay:explicit': 'no' },

        // iTunes fields
        { 'itunes:author': owner },
        { 'itunes:subtitle': excerpt },
        { 'itunes:summary': excerpt },
        { 'itunes:explicit': 'clean' },
        { 'itunes:image': { _attr: { href: siteLogo } } },
        { 'itunes:duration': duration },
      ],
    });
  });
}

// ~~~ exports ~~~
async function createRSSFeed(podcastData) {
  if (process.env.NODE_ENV === 'development') return;
  const { site, allMarkdownRemark } = podcastData.data;

  console.time(`*** got all info ***`);
  const channelInfo = createChannelSetup(site);
  const episodes = await Promise.all(createEpisodes(site, allMarkdownRemark));
  console.timeEnd(`*** got all info ***`);

  const feed = new RSS(channelInfo);
  episodes.forEach((episode) => feed.item(episode));

  await writeFile(`./public/rss.xml`, feed.xml());
}

const podcastQuery = `
  {
    site {
      siteMetadata {
        title
        subtitle
        description
        siteUrl
        owner
        ownerEmail
        siteLogo
        categories
      }
    }
    allMarkdownRemark(
      limit: 15,
      sort: { order: DESC, fields: [frontmatter___date] },
      filter: {frontmatter: { format: { eq: "audio" } }}
    ) {
      edges {
        node {
          excerpt
          html
          fields { slug }
          frontmatter {
            title
            date
            podcastURL
          }
        }
      }
    }
  }
`;

module.exports = {
  createRSSFeed,
  podcastQuery,
};
