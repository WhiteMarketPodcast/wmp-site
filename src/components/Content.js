import React from 'react';
import { node, string } from 'prop-types';

export const HTMLContent = ({ content, className }) => (
  <div className={className} dangerouslySetInnerHTML={{ __html: content }} />
);

const Content = ({ content, className }) => (
  <div className={className}>{content}</div>
);

Content.propTypes = {
  content: node,
  className: string,
};
Content.defaultProps = {
  content: '',
  className: '',
};

HTMLContent.propTypes = Content.propTypes;
HTMLContent.defaultProps = Content.defaultProps;

export default Content;
