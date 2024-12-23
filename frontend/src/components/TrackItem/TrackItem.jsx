import React from 'react';
import './TrackItem.css';
import TrackInfo from '../TrackInfo/TrackInfo';

const TrackItem = ({ track }) => {
    return (
        <div className="track-item">
            <div className="track-info">
                <TrackInfo track={track}/>
            </div>
        </div>
    );
};

export default TrackItem;
