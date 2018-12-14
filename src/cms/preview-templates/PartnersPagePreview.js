import React from 'react';
import PropTypes from 'prop-types';
import { PartnersPageTemplate } from 'templates/partners-page';
import injectStyle from '../injectStyle';

const PartnersPagePreview = ({ entry, widgetFor }) => (
  <PartnersPageTemplate
    content={widgetFor('body')}
    title={entry.getIn(['data', 'title'])}
    partners={entry.getIn(['data', 'partners'])}
  />
);

PartnersPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }).isRequired,
  widgetFor: PropTypes.func.isRequired,
};

export default injectStyle(PartnersPagePreview);
