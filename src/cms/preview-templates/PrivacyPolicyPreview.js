import React from 'react';
import PropTypes from 'prop-types';
import { StandardPageTemplate } from 'templates/standard-page';
import injectStyle from '../injectStyle';

const PrivacyPolicyPreview = ({ entry, widgetFor }) => (
  <StandardPageTemplate
    title={entry.getIn(['data', 'title'])}
    content={widgetFor('body')}
  />
);

PrivacyPolicyPreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }).isRequired,
  widgetFor: PropTypes.func.isRequired,
};

export default injectStyle(PrivacyPolicyPreview);
