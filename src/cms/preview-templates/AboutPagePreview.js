import React from 'react'
import PropTypes from 'prop-types'

import { AboutPageTemplate } from 'templates/about-page'

import injectStyle from '../injectStyle'

const AboutPagePreview = ({ entry, widgetFor }) => (
  <AboutPageTemplate
    title={entry.getIn(['data', 'title'])}
    content={widgetFor('body')}
  />
)

AboutPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }).isRequired,
  widgetFor: PropTypes.func.isRequired,
}

export default injectStyle(AboutPagePreview)
