import React, { Component } from 'react';
import { node, string } from 'prop-types';
import Helmet from 'react-helmet';

class TwitterHelmet extends Component {
  static propTypes = {
    title: string.isRequired,
    description: string,
    image: string.isRequired,
    imageAlt: string,
    cardType: string,
    children: node,
  };

  static defaultProps = {
    cardType: `summary`,
    imageAlt: ``,
    children: null,
    description: ``,
  };

  render() {
    const {
      cardType,
      children,
      description,
      image,
      imageAlt,
      title,
    } = this.props;

    return (
      <Helmet>
        <meta name="twitter:card" content={cardType} />
        <meta name="twitter:site" content="@WhiteMarketCast" />
        <meta name="twitter:title" content={title} />
        {description && (
          <meta name="twitter:description" content={description} />
        )}
        <meta name="twitter:image" content={image} />
        <meta name="twitter:image:imageAlt" content={imageAlt} />
        {children}
      </Helmet>
    );
  }
}

export default TwitterHelmet;
