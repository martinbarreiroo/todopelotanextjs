import React, { useState } from 'react';
import withAuth from "@/components/withAuth/withAuth";
import { useRouter } from 'next/router';

async function createMatch(date, location, description, router) {
    try {
        const token = localStorage.getItem('token');
        const tournamentId = localStorage.getItem('tournamentId');
        const response = await fetch('http://localhost:8080/matches/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ date, location, description, tournamentId}), 
        });

        if (response.ok) {
            router.push('/Hub/MisTorneos/Torneo');
        }
    } catch (error) {
        console.error(error);
    }
}

function CreateMatch() {
    const [date, setDate] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const router = useRouter();

    const validateDate = (date) => {
        // Add your date validation logic here
        // For example, check if the date is not empty
        return date !== '';
      };
    
      const validateLocation = (location) => {
        // Add your location validation logic here
        // For example, check if the location is not empty
        return location !== '';
      };
    
      const validateDescription = (description) => {
        // Add your description validation logic here
        // For example, check if the description is not empty
        return description !== '';
      };
    
      const handleCreateMatch = () => {
        if (!validateDate(date) || !validateLocation(location) || !validateDescription(description)) {
          alert('Please fill in all fields correctly');
          return;
        }
        else {createMatch(date, location, description, router)}
    
        
      };

    return (
        <div className="relative flex flex-col items-center justify-center h-screen">
            <div className="absolute top-0 left-0 w-full h-[12.5%]"
                    style={{ backgroundColor: "#729560" }}
            ></div>
            <img src='/assets/logo.png' alt="Logo" className="w-24 h-24 absolute top-1/8 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mb-5" />
            <button className="absolute top-4 right-4 font-bold py-3 px-3 rounded"
                onClick={() => {
                window.location.href = '/Hub/MisTorneos/Torneo';
                }}
                style={{backgroundColor: '#729560'}}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#abcd99'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#729560'}
            > 
                <img src='/assets/back-arrow.png' alt="Return to Hub" className="w-8 h-8 object-cover" />
            </button>
            <div className="w-80 h-18 flex items-center justify-center mx-auto mt-5 mb-5 p-6 relative rounded transition-colors duration-500 ease-in-out bg-input-gray hover:bg-custom-gray transform hover:scale-105">
                <input type="date" onChange={e => setDate(e.target.value)} className="w-full h-full bg-transparent outline-none"/>
            </div>
            <div className="w-80 h-18 flex items-center justify-center mx-auto mt-5 mb-5 p-6 relative rounded transition-colors duration-500 ease-in-out bg-input-gray hover:bg-custom-gray transform hover:scale-105">
                <input type="text" placeholder='Location' onChange={e => setLocation(e.target.value)} className="w-full h-full bg-transparent outline-none"/>
            </div>
            <div className="w-80 h-18 flex items-center justify-center mx-auto mt-5 mb-5 p-6 relative rounded transition-colors duration-500 ease-in-out bg-input-gray hover:bg-custom-gray transform hover:scale-105">
                <input type="text" placeholder='Description' onChange={e => setDescription(e.target.value)} className="w-full h-full bg-transparent outline-none"/>
            </div>
            
            <button className="text-white font-bold py-2 px-4 rounded mt-5 mb-5"
                onClick={() => 
                    {
                        handleCreateMatch();
                        
                    }
                }
                style={{backgroundColor: '#729560'}}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#abcd99'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#729560'}
            > 
                Create Match
            </button>
            {/* ... rest of your code ... */}
        </div>
    );
}

export default withAuth(CreateMatch);