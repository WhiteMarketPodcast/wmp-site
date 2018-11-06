import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { BlogPostTemplate } from 'templates/blog-post';
// import injectStyle from '../injectStyle';

const BlogPostPreview = ({ entry, widgetFor }) => {
  // TODO: Find a better fix for this
  let tags = entry.getIn(['data', 'tags']);
  if (!_.isArray(tags)) tags = _.get(tags, '_tail.array') || [];

  return (
    <BlogPostTemplate
      content={widgetFor('body')}
      description={entry.getIn(['data', 'description'])}
      tags={tags}
      title={entry.getIn(['data', 'title'])}
      image={entry.getIn(['data', 'image'])}
      imageURL={entry.getIn(['data', 'imageURL'])}
      imageCredit={entry.getIn(['data', 'imageCredit'])}
      format={entry.getIn(['data', 'format'])}
      podcastURL={entry.getIn(['data', 'podcastURL'])}
    />
  );
};

BlogPostPreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }).isRequired,
  widgetFor: PropTypes.func.isRequired,
};

// export default injectStyle(BlogPostPreview);
export default BlogPostPreview;
