import _ from 'lodash';
import React, { Component } from 'react';
import { array } from 'prop-types';
import { formatConverter } from 'utils';
import {
  BlogListGrid,
  BlogPreviewContainer,
  BlogPreviewImage,
  PreviewTextContainer,
  PostType,
  PreviewTitle,
  ExcerptContainer,
  DateText,
} from './styled';
import PreviewCompatibleImage from '../PreviewCompatibleImage';

class BlogGrid extends Component {
  static propTypes = {
    posts: array.isRequired,
  };

  state = { numberToShow: 4, showExcerpt: null };

  clearShowExcerpt = (index) => {
    const { showExcerpt } = this.state;
    if (index !== showExcerpt) return;
    this.setState({ showExcerpt: null });
  };

  handleHover = (index) => () => {
    const { showExcerpt } = this.state;
    if (showExcerpt === index) return;
    clearTimeout(this.state.timeout);
    this.setState({ showExcerpt: index });
  };

  handleBlur = (index) => () => {
    this.setState({
      timeout: setTimeout(() => this.clearShowExcerpt(index), 500),
    });
  };

  hasMore = () => {
    const { numberToShow } = this.state;
    const { posts } = this.props;

    return numberToShow < posts.length;
  };

  loadMore = () => {
    const { numberToShow } = this.state;
    this.setState({ numberToShow: numberToShow + 4 });
  };

  renderPost = ({ node: post }, index) => {
    const { showExcerpt } = this.state;
    const {
      id,
      frontmatter: { image, title, date, format },
      fields: { slug },
      excerpt,
    } = post;
    const excerptClass = showExcerpt === index ? `active` : ``;

    return (
      <BlogPreviewContainer
        key={id}
        to={slug}
        onFocus={this.handleHover(index)}
        onMouseOver={this.handleHover(index)}
        onBlur={this.handleBlur(index)}
        onMouseLeave={this.handleBlur(index)}
        tabIndex="0"
      >
        <BlogPreviewImage>
          {image && <PreviewCompatibleImage imageInfo={image} />}
        </BlogPreviewImage>
        <PreviewTextContainer index={index}>
          <PostType format={format}>{formatConverter[format]}</PostType>
          <PreviewTitle index={index}>{title}</PreviewTitle>
          <DateText>{date}</DateText>
        </PreviewTextContainer>
        <ExcerptContainer className={excerptClass}>{excerpt}</ExcerptContainer>
      </BlogPreviewContainer>
    );
  };

  renderPosts() {
    const { numberToShow } = this.state;
    const { posts } = this.props;

    return _(posts)
      .take(numberToShow)
      .map(this.renderPost)
      .value();
  }

  render() {
    return (
      <BlogListGrid hasMore={this.hasMore()} loadMore={this.loadMore}>
        {this.renderPosts()}
      </BlogListGrid>
    );
  }
}

export default BlogGrid;
