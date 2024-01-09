// src/routes/some-page.js

import React from 'react';
import MyIframe from './login';

const SomePage = () => {
  return (
    <div>
      <h1>Third-Party Editor</h1>
      <MyIframe src="URL_OF_THIRD_PARTY_EDITOR" />
    </div>
  );
};

export default SomePage;
