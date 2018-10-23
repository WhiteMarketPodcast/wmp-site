import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Content, { HTMLContent } from 'components/Content';
import { PaddedSection, BrandH1, FlexCenter } from 'style/components';

export const PrivacyPolicyTemplate = ({ title, content, contentComponent }) => {
  const PageContent = contentComponent || Content;

  return (
    <PaddedSection>
      <FlexCenter>
        <BrandH1 moreMarginOnTop>{title}</BrandH1>
      </FlexCenter>
      <PageContent className="content" content={content} />
    </PaddedSection>
  );
};

PrivacyPolicyTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
};

PrivacyPolicyTemplate.defaultProps = {
  content: '',
  contentComponent: undefined,
};

const PrivacyPolicy = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <PrivacyPolicyTemplate
      contentComponent={HTMLContent}
      title={post.frontmatter.title}
      content={post.html}
    />
  );
};

PrivacyPolicy.propTypes = {
  data: PropTypes.object.isRequired,
};

export default PrivacyPolicy;

export const aboutPageQuery = graphql`
  query PrivacyPolicy($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
      }
    }
  }
`;
