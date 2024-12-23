// src/pages/Listen.jsx
import React, { useEffect, useState } from 'react';
import { useProfile } from '../context/ProfileContext';
import TrackItem from '../components/TrackItem/TrackItem';
import TopMenu from '../components/TopMenu/TopMenu';

const BASE_URL = 'http://localhost:8000/api';

const Listen = () => {
    const { profile } = useProfile();
    const [ listen, setListen ] = useState([]);

    useEffect(() => {
        if (profile && !listen.length) {
            fetchListen();
        }
    }, [profile, listen]);

    const fetchListen = async () => {
        try {
            const response = await fetch(`${BASE_URL}/listen/user/${profile.id}`, {
                credentials: 'include',
            });
            const data = await response.json();
            setListen(data);
        } catch (error) {
            console.error('Erro ao buscar listen:', error);
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            {profile ? (
                <div>
                    <TopMenu profile={profile} />
                    
                    {listen.map((track) => (
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

export default Listen;
