import React from 'react'
import { object } from 'prop-types'
import { Helmet } from 'react-helmet'
import { graphql } from 'gatsby'
import BlogGrid from 'components/BlogGrid'
import {
  BrandH1,
  FlexCenter,
  FlexCenterWithMargin,
  LinkButton,
  TitleHighlight,
} from 'style/components'

class TagRoute extends React.Component {
  static propTypes = {
    data: object.isRequired,
    pageContext: object.isRequired,
  }

  render() {
    const {
      data: {
        allMarkdownRemark: { edges: posts },
        site: { siteMetadata },
      },
      pageContext: { tag },
    } = this.props

    const tagHeader = `Posts tagged with`

    return (
      <>
        <section>
          <Helmet title={`${tag} | ${siteMetadata.title}`} />
          <FlexCenter>
            <BrandH1 className="small">
              <span>{tagHeader}</span>
              <TitleHighlight>{tag}</TitleHighlight>
            </BrandH1>
          </FlexCenter>
          <BlogGrid posts={posts} />
          <FlexCenterWithMargin>
            <LinkButton to="/tags/">Browse all tags</LinkButton>
          </FlexCenterWithMargin>
        </section>
      </>
    )
  }
}

export default TagRoute

export const tagPageQuery = graphql`
  query TagPage($tag: String) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          excerpt(pruneLength: 400)
          id
          fields {
            slug
          }
          frontmatter {
            date(formatString: "DD MMMM YYYY")
            format
            image {
              childImageSharp {
                fluid(maxWidth: 1700) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
            imageAlt
            title
          }
        }
      }
    }
  }
`
