import React, { Fragment } from 'react';
import { node } from 'prop-types';
import Helmet from 'react-helmet';
import { library, dom } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import 'styles/all.sass';
import 'styles';
import Navbar from 'components/Navbar';
import { Main } from './styled';

library.add(fas, far, fab);
// Kicks off the process of finding <i> tags and replacing with <svg>
dom.watch();

const TemplateWrapper = ({ children }) => (
  <Fragment>
    <Helmet title="White Market Podcast | Free Music and Free Culture" />
    <Navbar />
    <Main>{children}</Main>
  </Fragment>
);

TemplateWrapper.propTypes = {
  children: node.isRequired,
};

export default TemplateWrapper;
