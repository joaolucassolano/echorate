import React from 'react';
import './Rating.css';

const StarIcon = ({ filled, onClick }) => (
    <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill={filled ? '#1db954' : 'none'}
        stroke="#1db954"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="icon star-icon"
        onClick={onClick}
    >
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
    </svg>
);

const Rating = ({ track, handleRate, review }) => {
    return (
        <div className="rating">
            {[1, 2, 3, 4, 5].map((rate) => (
                <StarIcon
                    key={`rate-${rate}-${track.uri}`}
                    filled={review && rate <= review}
                    onClick={() => handleRate(track, rate)}
                />
            ))}
        </div>
    );
};

export default Rating;
