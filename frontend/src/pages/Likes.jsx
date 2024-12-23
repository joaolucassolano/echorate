// src/pages/Likes.jsx
import React, { useEffect, useState } from 'react';
import { useProfile } from '../context/ProfileContext';
import TrackItem from '../components/TrackItem/TrackItem';
import TopMenu from '../components/TopMenu/TopMenu';

const BASE_URL = 'http://localhost:8000/api';

const Likes = () => {
    const { profile } = useProfile();
    const [likes, setLikes] = useState([]);

    useEffect(() => {
        if (profile && !likes.length) {
            fetchLikes();
        }
    }, [profile, likes]);

    const fetchLikes = async () => {
        try {
            const response = await fetch(`${BASE_URL}/like/user/${profile.id}`, {
                credentials: 'include',
            });
            const data = await response.json();

            setLikes(data);
        } catch (error) {
            console.error('Erro ao buscar likes:', error);
        }
    };
    
    return (
        <div style={{ padding: '20px' }}>
            {profile ? (
                <div>
                    <TopMenu profile={profile} />
                    {likes.map((track) => (
                        
                        <TrackItem
                            key={track.track_id}
                            track={track}
                        />
                    ))}
                </div>
            ) : (
                <p>Carregando perfil...</p>
            )}
        </div>
    );
};

export default Likes;
