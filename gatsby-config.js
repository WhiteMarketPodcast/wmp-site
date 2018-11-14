module.exports = {
  siteMetadata: {
    siteUrl: `https://www.whitemarketpodcast.eu`,
    // This is both the title of the site and of the podcast
    title: `White Market Podcast`,
    subtitle: `Free music and free culture`,
    description: `White Market Podcast is show about free music and free culture by Rute Correia. While the show is mainly focused on Creative Commons-licenced music, since it is also naturally intertwined with other movements and ideologies such as Open Source and Open Access, it often features these and similar forms of activism related to digital rights and freedom.`,
    owner: `White Market Podcast`,
    ownerEmail: `whitemarketpodcast@gmail.com`,
    siteLogo: `https://res.cloudinary.com/thekdizzler/image/upload/White_market_logo_1400x1400_wxcdwl.jpg`,
    categories: [`Society & Culture`, `Music`, `Technology`],
  },
  plugins: [
    `gatsby-plugin-resolve-src`,
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sass`,
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-robots-txt`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `White Market Podcast`,
        short_name: `White Market`,
        start_url: `/`,
        background_color: `#F7F7F7`,
        theme_color: `#3F8F85`,
        display: `minimal-ui`,
        icon: `src/img/White_market_favicon.jpg`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-offline`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/pages`,
        name: `pages`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/img`,
        name: `images`,
      },
    },
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [`gatsby-remark-external-links`],
      },
    },
    {
      resolve: `gatsby-plugin-eslint`,
      options: {
        test: /\.js$|\.jsx$/,
        exclude: /(node_modules|cache|public)/,
        options: {
          emitWarning: true,
          failOnError: false,
        },
      },
    },
    `gatsby-plugin-netlify-cms`,
    `gatsby-plugin-netlify`, // make sure to keep it last in the array
  ],
};
