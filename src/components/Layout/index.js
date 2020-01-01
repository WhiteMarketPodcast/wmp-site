import React, { Component } from 'react'
import { node, object } from 'prop-types'
import { PoseGroup } from 'react-pose'
import 'typeface-crete-round'
import 'typeface-montserrat'

import 'style/sass/all.sass'
import GlobalStyle from 'style'

import Footer from 'components/Footer'
import Navbar from 'components/Navbar'
import PodcastPlayer from 'components/PodcastPlayer'
import { TopLevelHelmet } from 'components/Helmets'

import { PageFade } from './styled'

class Layout extends Component {
  static propTypes = {
    children: node.isRequired,
    location: object.isRequired,
  }

  state = {
    mounted: false,
  }

  componentDidMount() {
    this.setState({ mounted: true })
  }

  render() {
    const { children, location } = this.props
    const { mounted } = this.state

    return (
      <>
        <GlobalStyle />
        <TopLevelHelmet />
        <Navbar locationKey={location.key} />
        <PoseGroup animateOnMount preEnterPose={mounted ? `initial` : `enter`}>
          <PageFade key={location.pathname}>
            <main>{children}</main>
          </PageFade>
        </PoseGroup>
        <Footer />
        <PodcastPlayer />
      </>
    )
  }
}

export default Layout
