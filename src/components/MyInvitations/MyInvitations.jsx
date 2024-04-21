import React, { useEffect, useState } from 'react';
import withAuth from "@/components/withAuth/withAuth";

function MyInvitations() {
    const [invitations, setInvitations] = useState([]);

    useEffect(() => { 
        const fetchInvitations = async () => {
            const token = localStorage.getItem('token');
            const userId = localStorage.getItem('userId');
            const response = await fetch(`http://localhost:8080/invitations/get-invitations/${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setInvitations(data);
              } else {
                console.error('Failed to fetch invitations');
              }
        };

        fetchInvitations();
    }, []);

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
            <div className="relative flex flex-col items-center justify-center h-screen ">
                {/* ... existing elements ... */}
                <div style={{ maxHeight: '400px', width: '550px', overflowY: 'auto', backgroundColor: '#729560', borderRadius: '10px', marginTop: "20px"}}>
                    {invitations.length === 0 ? 
                        <div className="p-10">
                            <h2 className="text-3xl font-serif font-extrabold antialiased text-center animate-fadeIn">No invitations found</h2>
                        </div> :
                        invitations.map((invitation, index) => (
                            <div key={invitation.id || index}
                                className="p-7 border-b border-gray-200 transform transition duration-500 ease-in-out hover:scale-105 hover:bg-custom-green cursor-pointer animate-fadeIn"
                            >
                                <h2 className="text-xl font-bold items-center justify-center text-center">{invitation.senderName.username} has invited you to '{invitation.tournament.name}'</h2>
                                
                                <div className="flex justify-around mt-4">
                                    <button 
                                        className="bg-custom-green3 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                                        onClick={async () => {
                                            const response = await fetch(`http://localhost:8080/invitations/accept-invitation/${invitation.id}`, { 
                                                method: 'POST', 
                                                headers: {
                                                    'Content-Type': 'application/json',
                                                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                                                },
                                            
                                            });
                                            if (response.ok) {
                                                window.location.reload(); // Reload the page if the request was successful
                                            } else {
                                                console.error('Failed to accept invitation');
                                            }
                                        }}
                                    >
                                        Accept
                                    </button>
                                    <button 
                                        className="bg-rejection-red hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                        onClick={async () => {
                                            const response = await fetch(`http://localhost:8080/invitations/reject-invitation/${invitation.id}`, {
                                                method: 'POST',
                                                headers: {
                                                    'Content-Type': 'application/json',
                                                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                                                },
                                            });
                                            if (response.ok) {
                                                window.location.reload(); // Reload the page if the request was successful
                                            } else {
                                                console.error('Failed to accept invitation');
                                            }
                                        }}
                                    >
                                        Reject
                                    </button>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

export default withAuth(MyInvitations);