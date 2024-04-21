import React, { useEffect, useState } from 'react';
import withAuth from "@/components/withAuth/withAuth";

function Profile() {

    const [user, setUser] = useState({  username: '', email: '', description: '', position: '' });
    
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
        const user = await response.json();
        setUser(user);
        } else {
          console.error('Failed to fetch user');
        }
    };
    
    fetchUser();
}, []); 

    return (
      <div className="relative flex flex-col items-center justify-center h-screen space-y-4">
        <div className="absolute top-0 left-0 w-full h-[12.5%]"
                style={{ backgroundColor: "#729560" }}
        ></div>
        <img src='/assets/logo.png' alt="Logo" className="w-24 h-24 flex justify-center mt-12 mb-32 absolute top-[10.5%] left-[50%] transform -translate-x-1/2 -translate-y-1/2" />
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
        <div className="w-full max-w-md p-4 bg-custom-green rounded shadow-md animate-fadeIn">
          User:<h1 className="text-2xl font-bold mb-2">{user.username}</h1>
          Email:<p className="text-gray-700 mb-2">{user.email}</p>
          Position:<p className="text-gray-700 mb-2">{user.position}</p>
          Description:<p className="text-gray-700 mb-2">{user.description}</p>
        </div>
        <button className="font-bold py-3 px-3 rounded animate-fadeIn"
          onClick={() => {
            window.location.href = '/Hub/Profile/UpdateProfile';
          }}
          style={{backgroundColor: '#729560'}}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#abcd99'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#729560'}
        >
          Update your Profile
        </button>
      </div>
    );
}

export default withAuth(Profile);