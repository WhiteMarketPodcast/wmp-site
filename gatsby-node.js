const _ = require('lodash')
const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')
const { podcastQuery, createRSSFeed } = require('./rss-config.js')

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  const pagesPromise = graphql(`
    {
      allMarkdownRemark(limit: 1000) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              tags
              templateKey
              title
            }
          }
        }
      }
    }
  `).then((result) => {
    if (result.errors) {
      result.errors.forEach((e) => console.error(e.toString()))
      Promise.reject(result.errors)
      return
    }

    const pages = result.data.allMarkdownRemark.edges
    const blogPosts = _.sortBy(
      pages.filter((page) =>
        _.get(page, `node.fields.slug`, ``).includes(`/blog/`),
      ),
      `node.fields.slug`,
    )

    function getOtherPosts(post) {
      const index = _.indexOf(blogPosts, post)
      const postOne = index === 0 ? _.last(blogPosts) : blogPosts[index - 1]
      const postTwo = blogPosts[index + 1] || blogPosts[0]
      const postThree = blogPosts[index + 2] || blogPosts[1]

      return _.map([postOne, postTwo, postThree], `node`)
    }

    pages.forEach((edge) => {
      const {
        id,
        fields: { slug },
        frontmatter: { tags, templateKey },
      } = edge.node

      const otherPosts = getOtherPosts(edge)

      createPage({
        path: slug,
        tags,
        component: path.resolve(`src/templates/${String(templateKey)}.js`),
        // additional data can be passed via context
        context: { id, otherPosts },
      })
    })

    // Tag pages:
    let tags = []
    // Iterate through each post, putting all found tags into `tags`
    pages.forEach((edge) => {
      if (_.get(edge, `node.frontmatter.tags`)) {
        tags = tags.concat(edge.node.frontmatter.tags)
      }
    })
    // Eliminate duplicate tags
    tags = _.uniq(tags)

    // Make tag pages
    tags.forEach((tag) => {
      const tagPath = `/tags/${_.kebabCase(tag)}/`

      createPage({
        path: tagPath,
        component: path.resolve(`src/templates/tags.tsx`),
        context: { tag },
      })
    })
  })

  const rssPromise = graphql(podcastQuery).then(async (podcastData) =>
    createRSSFeed(podcastData),
  )

  return Promise.all([pagesPromise, rssPromise])
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({ name: `slug`, node, value })
  }
}

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [
        path.resolve(__dirname, 'src'),
        path.resolve(__dirname),
        'node_modules',
      ],
    },
  })
}
