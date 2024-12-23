import React from 'react';
import './TrackItemReview.css';
import Rating from '../Rating/Rating';
import TrackInfo from '../TrackInfo/TrackInfo';


const TrackItemReview = ({ review, handleReview }) => {
    return (
        <div className="track-item">
            <div className="track-info">
                <TrackInfo track={review.track}/>
            </div>
            <Rating
                track={review.track}
                handleRate={handleReview}
                review={review.rate}
            />
        </div>
    );
};

export default TrackItemReview;
