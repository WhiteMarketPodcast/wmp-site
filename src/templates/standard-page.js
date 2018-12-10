import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Content, { HTMLContent } from 'components/Content';
import PageHelmet from 'components/Helmets/PageHelmet';
import { PaddedSection, BrandH1, FlexCenter } from 'style/components';

export const StandardPageTemplate = ({
  title,
  content,
  contentComponent,
  helmet,
}) => {
  const PageContent = contentComponent || Content;

  return (
    <PaddedSection>
      {helmet}
      <FlexCenter>
        <BrandH1 moreMarginOnTop>{title}</BrandH1>
      </FlexCenter>
      <PageContent className="content" content={content} />
    </PaddedSection>
  );
};

StandardPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
  helmet: PropTypes.node,
};

StandardPageTemplate.defaultProps = {
  content: '',
  contentComponent: undefined,
  helmet: undefined,
};

const StandardPage = ({ data }) => {
  const { markdownRemark: post } = data;
  const { title, description } = post.frontmatter;
  const { slug } = post.fields;

  return (
    <StandardPageTemplate
      contentComponent={HTMLContent}
      title={post.frontmatter.title}
      content={post.html}
      helmet={
        <PageHelmet pageTitle={title} description={description} path={slug} />
      }
    />
  );
};

StandardPage.propTypes = {
  data: PropTypes.object.isRequired,
};

export default StandardPage;

export const standardPageQuery = graphql`
  query StandardPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      fields {
        slug
      }
      frontmatter {
        title
        description
      }
    }
  }
`;
