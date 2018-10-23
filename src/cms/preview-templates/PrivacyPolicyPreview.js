import React from 'react';
import PropTypes from 'prop-types';
import { PrivacyPolicyTemplate } from 'templates/privacy-policy';
import injectStyle from '../injectStyle';

const PrivacyPolicyPreview = ({ entry, widgetFor }) => (
  <PrivacyPolicyTemplate
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
