import React from 'react';
import { StyleSheetManager } from 'styled-components';

const injectStyle = (WrappedComponent) => (props) => {
  const iframe = document.querySelector('iframe');
  const target = iframe.contentDocument.head;

  return (
    <StyleSheetManager target={target}>
      <WrappedComponent {...props} />
    </StyleSheetManager>
  );
};

export default injectStyle;
