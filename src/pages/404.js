import React, { Component } from 'react'

import { H1, LinkButton, Section404, TextCenter } from 'style/components/404'

const text404 = `This is not the page\nyou are looking for`

class NotFoundPage extends Component {
  render() {
    return (
      <>
        <Section404>
          <H1>404</H1>
          <TextCenter>{text404}</TextCenter>
          <LinkButton to="/">Go to home page</LinkButton>
        </Section404>
      </>
    )
  }
}

export default NotFoundPage
