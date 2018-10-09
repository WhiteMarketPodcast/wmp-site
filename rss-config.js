const _ = require('lodash');

const generalQuery = `
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
  }
`;

// This creates the overall channel info
function setup({ query }) {
  const {
    subtitle,
    podcastName,
    description,
    siteUrl,
    podcastImageUrl,
    owner,
    ownerEmail,
    categories,
  } = query.site.siteMetadata;
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

const episodeQuery = `
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

// This creates each item in the feed
function serialize({ query }) {
  const { site, allMarkdownRemark } = query;
  const { siteUrl, podcastImageUrl, owner } = site.siteMetadata;
  return allMarkdownRemark.edges.map(({ node }) => {
    const { frontmatter, fields, excerpt, html } = node;
    const { podcastURL } = frontmatter;
    const url = siteUrl + fields.slug;

    return Object.assign({}, frontmatter, {
      description: excerpt,
      url,
      guid: url,
      enclosure: {
        url: podcastURL,
        // length,
        type: 'audio/mp3',
      },
      custom_elements: [
        // { pubDate: new Date(date).toUTCString() },
        { 'itunes:author': owner },
        { 'itunes:subtitle': excerpt },
        { 'itunes:summary': excerpt },
        { 'content:encoded': html },
        { 'itunes:explicit': 'clean' },
        { 'itunes:image': { _attr: { href: podcastImageUrl } } },
        // { 'itunes:duration': duration },
        // { 'content:encoded': html },
      ],
    });
  });
}

const options = {
  query: generalQuery,
  setup,
  feeds: [
    {
      serialize,
      query: episodeQuery,
      output: '/rss.xml',
      title: 'Gatsby RSS Feed',
    },
  ],
};

module.exports = options;
