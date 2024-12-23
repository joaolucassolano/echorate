// src/components/TopMenu/TopMenu.jsx
import React from 'react';
import './TopMenu.css';

const BASE_URL = 'http://localhost:8000/api';

const handleLogout = async () => {
    try {
        await fetch(`${BASE_URL}/logout`, {
            credentials: 'include',
        });
        window.location.href = '/';
    } catch (error) {
        console.error('Erro ao deslogar:', error);
    }
};

const TopMenu = ({ profile }) => {
    return (
        <div className="top-menu">
            <div className="menu-buttons">
                <button onClick={() => { window.location.href = 'http://localhost:3000/home'; }}>
                    Home
                </button>
                <button onClick={() => { window.location.href = 'http://localhost:3000/listen'; }}>
                    Músicas Ouvidas
                </button>
                <button onClick={() => { window.location.href = 'http://localhost:3000/likes'; }}>
                    Músicas Curtidas
                </button>
                <button onClick={() => { window.location.href = 'http://localhost:3000/reviews'; }}>
                    Músicas Avaliadas
                </button>
            </div>
            {profile && profile.images && profile.images[0] && (
                <div className="profile-section">
                    <p className="profile-name">{profile.display_name}</p>

                    <img
                        src={profile.images[0].url}
                        alt="Avatar"
                        className="profile-image"
                    />
                    <div className="menu-buttons">
                        <button onClick={() => {handleLogout()}}>
                            Sair
                        </button>
                    </div>

                </div>
            )}
        </div>
    );
};

export default TopMenu;
