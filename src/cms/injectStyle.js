import React from 'react';
import GlobalStyle from 'styled-components';

const injectStyle = (WrappedComponent) => (props) => (
    <>
      <GlobalStyle />
      <WrappedComponent {...props} />
    </>
);

export default injectStyle;
