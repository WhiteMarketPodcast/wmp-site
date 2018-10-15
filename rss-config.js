const _ = require('lodash');
const fetch = require('node-fetch');
const RSS = require('rss');
const fs = require('fs');
const pify = require('pify');

const writeFile = pify(fs.writeFile);

// This creates the overall channel info
function setup(data) {
  const {
    subtitle,
    podcastName,
    description,
    siteUrl,
    podcastImageUrl,
    owner,
    ownerEmail,
    categories,
  } = data.siteMetadata;
  const imageUrl = podcastImageUrl || ``;

  return {
    title: podcastName,
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
      itunes: 'http://www.itunes.com/dtds/podcast-1.0.dtd',
    },
    custom_elements: [
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
      // use lodash map in case categories is undefined
      ..._.map(categories, (category) => ({
        'itunes:category': { _attr: { text: category } },
      })),
    ],
  };
}

const podcastQuery = `
  {
    site {
      siteMetadata {
        title
        subtitle
        podcastName
        description
        siteUrl
        owner
        ownerEmail
        podcastImageUrl
        categories
      }
    }
    allMarkdownRemark(
      limit: 1000,
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

async function getPodcastSize(url) {
  try {
    const { headers } = await fetch(url, { method: 'head' });
    return headers.get('content-length');
  } catch (e) {
    console.log(`getPodcastSize error:`, e.toString());
    return 0;
  }
}

// This creates each item in the feed
async function serialize(site, allMarkdownRemark) {
  const { siteUrl, podcastImageUrl, owner } = site.siteMetadata;

  return allMarkdownRemark.edges.map(async ({ node }) => {
    const { frontmatter, fields, excerpt, html } = node;
    const { podcastURL } = frontmatter;
    const url = siteUrl + fields.slug;
    const size = await getPodcastSize(podcastURL);

    return Object.assign({}, frontmatter, {
      description: excerpt,
      url,
      guid: url,
      enclosure: { url: podcastURL, size, type: 'audio/mpeg' },
      custom_elements: [
        { 'itunes:author': owner },
        { 'itunes:subtitle': excerpt },
        { 'itunes:summary': excerpt },
        { 'content:encoded': html },
        { 'itunes:explicit': 'clean' },
        { 'itunes:image': { _attr: { href: podcastImageUrl } } },
        // { 'itunes:duration': duration },
      ],
    });
  });
}

async function createRSSFeed(podcastData) {
  const { site, allMarkdownRemark } = podcastData.data;
  const podcastSetup = setup(site);
  const episodes = await Promise.all(serialize(site, allMarkdownRemark));
  const feed = new RSS(podcastSetup);
  episodes.forEach((episode) => feed.item(episode));

  await writeFile(`./public/rss.xml`, feed.xml());
}

module.exports = {
  podcastQuery,
  createRSSFeed,
};
