import React, { useState, useEffect } from 'react';
import Rating from '../components/Rating/Rating';
import { useProfile } from '../context/ProfileContext';
import SearchBar from '../components/SearchBar/SearchBar';
import TrackItemAction from '../components/TrackItemAction/TrackItemAction';
import TopMenu from '../components/TopMenu/TopMenu';

const BASE_URL = 'http://localhost:8000/api';

const Home = () => {
    const { profile } = useProfile();
    const [searchResults, setSearchResults] = useState([]);
    const [query, setQuery] = useState('');
    const [likes, setLikes] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [listen, setListen] = useState([]);

    useEffect(() => {
        if (profile) {
            fetchLikes();
            fetchReviews();
            fetchListen();
        }
    }, [profile]);

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

    const fetchReviews = async () => {
        try {
            const response = await fetch(`${BASE_URL}/review/user/${profile.id}`, {
                credentials: 'include',
            });
            const data = await response.json();
            setReviews(data);
        } catch (error) {
            console.error('Erro ao buscar reviews:', error);
        }
    };

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

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${BASE_URL}/search?q=${query}`, {
                credentials: 'include',
            });
            if (response.status === 401) {
                window.location.href = '/';
            }

            const data = await response.json();
            setSearchResults(data.tracks.items);
        } catch (error) {
            console.error('Erro ao buscar:', error);
        }
    };

    const handleLike = async (track) => {
        try {
            const response = await fetch(`${BASE_URL}/like`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({
                    uri: track.uri,
                    userId: profile.id,
                }),
                credentials: 'include',
            });

            if (!response.status) {
                throw new Error('Erro ao curtir a música.');
            }

            fetchLikes();
        } catch (error) {
            console.error('Erro ao curtir a música:', error);
        }
    };

    const handleListen = async (track) => {
        try {
            const response = await fetch(`${BASE_URL}/listen`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({
                    uri: track.uri,
                    userId: profile.id,
                })
            });

            if (!response.ok) {
                throw new Error('Erro ao marcar a música como ouvida.');
            }

            const data = await response.json();
            console.log('Resposta do servidor:', data);

            fetchListen();
        } catch (error) {
            console.error('Erro ao marcar a música como ouvida:', error);
        }
    };

    const handleReview = async (track, rate) => {
        try {
            const response = await fetch(`${BASE_URL}/review`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({
                    uri: track.uri,
                    userId: profile.id,
                    rate: rate,
                })
            });

            if (!response.ok) {
                throw new Error('Erro ao avaliar a música.');
            }

            const data = await response.json();
            console.log('Resposta do servidor:', data);

            fetchReviews();
        } catch (error) {
            console.error('Erro ao avaliar a música:', error);
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            {profile ? (
                <div>
                    <TopMenu profile={profile} />

                    <SearchBar handleSearch={handleSearch} query={query} setQuery={setQuery} />

                    {searchResults.map((track) => (
                        <TrackItemAction
                            key={track.id}
                            track={track}
                            handleLike={handleLike}
                            handleListen={handleListen}
                            handleReview={handleReview}
                            likes={likes}
                            listened={listen}
                            reviews={reviews}
                        />
                    ))}
                </div>
            ) : (
                <p>Carregando perfil...</p>
            )}
        </div>
    );
};

export default Home;
