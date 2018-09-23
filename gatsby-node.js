const _ = require('lodash');
const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;

  return graphql(`
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
      result.errors.forEach((e) => console.error(e.toString()));
      return Promise.reject(result.errors);
    }

    const pages = result.data.allMarkdownRemark.edges;
    const blogPosts = _(pages)
      .filter((page) => _.includes(_.get(page, 'node.fields.slug'), `/blog/`))
      .sortBy('node.fields.slug')
      .value();

    function getNextOrPrevious(post, offset) {
      const index = _.indexOf(blogPosts, post);
      const otherIndex = index + offset;
      const otherPost = blogPosts[otherIndex];
      return otherPost ? otherPost.node : {};
    }

    pages.forEach((edge) => {
      const {
        id,
        fields: { slug },
        frontmatter: { tags, templateKey },
      } = edge.node;

      // This might seem backward, but it's "previous" as in "back in time"
      const previousPost = getNextOrPrevious(edge, 1);
      const nextPost = getNextOrPrevious(edge, -1);

      createPage({
        path: slug,
        tags,
        component: path.resolve(`src/templates/${String(templateKey)}.js`),
        // additional data can be passed via context
        context: { id, previousPost, nextPost },
      });
    });

    // Tag pages:
    let tags = [];
    // Iterate through each post, putting all found tags into `tags`
    pages.forEach((edge) => {
      if (_.get(edge, `node.frontmatter.tags`)) {
        tags = tags.concat(edge.node.frontmatter.tags);
      }
    });
    // Eliminate duplicate tags
    tags = _.uniq(tags);

    // Make tag pages
    tags.forEach((tag) => {
      const tagPath = `/tags/${_.kebabCase(tag)}/`;

      createPage({
        path: tagPath,
        component: path.resolve(`src/templates/tags.js`),
        context: { tag },
      });
    });
  });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode });
    createNodeField({ name: `slug`, node, value });
  }
};
