import React, { useEffect, useState } from 'react';
import withAuth from "@/components/withAuth/withAuth";

function Tournament() {
  const [tournament, setTournament] = useState({  name: '', description: '', maxParticipants: '', type: '' });

  useEffect(() => {
    const fetchTournament = async () => {
      const token = localStorage.getItem('token');
      const tournamentId = localStorage.getItem('tournamentId'); // Get the tournamentId from local storage
      const response = await fetch(`http://localhost:8080/tournaments/get/${tournamentId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setTournament(data);
      } else {
        console.error('Failed to fetch tournament');
      }
    };

    fetchTournament(); // Call the fetchTournament function
  }, []); // Pass an empty array as the second argument to useEffect

  return (
    <div className="relative flex flex-col items-center justify-center h-screen space-y-4">
      <div className="absolute top-0 left-0 w-full h-[12.5%]"
              style={{ backgroundColor: "#729560" }}
      ></div>
      <img src='/assets/logo.png' alt="Logo" className="w-24 h-24 absolute top-1/8 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
      <button className="absolute top-4 right-4 font-bold py-3 px-3 rounded"
        onClick={() => {
          window.location.href = '/Hub/MisTorneos';
        }}
        style={{backgroundColor: '#729560'}}
        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#abcd99'}
        onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#729560'}
      > 
        <img src='/assets/back-arrow.png' alt="Return to Hub" className="w-8 h-8 object-cover" />
      </button>
      <div className="w-full max-w-md p-4 bg-custom-green rounded shadow-md animate-fadeIn">
        Tournament Name:<h1 className="text-2xl font-bold mb-2">{tournament.name}</h1>
        Description:<p className="text-gray-700 mb-2">{tournament.description}</p>
        Max Participants:<p className="text-gray-700 mb-2">{tournament.maxParticipants}</p>
        Type:<p className="text-gray-700 mb-2">{tournament.type}</p>
      </div>
    </div>
  );
}

export default withAuth(Tournament);