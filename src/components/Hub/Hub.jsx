import React from 'react';
import { useState, useEffect } from 'react';
import styles from './Hub.module.css';
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
        <div className={styles.hub_container}>
            <img src='/assets/logo.png' alt="Logo" className={styles.logo_hub} />

            <Link href="/">
                <div className={styles.logout_container}>
                    <button className={styles.logout_button} onClick={handleLogout}>Log Out</button>
                </div>
            </Link>

            <span className={styles.username_display}>Logged in as <span className={styles.username}>'{username}'</span></span>

            <div className={styles.home_menu}>
                <button className={styles.home_button}>Mis Torneos
                    <img src='/assets/trofeo.png' alt="trofeo"/>
                </button>
                    
                <button className={styles.home_button}>Mis Estadísticas
                    <img src='/assets/estadistica.png' alt="estadistica"/>
                </button>
                
                    <button className={styles.home_button}
                        onClick={() => {
                            window.location.href = '/Hub/CrearTorneo';
                        }}
                    >Crear Torneo
                        <img src='/assets/plus.png' alt="trofeo"/>
                    </button>
                
                    <button className={styles.home_button}>Perfil
                        <img src='/assets/person.png' alt="name"/>
                    </button>
                        
                </div>
        </div>
    );
}

export default withAuth(Hub);