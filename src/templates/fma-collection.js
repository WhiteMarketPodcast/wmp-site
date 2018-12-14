import _ from 'lodash';
import React, { Component } from 'react';
import { array, func, node, object, string } from 'prop-types';
import { graphql } from 'gatsby';
import PageHelmet from 'components/Helmets/PageHelmet';
import Content, { HTMLContent } from 'components/Content';
import { TitleBG, Title, Section } from 'style/components/aboutPage';
import {
  Grid,
  AlbumContainer,
  InfoContainer,
  ArtistAndTitle,
} from 'style/components/fmaPage';

export class FMACollectionTemplate extends Component {
  static propTypes = {
    collection: array.isRequired,
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

  state = { numberToShow: 4 };

  clearShowInfo = (index) => {
    const { showInfo } = this.state;
    if (index !== showInfo) return;
    this.setState({ showInfo: null });
  };

  handleHover = (index) => () => {
    const { showInfo } = this.state;
    if (showInfo === index) return;
    clearTimeout(this.state.timeout);
    this.setState({ showInfo: index });
  };

  handleBlur = (index) => () => {
    this.setState({
      timeout: setTimeout(() => this.clearShowInfo(index), 500),
    });
  };

  hasMore = () => {
    const { collection } = this.props;
    const { numberToShow } = this.state;

    return numberToShow < collection.length;
  };

  loadMore = () => {
    const { numberToShow } = this.state;
    this.setState({ numberToShow: numberToShow + 2 });
  };

  renderAlbums() {
    const { collection } = this.props;
    const { showInfo } = this.state;

    return _.map(collection, ({ artist, title, url, image, genres }, index) => (
      <AlbumContainer
        key={url}
        to={url}
        bgImage={image}
        onFocus={this.handleHover(index)}
        onMouseOver={this.handleHover(index)}
        onBlur={this.handleBlur(index)}
        onMouseLeave={this.handleBlur(index)}
        tabIndex="0"
      >
        <InfoContainer active={index === showInfo}>
          <ArtistAndTitle>{`${artist} - ${title}`}</ArtistAndTitle>
          <div>{`(${genres.join(`, `)})`}</div>
        </InfoContainer>
      </AlbumContainer>
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
          <PageContent className="content" content={content} />
        </Section>
        <Grid loadMore={this.loadMore} hasMore={this.hasMore()}>
          {this.renderAlbums()}
        </Grid>
      </>
    );
  }
}

const FMACollection = ({ data }) => {
  const { markdownRemark: post } = data;
  const description = post.excerpt.replace(/\s{2}/g, ` `).replace(/\s\./g, `.`);
  const { title } = post.frontmatter;

  return (
    <FMACollectionTemplate
      contentComponent={HTMLContent}
      title={post.frontmatter.title}
      collection={post.frontmatter.collection}
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

FMACollection.propTypes = {
  data: object.isRequired,
};

export default FMACollection;

export const fmaCollectionQuery = graphql`
  query FMACollection($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      excerpt(pruneLength: 5000)
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
      fields {
        slug
      }
    }
  }
`;
