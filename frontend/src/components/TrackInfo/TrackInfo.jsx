import React from 'react';
import './TrackInfo.css';

const PlayIcon = ({ filled, onClick }) => (
    <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill={filled ? '#1db954' : 'none'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="icon play-icon"
        onClick={onClick}
    >
        <polygon points="5 3 19 12 5 21 5 3"></polygon>
    </svg>
);

const TrackInfo = ({ track }) => {
    return (
        <div>
            <span>
                {track.track_name} - {track.artist_name}
                <PlayIcon
                    filled={true}
                    onClick={() => window.open(track.spotify_link, '_blank')}
                />
            </span>
        </div>
    );
};

export default TrackInfo;
