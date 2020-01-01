import _ from 'lodash'
import React, { Component } from 'react'
import { array, func, node, string, shape, object } from 'prop-types'
import { graphql } from 'gatsby'
import { FaEnvelope, FaFacebook, FaTwitter, FaWhatsapp } from 'react-icons/fa'

import { licenceURLs } from 'utils'
import { getShareURLs } from 'utils/sharing'

import PodcastContext from 'contexts/PodcastContext'
import Link from 'components/Link'
import PlayButton from 'components/PlayButton'
import VideoPlayer from 'components/VideoPlayer'
import Content, { HTMLContent } from 'components/Content'
import PageHelmet from 'components/Helmets/PageHelmet'
import PreviewCompatibleImage from 'components/PreviewCompatibleImage'
import { SrText } from 'style/components'
import {
  Hero,
  HeroContents,
  Title,
  Column,
  BlogContent,
  ImageCredit,
  Date,
  TagList,
  Sidebar,
  BlogPostLink,
  BlogPostLinksContainer,
  TagLink,
  VideoPlyrContainer,
  ShareLink,
  ShareLinksContainer,
  Fade,
  CenteredFade,
} from 'style/components/blogPostPage'

function renderImageInfoSpan(text, name, url) {
  return (
    <span>
      {text}
      {url ? <Link to={url}>{name}</Link> : name}
    </span>
  )
}

export class BlogPostTemplate extends Component {
  static propTypes = {
    content: node.isRequired,
    contentComponent: func,
    format: string.isRequired,
    image: string,
    imageURL: string,
    imageCredit: shape({
      licence: string,
      author: shape({
        name: string,
        url: string,
        site: string,
        siteURL: string,
      }),
    }),
    podcastURL: string,
    videoURL: string,
    date: string.isRequired,
    title: string.isRequired,
    siteUrl: string.isRequired,
    slug: string.isRequired,
    twitterUsername: string.isRequired,
    helmet: node,
    pageContext: object.isRequired,
    tags: array,
  }

  static defaultProps = {
    contentComponent: undefined,
    tags: [],
    helmet: null,
    image: ``,
    imageCredit: undefined,
    imageURL: ``,
    podcastURL: ``,
    videoURL: ``,
  }

  static contextType = PodcastContext

  state = {
    showMedia: false,
  }

  getMediaURL = () => {
    const { podcastURL, videoURL } = this.props
    return podcastURL || videoURL
  }

  handlePlayClick = () => {
    const { format } = this.props
    const { showMedia } = this.state
    const { setPodcastState, url: currentURL } = this.context
    const url = this.getMediaURL()

    if (format === `audio`) {
      if (url !== currentURL) {
        setPodcastState({ url })
      } else {
        const playerButton = document.getElementById(`podcast-play-button`)
        if (playerButton) playerButton.click()
      }
    }
    if (!showMedia) {
      this.setState({ showMedia: true })
    }
  }

  isPlaying = () => {
    const { isPlaying } = this.context
    const mediaURL = this.getMediaURL()
    const { url } = this.context

    return url === mediaURL && isPlaying
  }

  renderShareLinks() {
    const { title, slug, siteUrl, twitterUsername } = this.props

    const { facebookURL, twitterURL, whatsAppURL, mailto } = getShareURLs({
      url: `${siteUrl}${slug}`,
      text: title,
      twitterUsername,
    })

    return (
      <>
        <h4>Share</h4>
        <ShareLinksContainer>
          <ShareLink to={twitterURL}>
            <FaTwitter />
            <SrText>Share this post on Twitter</SrText>
          </ShareLink>
          <ShareLink to={facebookURL}>
            <FaFacebook />
            <SrText>Share this post on Facebook</SrText>
          </ShareLink>
          <ShareLink to={whatsAppURL}>
            <FaWhatsapp />
            <SrText>Share this post on WhatsApp</SrText>
          </ShareLink>
          <ShareLink to={mailto}>
            <FaEnvelope />
            <SrText>Email someone a link to this post</SrText>
          </ShareLink>
        </ShareLinksContainer>
      </>
    )
  }

  renderTags() {
    const { tags } = this.props
    if (_.isEmpty(tags)) return null

    const tagList = _.map(tags, (tag) => (
      <li key={`${tag}tag`}>
        <TagLink to={`/tags/${_.kebabCase(tag)}/`}>{tag}</TagLink>
      </li>
    ))

    return (
      <>
        <h4>Tags</h4>
        <TagList>{tagList}</TagList>
      </>
    )
  }

  renderSidebar() {
    return (
      <Sidebar>
        {this.renderShareLinks()}
        {this.renderTags()}
        {this.renderLinksToOtherPosts()}
      </Sidebar>
    )
  }

  renderLinksToOtherPosts() {
    const { pageContext } = this.props
    if (!pageContext) return null

    const { otherPosts } = pageContext

    const links = _.map(otherPosts, (post) => {
      if (_.isEmpty(post)) return null
      const { title } = post.frontmatter
      const { slug } = post.fields
      return (
        <li key={slug}>
          <BlogPostLink to={slug}>{`.: ${title}`}</BlogPostLink>
        </li>
      )
    })

    return (
      <div>
        <h4>More from the blog</h4>
        <BlogPostLinksContainer>{links}</BlogPostLinksContainer>
      </div>
    )
  }

  renderImageCredit() {
    const { imageCredit } = this.props
    if (!_.isObject(imageCredit)) return null
    const { author, licence } = imageCredit
    const { name, url, site, siteURL } = author || {}
    const licenceURL = licence && licenceURLs[licence]

    const photoBy = renderImageInfoSpan(`Photo by `, name, url)
    const where = site && renderImageInfoSpan(` on `, site, siteURL)
    const licenceInfo =
      licence && renderImageInfoSpan(` – `, licence, licenceURL)

    return (
      <ImageCredit>
        {photoBy}
        {where}
        {licenceInfo}
      </ImageCredit>
    )
  }

  renderVideo() {
    const { format, image, imageURL } = this.props
    const { showMedia } = this.state
    const url = this.getMediaURL()
    if (format !== `video` || !showMedia || !url) return null
    return (
      <VideoPlyrContainer
        className={format}
        key={url}
        bgImage={image || imageURL}
      >
        <VideoPlayer url={url} />
      </VideoPlyrContainer>
    )
  }

  renderTitle() {
    const { format, image, imageURL, title, date } = this.props
    const { showMedia } = this.state
    if (showMedia && format === `video`) return null

    return (
      <Hero>
        <PreviewCompatibleImage
          imageInfo={image || imageURL}
          className="fill"
        />
        <HeroContents>
          <CenteredFade>
            <Title>{title}</Title>
            {this.renderPlayButton()}
            <Date>{date}</Date>
          </CenteredFade>
        </HeroContents>
      </Hero>
    )
  }

  renderPlayButton() {
    const url = this.getMediaURL()
    const { format } = this.props
    const srText = `Play ${format === `audio` ? `podcast` : format}`
    if (!url) return null

    return (
      <Fade>
        <PlayButton
          onClick={this.handlePlayClick}
          isPlaying={this.isPlaying()}
          screenReaderText={srText}
        />
      </Fade>
    )
  }

  render() {
    const { content, contentComponent, helmet } = this.props
    const PostContent = contentComponent || Content

    return (
      <section>
        {helmet}
        {this.renderTitle()}
        <Column>
          <div>
            {this.renderVideo()}
            {this.renderImageCredit()}
            <BlogContent>
              <PostContent content={content} />
            </BlogContent>
          </div>
          {this.renderSidebar()}
        </Column>
      </section>
    )
  }
}

const BlogPost = ({ data, pageContext }) => {
  const {
    site: {
      siteMetadata: { siteUrl, twitterUsername },
    },
    markdownRemark: {
      html,
      frontmatter,
      fields: { slug },
    },
  } = data
  const { title, description, image, imageURL, imageAlt } = frontmatter
  const imageSrc = _.get(image, 'childImageSharp.fluid.src', imageURL)

  return (
    <BlogPostTemplate
      content={html}
      contentComponent={HTMLContent}
      helmet={
        <PageHelmet
          pageTitle={title}
          description={description}
          path={slug}
          image={imageSrc}
          imageAlt={imageAlt}
          largeTwitterCard
        />
      }
      pageContext={pageContext}
      siteUrl={siteUrl}
      twitterUsername={twitterUsername}
      slug={slug}
      {...frontmatter}
    />
  )
}

BlogPost.propTypes = {
  data: shape({
    markdownRemark: object,
  }).isRequired,
  pageContext: object.isRequired,
}

export default BlogPost

export const pageQuery = graphql`
  query BlogPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "DD MMMM YYYY")
        title
        description
        image {
          childImageSharp {
            fluid(maxWidth: 1700) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
        imageURL
        imageCredit {
          author {
            name
            url
            site
            siteURL
          }
          licence
        }
        imageAlt
        format
        tags
        podcastURL
        videoURL
      }
      fields {
        slug
      }
    }
    site {
      siteMetadata {
        siteUrl
        twitterUsername
      }
    }
  }
`
