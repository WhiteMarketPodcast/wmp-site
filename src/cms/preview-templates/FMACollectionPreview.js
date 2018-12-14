import React from 'react';
import PropTypes from 'prop-types';
import { FMACollectionTemplate } from 'templates/fma-collection';
import injectStyle from '../injectStyle';

const FMACollectionPreview = ({ entry, widgetFor }) => (
  <FMACollectionTemplate
    title={entry.getIn(['data', 'title'])}
    collection={entry.getIn(['data', 'collection'])}
    content={widgetFor('body')}
  />
);

FMACollectionPreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }).isRequired,
  widgetFor: PropTypes.func.isRequired,
};

export default injectStyle(FMACollectionPreview);
