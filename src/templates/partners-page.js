import _ from 'lodash';
import React, { Component } from 'react';
import { array, func, node, object, string } from 'prop-types';
import { graphql } from 'gatsby';
import PageHelmet from 'components/Helmets/PageHelmet';
import Link from 'components/Link';
import Content, { HTMLContent } from 'components/Content';
import { TitleBG, Title, Section } from 'style/components/aboutPage';
import { PartnerGrid, TextContainer } from 'style/components/partnersPage';
import { getImageURL } from '../utils/images';

export class PartnersPageTemplate extends Component {
  static propTypes = {
    partners: array.isRequired,
    title: string.isRequired,
    content: string,
    contentComponent: func,
    helmet: node,
  };

  static defaultProps = {
    content: '',
    contentComponent: undefined,
    helmet: null,
  };

  renderPartnersList() {
    const { partners } = this.props;
    console.log(`partners`, partners);
    return _.map(partners, ({ name, description, logo, url }) => (
      <PartnerGrid key={name}>
        <div className="image">
          <img src={getImageURL({ image: logo, width: 150 })} alt={`${name} logo`} />
        </div>
        <TextContainer>
          <h3>{name}</h3>
          <HTMLContent content={description} />
          <Link to={url}>{`Check out ${name}`}</Link>
        </TextContainer>
      </PartnerGrid>
    ));
  }

  render() {
    const { title, content, contentComponent, helmet } = this.props;
    const PageContent = contentComponent || Content;

    return (
      <>
        {helmet}
        <TitleBG>
          <Title>{title}</Title>
        </TitleBG>
        <Section>
          <PageContent content={content} />
          {this.renderPartnersList()}
        </Section>
      </>
    );
  }
}

const PartnersPage = ({ data }) => {
  const { markdownRemark: post } = data;
  const { title, description, partners } = post.frontmatter;

  return (
    <PartnersPageTemplate
      contentComponent={HTMLContent}
      title={title}
      partners={partners}
      content={post.html}
      helmet={(
        <PageHelmet
          pageTitle={title}
          description={description}
          path={post.fields.slug}
        />
      )}
    />
  );
};

PartnersPage.propTypes = {
  data: object.isRequired,
};

export default PartnersPage;

export const PartnersPageQuery = graphql`
  query PartnersPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      excerpt(pruneLength: 5000)
      frontmatter {
        title
        partners {
          name
          description
          logo
          url
        }
      }
      fields {
        slug
      }
    }
  }
`;
