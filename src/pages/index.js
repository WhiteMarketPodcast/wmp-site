import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import { graphql, Link } from 'gatsby'
import Image from 'gatsby-image'
import _ from 'lodash'
import { array, shape, string } from 'prop-types'

import PlayButton from 'components/PlayButton'
import SubscribeLinksBar from 'components/SubscribeLinksBar'
import PodcastContext from 'contexts/PodcastContext'
import {
  BlogPostPreviewGrid,
  BlogPreviewContainer,
  BlogPreviewImage,
  BrandH2,
  DateText,
  FlexCenter,
  LinkButton,
  PodcastPlayBox,
  PodcastSection,
  PodcastSectionContents,
  PodcastSmallText,
  PodcastTextContainer,
  PodcastTitle,
  PostType,
  PreviewTextContainer,
  PreviewTitle,
  SeeMoreContainer,
} from 'style/components'
import { formatConverter, isFirstPostPodcast } from 'utils'

export default class IndexPage extends Component {
  static propTypes = {
    data: shape({
      site: shape({
        siteMetadata: shape({
          title: string.isRequired,
          siteUrl: string.isRequired,
        }),
      }),
      podcast: shape({ edges: array }),
      posts: shape({ edges: array }),
    }).isRequired,
  }

  static contextType = PodcastContext

  getPodcastInfo = () => this.props.data.podcast.edges[0].node

  handlePlayButtonClick = () => {
    const { podcastURL } = this.getPodcastInfo().frontmatter
    const { isPlaying, url, setPodcastState, setPlaying } = this.context

    if (podcastURL === url) {
      setPlaying(!isPlaying)
    } else {
      setPodcastState({ url: podcastURL })
    }
  }

  renderPodcast() {
    const { isBuffering, isPlaying, url } = this.context
    const { fields, frontmatter } = this.getPodcastInfo()
    const { slug } = fields
    const { title, podcastURL, image } = frontmatter

    return (
      <PodcastSection>
        <Image fluid={image.childImageSharp.fluid} className="fill" />
        <PodcastSectionContents>
          <PodcastPlayBox>
            <PodcastTextContainer>
              <PodcastSmallText>Latest session</PodcastSmallText>
              <Link to={slug}>
                <PodcastTitle>{title}</PodcastTitle>
              </Link>
            </PodcastTextContainer>
            <PlayButton
              isBuffering={isBuffering}
              isPlaying={url === podcastURL && isPlaying}
              onClick={this.handlePlayButtonClick}
              screenReaderText="Listen to the latest session"
            />
          </PodcastPlayBox>
          <SubscribeLinksBar />
        </PodcastSectionContents>
      </PodcastSection>
    )
  }

  renderPost = ({ node: post }, index) => {
    const {
      id,
      frontmatter: { image, title, date, format },
      fields: { slug },
    } = post

    return (
      <BlogPreviewContainer key={id} to={slug}>
        <BlogPreviewImage>
          <Image fluid={[image.childImageSharp.fluid]} className="fill" />
        </BlogPreviewImage>
        <PreviewTextContainer index={index}>
          <PostType format={format}>{formatConverter[format]}</PostType>
          <PreviewTitle index={index}>{title}</PreviewTitle>
          <DateText index={index}>{date}</DateText>
        </PreviewTextContainer>
      </BlogPreviewContainer>
    )
  }

  renderPosts() {
    const { data } = this.props
    const { edges } = data.posts
    const posts = isFirstPostPodcast(edges) ? _.tail(edges) : _.take(edges, 8)

    return (
      <section>
        <FlexCenter>
          <BrandH2>Latest Posts</BrandH2>
        </FlexCenter>

        <BlogPostPreviewGrid>
          {_.map(posts, this.renderPost)}
        </BlogPostPreviewGrid>

        <SeeMoreContainer>
          <LinkButton to="/blog/">See more posts</LinkButton>
        </SeeMoreContainer>
      </section>
    )
  }

  render() {
    const { data } = this.props
    const { title, subtitle, siteUrl } = data.site.siteMetadata

    return (
      <>
        <Helmet>
          <title>{`${title} | ${subtitle}`}</title>
          <link
            type="application/rss+xml"
            rel="alternate"
            title={title}
            href={`${siteUrl}/rss.xml`}
          />
        </Helmet>
        {this.renderPodcast()}
        {this.renderPosts()}
      </>
    )
  }
}

export const pageQuery = graphql`
  query IndexPage {
    site {
      siteMetadata {
        title
        subtitle
        siteUrl
      }
    }
    posts: allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
      limit: 9
    ) {
      edges {
        node {
          excerpt(pruneLength: 400)
          id
          fields {
            slug
          }
          frontmatter {
            title
            templateKey
            date(formatString: "DD MMMM YYYY")
            image {
              childImageSharp {
                fluid(
                  maxWidth: 1700
                  srcSetBreakpoints: [150, 400, 700, 1000, 1500, 1900]
                  sizes: "(max-width: 700px) 275px, (max-width: 1000px) 400px, 1100px"
                ) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
            imageAlt
            format
          }
        }
      }
    }
    podcast: allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { format: { eq: "audio" } } }
      limit: 1
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
            image {
              childImageSharp {
                fluid(maxWidth: 1700) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
            imageAlt
            podcastURL
          }
        }
      }
    }
  }
`
