/* eslint-disable no-restricted-syntax */
/* eslint-disable max-len */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
/* eslint-disable no-unused-expressions */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Overview from './components/Overview/Overview.jsx';
// import Related from './components/Related/Related.jsx';
// import Reviews from './components/Reviews/Reviews.jsx';
import Header from './components/Header/Header.jsx';
import AppContext from './context.js';
import MetaData from './MetaData.jsx';

const App = () => {
  const [currentProduct, setCurrentProduct] = useState();
  // const [currentReview, setCurrentReview] = useState([]);
  const [relatedIds, setRelatedID] = useState([]);
  // const [average, setAverage] = useState();
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [relatedStyles, setRelatedStyles] = useState([]);
  // const [totalReviews, setTotalReviews] = useState(0);
  const [products, setProducts] = useState([]);
  // const [productAvgs, setProductAvgs] = useState();
  const [styles, setStyles] = useState([]);
  const [currentStyle, setStyle] = useState({});
  const [currentFeature, setCurrentFeature] = useState([]);
  const [stone, setTheStone] = useState();

  // const calcReviewsAverages = (data) => {
  //   Promise.all(data.map((product) => axios.get(`/reviews/meta/?product_id=${product.id}`)))
  //     .then((resData) => {
  //       const totalProductAverages = {};
  //       for (let i = 0; i < data.length; i += 1) {
  //         const productsReviewData = resData[i].data;
  //         let sum = 0;
  //         let count = 0;
  //         Object.keys(productsReviewData.ratings).forEach((rating) => {
  //           sum += rating * productsReviewData.ratings[rating];
  //           count += Number(productsReviewData.ratings[rating]);
  //         });
  //         totalProductAverages[productsReviewData.product_id] = Number((sum / count).toFixed(1));
  //       }
  //       setProductAvgs(totalProductAverages);
  //     });
  // };

  const setDefaultStyle = (stylesArr) => {
    for (const style of stylesArr) {
      if (style['default?']) {
        setStyle(style);
      }
    }
  };

  useEffect(() => {
    axios({
      method: 'GET',
      url: '/products',
    })
      .then((res) => {
        setCurrentProduct(res.data[0]);
        setProducts(res.data);
        // calcReviewsAverages(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    axios.get('/products/44397')
      .then((res) => {
        setTheStone(res.data);
      });
  }, []);

  useEffect(() => {
    if (currentProduct) {
      // axios({
      //   method: 'GET',
      //   url: `/reviews/meta/?product_id=${currentProduct.id}`,
      // })
      //   .then((res) => {
      //     setCurrentReview(res.data);
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
      axios.get(`/products/${currentProduct.id}/related`)
        .then((res) => {
          setRelatedID(res.data);
        });
      axios.get(`/products/${currentProduct.id}`)
        .then((res) => {
          setCurrentFeature(res.data);
        });
    }
    // if (productAvgs) {
    //   setAverage(productAvgs[currentProduct.id]);
    // }
  }, [currentProduct]);

  // useEffect(() => {
  //   if (currentProduct && productAvgs) {
  //     setAverage(productAvgs[currentProduct.id]);
  //   }
  // }, [productAvgs]);

  useEffect(() => {
    if (relatedIds.length > 1) {
      for (let i = 0; i < relatedIds.length - 1; i += 1) {
        let j = i + 1;
        if (relatedIds[i] === relatedIds[j]) {
          relatedIds.splice(i, 1);
        }
        j += 1;
      }
      Promise.all(relatedIds.map((id) => axios.get(`/products/${id}`)))
        .then((values) => {
          const array = [];
          for (let i = 0; i < values.length; i += 1) {
            array.push(values[i].data);
          }
          setRelatedProducts(array);
        });
      Promise.all(relatedIds.map((id) => axios.get(`/products/${id}/styles`)))
        .then((values) => {
          const arr = [];
          for (let i = 0; i < values.length; i += 1) {
            arr.push(values[i].data);
          }
          setRelatedStyles(arr);
        });
    }
  }, [relatedIds]);

  // useEffect(() => {
  //   const reviews = Number(currentReview?.recommended?.true) + Number(currentReview?.recommended?.false);
  //   setTotalReviews(reviews);
  // }, [currentReview]);

  useEffect(() => {
    if (currentProduct?.id) {
      axios
        .get(`/products/${currentProduct.id}/styles`)
        .then((response) => {
          setStyles(response.data.results);
          setDefaultStyle(response.data.results);
        })
        .catch((err) => { console.error(err); });
    }
  }, [currentProduct]);

  if (!currentProduct) {
    return <div id="loadingScreen">Da Island Is LoADing Mon</div>;
  }
  return (
    <AppContext.Provider value={{
      currentProduct,
      // currentReview,
      // average,
      relatedProducts,
      relatedStyles,
      // totalReviews,
      products,
      setCurrentProduct,
      // productAvgs,
      styles,
      currentStyle,
      setStyle,
      currentFeature,
      stone,
    }}
    >
      <div>
        <MetaData>
          <Header key={1} />
          <Overview key={2} />
          {/* <Related key={3} /> */}
          {/* <Reviews key={4} /> */}
        </MetaData>
      </div>
    </AppContext.Provider>
  );
};

export default App;
