/* eslint-disable react/no-array-index-key */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, {
  useEffect, useContext, useState, useRef,
} from 'react';

import axios from 'axios';

import NewReview from './NewReview.jsx';

import Review from './Review.jsx';
import ReviewForm from './ReviewForm.jsx';
import RatingSummary from './RatingSummary.jsx';
import RecommendedBy from './RecommendedBy.jsx';
import RatingBreakdown from './RatingBreakdown.jsx';
import ProductBreakdown from './ProductBreakdown.jsx';
import Stars from './Stars.jsx';

import AppContext from '../../context.js';
import ReviewsContext from './reviewsContext.js';

const Reviews = () => {
  const reviewForm = useRef(null);

  const { currentProduct, average, currentReview } = useContext(AppContext);

  const [reviews, setReviews] = useState([]);

  const getReviewsForCurrent = () => {
    const productID = context.currentProduct?.id;
    axios({
      method: 'GET',
      url: `/reviews/?product_id=${productID}`,
    })
      .then((res) => {
        setReviews(res.data.results);
      });
  };

  useEffect(() => {
    if (context.currentProduct?.length < 1) { return; }
    getReviewsForCurrent();
  }, [context]);

  return (
    <>
      <ReviewsContext.Provider value={{
        currentReview, currentProduct, reviews, average,
      }}
      >
        <div id="widget">
          <h4>Ratings &amp; Reviews</h4>
          <div id="ratingsAndReviewsContainer">
            <div id="ratings">
              <RatingSummary average={average} />
              <RecommendedBy recommended={currentReview.recommended} />
              <RatingBreakdown ratings={currentReview.ratings} />
              <ProductBreakdown characteristics={currentReview.characteristics} />
            </div>
            <div id="reviews">
              <div id="sortBar">
                <h5>
                  Reviews sorted by:
                  {' '}
                  <select name="reviewSort" id="reviewSort">
                    <option>Helpful</option>
                    <option>Newest</option>
                    <option>Relevant</option>
                  </select>
                </h5>
              </div>
              <div id="reviewList">
                {reviews.map((review) => <Review data={review} average={review.rating} />)}
              </div>
              <div id="addReview">
                <button
                  type="button"
                  className="addReview"
                  onClick={(e) => {
                    e.preventDefault();
                    reviewForm.current.open();
                  }}
                >
                  Add a Review

                </button>
              </div>
            </div>
          </div>
        </div>
      </ReviewsContext.Provider>
      <NewReview ref={reviewForm}>
        <ReviewForm />
      </NewReview>
    </>
  );
};

export default Reviews;
