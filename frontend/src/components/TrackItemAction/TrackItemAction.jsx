import React from 'react';
import './TrackItemAction.css';
import Rating from '../Rating/Rating';

const HeartIcon = ({ filled }) => (
    <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill={filled ? '#1db954' : 'none'}
        stroke="#1db954"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="icon heart-icon"
    >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
    </svg>
);

const ClockIcon = ({ filled }) => (
    <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill={filled ? '#1db954' : 'none'}
        stroke="#1db954"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="icon clock-icon"
    >
        <circle cx="12" cy="12" r="10"></circle>
        <polyline points="12 6 12 12 16 14"></polyline>
    </svg>
);

const TrackItemAction = ({ track, handleLike, handleListen, handleReview, likes, listened, reviews }) => {
    const isLiked = likes.some(like => like.track_id === track.id);

    const isListened = listened.some(listen => listen.track_id === track.id);

    const review = reviews.find(review => review.track.track_id === track.id);
    const reviewRating = review ? review.rate : null;

    return (
        <div className="track-item">
            <div className="track-info">
                <span>{track.name} - {track.artists[0].name}</span>
            </div>
            <div className="track-actions">
                <span onClick={() => handleLike(track)} className="track-action">
                    <HeartIcon filled={isLiked} />
                </span>

                <span onClick={() => handleListen(track)} className="track-action">
                    <ClockIcon filled={isListened} />
                </span>

                <Rating
                    track={track}
                    handleRate={handleReview}
                    review={reviewRating}
                />
            </div>
        </div>
    );
};

export default TrackItemAction;
