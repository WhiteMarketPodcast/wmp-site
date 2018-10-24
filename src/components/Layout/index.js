import React, { Component } from 'react';
import { node, object } from 'prop-types';
import { PoseGroup } from 'react-pose';
import 'typeface-crete-round';
import 'typeface-montserrat';
import { library, dom } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import Footer from 'components/Footer';
import Navbar from 'components/Navbar';
import { TopLevelHelmet } from 'components/Helmets';
import 'style/sass/all.sass';
import GlobalStyle from 'style';
import { PageFade } from './styled';

library.add(fas, far, fab);
// Kicks off the process of finding <i> tags and replacing with <svg>
dom.watch();

class TemplateWrapper extends Component {
  static propTypes = {
    children: node.isRequired,
    location: object.isRequired,
  };

  state = { mounted: false };

  componentDidMount() {
    this.setState({ mounted: true });
  }

  render() {
    const { children, location } = this.props;
    const { mounted } = this.state;

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
      </>
    );
  }
}

export default TemplateWrapper;
