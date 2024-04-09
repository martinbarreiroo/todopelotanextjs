import React from 'react';
import { useState, useEffect } from 'react';
import './Hub.css';
import withAuth from '../withAuth/withAuth';
import Link from 'next/link';

export const Hub = () => {
    const [username, setUsername] = useState('');

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedUsername = localStorage.getItem('username');
            if (storedUsername) {
                setUsername(storedUsername);
            }
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
    }
    return (
        <div className="hub-container">
            <img src='/assets/logo.png' alt="Logo" className="logo-hub" />

            <Link href="/">
                <div className="logout-container">
                    <button className="logout-button" onClick={handleLogout}>Log Out</button>
                </div>
            </Link>

            <span className="username-display">Logged in as <span className="username">'{username}'</span></span>

            <div className="home-menu">
                <button className="home-button">Mis Torneos
                    <img src='/assets/trofeo.png' alt="trofeo" className="trofeo" />
                </button>
                    
                <button className="home-button">Mis Estadísticas
                    <img src='/assets/estadistica.png' alt="estadistica" className="estadistica" />
                </button>
                
                    <button className="home-button"
                        onClick={() => {
                            window.location.href = '/Hub/CrearTorneo';
                        }}
                    >Crear Torneo
                        <img src='/assets/plus.png' alt="trofeo" className="estadistica" />
                    </button>
                
                    <button className="home-button">Perfil
                        <img src='/assets/person.png' alt="name" className="name" />
                    </button>
                        
                </div>
        </div>
    );
}

export default withAuth(Hub);