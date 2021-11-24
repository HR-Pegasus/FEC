/* eslint-disable react/prop-types */
// import axios from 'axios';
import React, { Fragment, cloneElement } from 'react';

const MetaData = ({ children }) => {
  const captureClickData = (e, module) => {
    const click = {
      element: e.target.localName,
      widget: module,
      time: new Date(),
    };
    // axios.post('/interactions', click)
    //   .catch((err) => console.error(err));
  };

  return (
    <>
      {children.map((child) => cloneElement(child, { captureClickData }))}
    </>
  );
};

export default MetaData;
