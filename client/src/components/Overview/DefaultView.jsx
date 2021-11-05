/* eslint-disable max-len */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
import React, { useContext, useState } from 'react';
import { OverviewContext } from './context.js';
import DefaultImageThumbnail from './DefaultImageThumbnail.jsx';

const DefaultView = () => {
  const { currentStyle, handleImageClick } = useContext(OverviewContext);
  const [image, setImage] = useState();

  console.log('style photos: ', currentStyle?.photos);

  return (
    <div id="image">
      <img onClick={handleImageClick} className="image" src={image || currentStyle?.photos?.[0].url} alt={currentStyle.name} />
      <div id="defaultCarousel">
        {currentStyle?.photos?.map((thumbnail) => <DefaultImageThumbnail thumbnail={thumbnail} setImage={setImage} />)}
      </div>
    </div>
  );
};

export default DefaultView;
