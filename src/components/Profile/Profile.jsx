import React, { useEffect, useState } from 'react';
import withAuth from "@/components/withAuth/withAuth";

function Profile() {

    const [user, setUser] = useState([]);
    
    useEffect(() => {
        const fetchUser = async () => {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        const response = await fetch(`http://localhost:8080/profile/get/${userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
      });
    
      if (response.ok) {
        const data = await response.json();
        setUser(data);
        } else {
          console.error('Failed to fetch user');
        }
    };
    
    fetchUser();
}, []); 

    return (
        <div className="relative flex flex-col items-center justify-center h-screen space-y-4">
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
            <h1>{user.username}</h1>
            <p>{user.position}</p>
            <p>{user.description}</p>
            
        </div>
        
    );
}

export default withAuth(Profile);