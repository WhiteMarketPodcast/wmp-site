import React from 'react';
import Layout from './src/components/Layout';
import { delay } from './src/style/poses';

export const wrapPageElement = ({ element, props }) => (
  <Layout {...props}>{element}</Layout>
);

export const shouldUpdateScroll = () => {
  window.setTimeout(() => window.scrollTo(0, 0), delay);
  return false;
};