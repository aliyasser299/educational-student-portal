import React, { useRef } from 'react';
import { reviews } from '../data/mockData';

const Reviews: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'right' ? 300 : -300;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="reviews-section">
      <div className="reviews-header">
        <h3 className="reviews-title">Reviews</h3>
        <button className="add-review-btn" onClick={() => alert('Add review functionality')}>Add review</button>
      </div>

      <div className="reviews-nav">
        <span className="reviews-subject">Biology</span>
        <div className="reviews-nav-arrows">
          <button className="review-arrow-btn" onClick={() => scroll('left')}>‹</button>
          <button className="review-arrow-btn" onClick={() => scroll('right')}>›</button>
        </div>
      </div>

      <div className="reviews-list" ref={scrollRef}>
        {reviews.map((review) => (
          <div key={review.id} className="review-card">
            <div className="review-header">
              <img src={review.userAvatar} alt={review.userName} className="review-avatar" />
              <div className="review-user-info">
                <div className="review-user-name">{review.userName}</div>
                <div className="review-rating">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={`star ${i >= review.rating ? 'empty' : ''}`}>★</span>
                  ))}
                </div>
              </div>
            </div>
            <p className="review-text">{review.text}</p>
            {review.id === 2 && <a href="#" className="load-more-link" onClick={(e) => { e.preventDefault(); alert('Loading more...'); }}>Load more...</a>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
