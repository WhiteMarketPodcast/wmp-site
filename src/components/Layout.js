import React, { Fragment } from 'react';
import { node } from 'prop-types';
import Helmet from 'react-helmet';
import 'styles/all.sass';
import 'styles';

import Navbar from './Navbar';

const TemplateWrapper = ({ children }) => (
  <Fragment>
    <Helmet title="Home | Gatsby + Netlify CMS" />
    <Navbar />
    <main>{children}</main>
  </Fragment>
);

TemplateWrapper.propTypes = {
  children: node.isRequired,
};

export default TemplateWrapper;
