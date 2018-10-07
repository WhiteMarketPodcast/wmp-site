module.exports = {
  siteMetadata: {
    title: 'White Market Podcast',
    siteUrl: `whitemarketpodcast.netlify.com`,
    description:
      'White Market Podcast is show about free music and free culture by Rute Correia. While the show is mainly focused on Creative Commons-licenced music, since it is also naturally intertwined with other movements and ideologies such as Open Source and Open Access, it often features these and similar forms of activism related to digital rights and freedom.',
  },
  plugins: [
    'gatsby-plugin-resolve-src',
    `gatsby-plugin-styled-components`,
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sass',
    {
      resolve: 'gatsby-plugin-web-font-loader',
      options: {
        google: {
          families: ['Crete Round', 'Montserrat'],
        },
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/img`,
        name: 'images',
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [`gatsby-remark-external-links`],
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
        {
          site {
            siteMetadata {
              title
              description
              siteUrl
            }
          }
        }
      `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => allMarkdownRemark.edges.map((edge) => {
              const {
                frontmatter,
                fields: { slug },
                excerpt,
                html,
              } = edge.node;
              const url = site.siteMetadata.siteUrl + slug;

              return Object.assign({}, frontmatter, {
                description: excerpt,
                url,
                guid: url,
                custom_elements: [{ 'content:encoded': html }],
              });
            }),
            query: `
            {
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
          `,
            output: '/rss.xml',
            title: 'Gatsby RSS Feed',
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-netlify-cms',
      options: {
        modulePath: `${__dirname}/src/cms/cms.js`,
      },
    },
    {
      resolve: 'gatsby-plugin-eslint',
      options: {
        test: /\.js$|\.jsx$/,
        exclude: /(node_modules|cache|public)/,
        options: {
          emitWarning: true,
          failOnError: false,
        },
      },
    },
    'gatsby-plugin-netlify', // make sure to keep it last in the array
  ],
};
