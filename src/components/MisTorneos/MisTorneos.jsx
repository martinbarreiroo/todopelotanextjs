
import React, { useEffect, useState } from 'react';
import withAuth from "@/components/withAuth/withAuth";



function MisTorneos() {
  const [tournaments, setTournaments] = useState([]);

  useEffect(() => {
      const fetchTournaments = async () => {
          const token = localStorage.getItem('token');
          const userId = localStorage.getItem('userId');
          const response = await fetch(`http://localhost:8080/user_tournaments/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
      });

        if (response.ok) {
          const text = await response.text();
          console.log(text);
          const data = JSON.parse(text);
          const sortedData = data.sort((a, b) => a.name.localeCompare(b.name));
          setTournaments(sortedData);
      } else {
          console.error('Failed to fetch tournaments');
      }
        };

      fetchTournaments();
  }, []);

    return (
        <div className="relative flex flex-col items-center justify-center h-screen space-y-4">
            <div className="absolute top-0 left-0 w-full h-[12.5%]"
                style={{ backgroundColor: "#729560" }}
            ></div>
            <img src='/assets/logo.png' alt="Logo" className="w-24 h-24 absolute top-1/8 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
            <button className="absolute top-4 right-4 font-bold py-3 px-3 rounded"
              onClick={() => {
                window.location.href = '/Hub';
              }}
              style={{backgroundColor: '#729560'}}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#abcd99'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#729560'}
            > 
              <img src='/assets/hub.png' alt="Return to Hub" className="w-8 h-8 object-cover" />
            </button>

            <div style={{ maxHeight: '550px', width: '550px', overflowY: 'auto', backgroundColor: '#729560', borderRadius: '10px', marginTop: "100px"}}>
                { tournaments.length === 0 ? 
                    <div className="p-10">
                        <h2 className="text-3xl font-serif font-extrabold antialiased text-center animate-fadeIn">You are not participating in any tournaments, YET</h2>
                    </div> :
                    tournaments.filter(tournament => typeof tournament === 'object' && tournament !== null).map((tournament, index) => (
                        <div key={tournament.id || index}
                        className="p-7 border-b border-gray-200 transform transition duration-500 ease-in-out hover:scale-105 hover:bg-custom-green cursor-pointer animate-fadeIn">
                            <h2 className="text-xl font-bold">{tournament.name}</h2>
                            <p>{tournament.description}</p>
                            <div className="flex justify-end">
                                <p>{tournament.type}</p>
                            </div>
                      </div>
                    ))
                }
            </div>
        </div>
    );
}

export default withAuth(MisTorneos);