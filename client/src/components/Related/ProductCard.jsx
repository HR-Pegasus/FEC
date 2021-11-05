import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import RelatedContext from './context';
import AppContext from '../../context';
import Stars from '../Reviews/Stars.jsx';
import starIcon from '../../assets/starIcon.jpeg';

const ProductCard = ({ id }) => {
  const context = useContext(RelatedContext);
  const appContext = useContext(AppContext);
  const [image, setImage] = useState('https://pluspng.com/img-png/loader-png-indicator-loader-spinner-icon-512.png');
  const [category, setCategory] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [relatedAverage, setRelatedAverage] = useState(0);

  // console.log('context here ', context);

  const getDisplay = () => {
    axios.get(`/products/${id}`).then((response) => {
      const categorySet = response.data.category;
      const nameSet = response.data.name;
      const priceSet = response.data.default_price;
      setCategory(categorySet);
      setName(nameSet);
      setPrice(priceSet);
    })
      .catch((err) => {
        console.log(err);
      });
    axios.get(`/products/${id}/styles`).then((res) => {
      for (let i = 0; i < res.data.results.length; i += 1) {
        if (res.data.results[i]['default?'] === true) {
          let photo_url = res.data.results[i].photos[0].thumbnail_url;
          if (photo_url === null || photo_url === undefined) {
            photo_url = 'https://pluspng.com/img-png/loader-png-indicator-loader-spinner-icon-512.png';
          }
          setImage(photo_url);
        }
      }
    })
      .catch((err) => {
        console.log(err);
      });
  };

  const getRelatedAverage = () => {
    axios({
      method: 'GET',
      url: `/reviews/meta/?product_id=${id}`,
    })
      .then((res) => {
        let sum = 0;
        let count = 0;
        Object.keys(res.data.ratings).forEach((rating) => {
          sum += rating * res.data.ratings[rating];
          count += Number(res.data.ratings[rating]);
        });
        setRelatedAverage(Number((sum / count).toFixed(2)));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getDisplay();
    getRelatedAverage();
  }, [context]);

  return (
    <div>
      <div id="default_image">
        <img id={id} src={image} width="150" height="150" />
        <div id="actionButton"><img src={starIcon} height="20" width="20" /></div>

      </div>
      <div className="product_category" id={id}>{category}</div>
      <div className="product_name" id={id}>{name}</div>
      <div className="product_price" id={id}>{price}</div>
      <Stars average={relatedAverage} />
    </div>
  );
};

export default ProductCard;
