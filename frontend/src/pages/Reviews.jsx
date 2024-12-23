// src/pages/Reviews.jsx
import React, { useEffect, useState } from 'react';
import { useProfile } from '../context/ProfileContext';
import TrackItemReview from '../components/TrackItemReview/TrackItemReview';
import TopMenu from '../components/TopMenu/TopMenu';

const BASE_URL = 'http://localhost:8000/api';

const Reviews = () => {
    const { profile } = useProfile();
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        if (profile && !reviews.length) {
            fetchReviews();
        }
    }, [profile, reviews]);

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

    const handleReview = async (track, rate) => {
        try {
            const response = await fetch(`${BASE_URL}/review`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({
                    uri: track.track_id,
                    userId: profile.id,
                    rate: rate,
                }),
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error('Erro ao avaliar a música.');
            }

            const data = await response.json();
            console.log('Resposta do servidor:', data);

            const updatedReviews = reviews.map((review) => {
                if (review.track.track_id === data.body.review.trackId) {
                    review.rate = data.body.review.rate;
                }
                return review;
            })


            setReviews(updatedReviews);
        } catch (error) {
            console.error('Erro ao avaliar a música:', error);
        }
    };

    return (

        <div style={{ padding: '20px' }}>
            {profile ? (
                <div>
                    <TopMenu profile={profile} />

                    {reviews.map((review) => (
                        <TrackItemReview
                            key={review.track.track_id}
                            review={review}
                            handleReview={handleReview}
                        />
                    ))}
                </div>
            ) : (
                <p>Carregando perfil...</p>
            )}
        </div>
    );
};

export default Reviews;
