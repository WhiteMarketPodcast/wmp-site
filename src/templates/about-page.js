import React from 'react'
import { graphql } from 'gatsby'
import PropTypes from 'prop-types'

import Content, { HTMLContent } from 'components/Content'
import { Section, Title, TitleBG } from 'style/components/aboutPage'

export const AboutPageTemplate = ({ title, content, contentComponent }) => {
  const PageContent = contentComponent || Content

  return (
    <>
      <TitleBG>
        <Title>{title}</Title>
      </TitleBG>
      <Section>
        <PageContent className="content" content={content} />
      </Section>
    </>
  )
}

AboutPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
}

AboutPageTemplate.defaultProps = {
  content: '',
  contentComponent: undefined,
}

const AboutPage = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <AboutPageTemplate
      contentComponent={HTMLContent}
      title={post.frontmatter.title}
      content={post.html}
    />
  )
}

AboutPage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default AboutPage

export const aboutPageQuery = graphql`
  query AboutPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
      }
    }
  }
`
