import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { BlogPostTemplate } from 'templates/blog-post';

const BlogPostPreview = ({ entry, widgetFor }) => {
  const tags = entry.getIn(['data', 'tags']);
  console.log('tags', tags);
  const tailTags = _.get(tags, '_tail.array');
  console.log('tailTags', tailTags);

  return (
    <BlogPostTemplate
      content={widgetFor('body')}
      description={entry.getIn(['data', 'description'])}
      tags={tailTags || tags}
      title={entry.getIn(['data', 'title'])}
    />
  );
};

BlogPostPreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }).isRequired,
  widgetFor: PropTypes.func.isRequired,
};

export default BlogPostPreview;
