import React from 'react';
import { useState } from 'react';
import withAuth from "@/components/withAuth/withAuth";
import { useRouter } from 'next/router';

async function create(name, players, type, description, router) {
    
    try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:8080/tournaments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ name, players, type, description }), 
        });

        if (response.ok) {
            router.push('/Hub');
        }
    } catch (error) {
        console.error(error);
    }
}

function CrearTorneo() {
    const [name, setName] = useState('');
    const [players, setPlayers] = useState('');
    const [type, setType] = useState('');
    const [description, setDescription] = useState('');
    const router = useRouter();

    return (
        <div className="relative flex flex-col items-center justify-center h-screen space-y-4">
            <img src='/assets/logo.png' alt="Logo" className="w-24 h-24 absolute top-1/8 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
            <button className="absolute top-4 right-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => {
                window.location.href = '/Hub';
              }}
            >
              Return to Hub
            </button>
            <div className="w-full flex flex-col items-center justify-between space-y-10 mt-24">
                <div className="w-80 h-16 flex items-center justify-center mx-auto mt-32 mb-50 p-6 relative rounded" style={{backgroundColor: '#d1d1d1'}}>
                    <input type="text" placeholder='Name' onChange={e => setName(e.target.value)} className="w-full h-full bg-transparent outline-none"/>
                </div>
                <div className="w-80 h-16 flex items-center justify-center mx-auto mt-32 mb-50 p-6 relative rounded" style={{backgroundColor: '#d1d1d1'}}>
                    <input type="text" placeholder='Number of Players' onChange={e => setPlayers(e.target.value)} className="w-full h-full bg-transparent outline-none"/>
                </div>
                <div className="w-80 h-16 flex items-center justify-center mx-auto mt-32 mb-50 p-6 relative rounded" style={{backgroundColor: '#d1d1d1'}}>
                    <input type="text" placeholder='Type' onChange={e => setType(e.target.value)} className="w-full h-full bg-transparent outline-none"/>
                </div>
                <div className="w-80 h-16 flex items-center justify-center mx-auto mt-32 mb-50 p-6 relative rounded" style={{backgroundColor: '#d1d1d1'}}>
                    <input type="text" placeholder='Brief description' onChange={e => setDescription(e.target.value)} className="w-full h-full bg-transparent outline-none"/>
                </div>
                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => create(name, players, type, description, router)}
                > 
                    Create
                </button>
            </div>
        </div>
    );
}

export default withAuth(CrearTorneo);