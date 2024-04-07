import React from 'react';
import './Hub.css';
import withAuth from '../components/withAuth/withAuth';

import Link from 'next/link';

export const Hub = () => {
    return (
        <div className="hub-container">
            <img src='/assets/logo.png' alt="Logo" className="logo-hub" />

            <Link href="/">
                <div className="logout-container">
                    <button className="logout-button">Log Out</button>
                </div>
            </Link>

            <div className="home-menu">
                <button className="home-button">Mis Torneos
                    <img src='/assets/trofeo.png' alt="trofeo" className="trofeo" />
                </button>
                    
                <button className="home-button">Mis Estadísticas
                    <img src='/assets/estadistica.png' alt="estadistica" className="estadistica" />
                </button>
                    
                <button className="home-button">Crear Torneo
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