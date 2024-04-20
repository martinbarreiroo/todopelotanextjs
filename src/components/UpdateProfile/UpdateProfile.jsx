import React from 'react';
import withAuth from "@/components/withAuth/withAuth";
import { useState } from 'react';

function UpdateProfile() {

  const positions = [
    {
        id: "Selct",
        name: "Select a position"

    }, 
    {
        id: "PO",
        name: "PO"
    },
    {
        id: "DFC",
        name: "DFC"
    },
    {
        id: "DFI",
        name: "DFI"
    },
    {
        id: "DFD",
        name: "DFD"
    },
    {
        id: "MC",
        name: "MC"
    },
    {
        id: "MCO",
        name: "MCO"
    },
    {
        id: "MCD",
        name: "MCD"
    },
    {
        id: "EI",
        name: "EI"
    },
    {
        id: "ED",
        name: "ED"
    },
    {
        id: "DC",
        name: "DC"
    }
]

  let actualUsername = '';
  if (typeof window !== 'undefined') {
      actualUsername = localStorage.getItem('username');
  }
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState(actualUsername);
  const [position, setPosition] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const response = await fetch('http://localhost:8080/profile/update', {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ userId, username, password, position, description}),
    });

    if (!response.ok) {
        // Handle error
        console.error('Failed to update profile');
    } else {
        // Handle success
        
        console.log('Profile updated successfully');
        window.location.href = '/';
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('userId');

    }
};
    return (
        <div className="relative flex flex-col items-center justify-center h-screen space-y-4">
            <div className="absolute top-0 left-0 w-full h-[12.5%]"
              style={{ backgroundColor: "#729560" }}
      ></div>
            <img src='/assets/logo.png' alt="Logo" className="w-24 h-24 absolute top-1/8 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
            <form onSubmit={handleSubmit} className="space-y-10">
                <div className="w-80 h-18 flex items-center justify-center mx-auto mt-32 mb-50 p-6 relative rounded" style={{backgroundColor: '#d1d1d1'}}>
                    <input type="text" value = {username} onChange={e => setUsername(e.target.value)} className="w-full h-full bg-transparent outline-none"/>
                </div>
                <div className="w-80 h-18 flex items-center justify-center mx-auto mt-32 mb-50 p-6 relative rounded" style={{backgroundColor: '#d1d1d1'}}>
                    <input type="text" placeholder='Change yor Password' value = {password} onChange={e => setPassword(e.target.value)} className="w-full h-full bg-transparent outline-none"/>
                </div>
                <div className="w-80 h-18 flex items-center justify-center mx-auto mt-32 mb-50 p-6 relative rounded" style={{backgroundColor: '#d1d1d1'}}>
                      <select className="w-full h-90% bg-transparent outline-none" value = {position} onChange={e => setPosition(e.target.value)}> 
                        {positions.map(position => (
                            <option key={position.id} value={position.id}>
                                {position.name}
                            </option>
                        ))}
                      </select> 
                </div>
                <div className="w-80 h-18 flex items-center justify-center mx-auto mt-32 mb-50 p-6 relative rounded" style={{backgroundColor: '#d1d1d1'}}>
                    <input type="text" placeholder='Brief description' value = {description} onChange={e => setDescription(e.target.value)} className="w-full h-90% bg-transparent outline-none"/>
                </div>
                <button className="flex mx-auto text-white font-bold py-2 px-4 rounded"
                    style={{backgroundColor: '#729560'}}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#abcd99'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#729560'}
                >
                   Update Profile
                </button>
            </form>
            <button className="absolute top-4 right-4 font-bold py-4 px-4 rounded"
              onClick={() => {
                window.location.href = '/Hub/Profile';
              }}
              style={{backgroundColor: '#729560'}}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#abcd99'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#729560'}
            > 
              <img src='/assets/back-arrow.png' alt="Return to Profile" className="w-10 h-8 object-cover" />
            </button>
        </div>
    );
}

export default withAuth(UpdateProfile);