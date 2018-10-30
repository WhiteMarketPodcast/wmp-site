import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Content, { HTMLContent } from 'components/Content';
import { TitleBG, Title, Section } from 'style/components/aboutPage';

export const FMACollectionTemplate = ({
  title,
  collection,
  content,
  contentComponent,
}) => {
  console.log('collection', collection);
  const PageContent = contentComponent || Content;

  return (
    <>
      <TitleBG>
        <Title>{title}</Title>
      </TitleBG>
      <Section>
        <PageContent className="content" content={content} />
      </Section>
    </>
  );
};

FMACollectionTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
};

FMACollectionTemplate.defaultProps = {
  content: '',
  contentComponent: undefined,
};

const FMACollection = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <FMACollectionTemplate
      contentComponent={HTMLContent}
      title={post.frontmatter.title}
      collection={post.frontmatter.collection}
      content={post.html}
    />
  );
};

FMACollection.propTypes = {
  data: PropTypes.object.isRequired,
};

export default FMACollection;

export const fmaCollectionQuery = graphql`
  query FMACollection($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        collection {
          title
          artist
          image
          genres
          url
        }
      }
    }
  }
`;
