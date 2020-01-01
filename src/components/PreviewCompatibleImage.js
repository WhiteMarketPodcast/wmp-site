import React from 'react'
import PropTypes from 'prop-types'
import Img from 'gatsby-image'

const PreviewCompatibleImage = ({ imageInfo, alt: altProp, ...rest }) => {
  const { alt: imageAlt = '', childImageSharp, image } = imageInfo
  const alt = altProp || imageAlt

  if (image && !!image.childImageSharp) {
    return <Img {...rest} fluid={image.childImageSharp.fluid} alt={alt} />
  }

  if (childImageSharp) {
    return <Img {...rest} fluid={childImageSharp.fluid} alt={alt} />
  }

  if (image && typeof image === 'string') {
    return <img src={image} alt={alt} />
  }

  return null
}

PreviewCompatibleImage.propTypes = {
  imageInfo: PropTypes.shape({
    alt: PropTypes.string,
    childImageSharp: PropTypes.object,
    image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    style: PropTypes.object,
  }).isRequired,
  alt: PropTypes.string,
}

PreviewCompatibleImage.defaultProps = {
  alt: ``,
}

export default PreviewCompatibleImage
