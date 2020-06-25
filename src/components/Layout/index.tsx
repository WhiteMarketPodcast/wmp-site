import React, { useEffect, useState } from 'react'
import { PoseGroup } from 'react-pose'
import 'typeface-crete-round'
import 'typeface-montserrat'

import 'style/sass/all.sass'
import GlobalStyle from 'style'

import Footer from 'components/Footer'
import Navbar from 'components/Navbar'
import PodcastPlayer from 'components/PodcastPlayer'
import { TopLevelHelmet } from 'components/Helmets'

import { PageProps } from 'gatsby'
import { PageFade } from './styled'

const Layout: React.FC<PageProps> = ({ children, location }) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

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

export default Layout
