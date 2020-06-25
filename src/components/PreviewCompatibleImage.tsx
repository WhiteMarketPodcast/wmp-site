import React from 'react'
import Img, { GatsbyImageProps } from 'gatsby-image'

type Props = {
  className?: string
  image:
    | {
        alt?: string
        childImageSharp: GatsbyImageProps
      }
    | string
  alt?: string
}

const PreviewCompatibleImage: React.FC<Props> = ({
  image,
  alt: altProp = '',
  ...rest
}: Props) => {
  if (typeof image === 'string') {
    return <img {...rest} src={image} alt={altProp} />
  }

  const { alt: imageAlt = '', childImageSharp } = image

  return <Img {...rest} {...childImageSharp} alt={altProp || imageAlt} />
}

export default PreviewCompatibleImage
