import 'typeface-crete-round'
import 'typeface-montserrat'
import 'style/sass/all.sass'

import React from 'react'
import { PageProps } from 'gatsby'

import Footer from 'components/Footer'
import { TopLevelHelmet } from 'components/Helmets'
import Navbar from 'components/Navbar'
import PodcastPlayer from 'components/PodcastPlayer'
import GlobalStyle from 'style'

import { PageContainer } from './styled'

const Layout: React.FC<PageProps> = ({ children, location }) => {
  return (
    <>
      <GlobalStyle />
      <TopLevelHelmet />
      <Navbar locationKey={location.key} />
      <PageContainer>
        <main>{children}</main>
      </PageContainer>
      <Footer />
      <PodcastPlayer />
    </>
  )
}

export default Layout
