import React, { Component } from 'react';
import Layout from 'components/Layout';
import { Section404, H1, LinkButton, TextCenter } from 'style/components/404';

const text404 = `This is not the page\nyou are looking for`;

class NotFoundPage extends Component {
  render() {
    return (
      <Layout>
        <Section404>
          <H1>404</H1>
          <TextCenter>{text404}</TextCenter>
          <LinkButton to="/">Go to home page</LinkButton>
        </Section404>
      </Layout>
    );
  }
}

export default NotFoundPage;
