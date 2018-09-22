import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { BlogPostTemplate } from 'templates/blog-post';
import { StyleSheetManager } from 'styled-components';

const BlogPostPreview = ({ entry, widgetFor }) => {
  const tags = entry.getIn(['data', 'tags']);
  console.log('tags', tags);

  return (
    <StyleSheetManager>
      <BlogPostTemplate
        content={widgetFor('body')}
        description={entry.getIn(['data', 'description'])}
        tags={_.isArray(tags) ? tags : []}
        title={entry.getIn(['data', 'title'])}
      />
    </StyleSheetManager>
  );
};

BlogPostPreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }).isRequired,
  widgetFor: PropTypes.func.isRequired,
};

export default BlogPostPreview;
