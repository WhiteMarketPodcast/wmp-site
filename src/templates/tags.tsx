import React from 'react'
import { Helmet } from 'react-helmet'
import { graphql } from 'gatsby'

import { TagPageQuery } from 'types/gatsby-graphql'

import BlogGrid from 'components/BlogGrid'
import {
  BrandH1,
  FlexCenter,
  FlexCenterWithMargin,
  LinkButton,
  TitleHighlight,
} from 'style/components'

type TagRouteProps = {
  data: TagPageQuery
  pageContext: { tag: string }
}

const TagRoute = ({ data, pageContext }: TagRouteProps) => {
  const {
    allMarkdownRemark: { edges: posts },
    site: { siteMetadata },
  } = data
  const { tag } = pageContext

  return (
    <>
      <section>
        <Helmet title={`${tag} | ${siteMetadata.title}`} />
        <FlexCenter>
          <BrandH1 className="small">
            <span>Posts tagged with</span>
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
