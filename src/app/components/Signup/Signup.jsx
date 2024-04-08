import React, { useState } from 'react';
import './Signup.css';
import Link from 'next/link';
import { useRouter } from 'next/router';

export const Signup = () => {

    const [action, setAction] = useState('Sign up')
    const [email, setEmail] = useState('')
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState('')  
    const [username, setUsername] = useState('')
    const [description, setDescription] = useState('')
    const [position, setPosition] = useState('')
    const router = useRouter();

    return (
        <div className=''>
            <div className="logo-signup">
                <img src='/assets/logo.png' alt="" /> 
            </div>
            <div className='container'>
                <div className="header"></div>
                <div>
                    <div className="text">{action}</div>
                    <div className="underline"></div>
                </div>
            
                <div className="inputs">
                    
                    <div className="input">
                        <img src='/assets/person.png' alt="" />
                        <input type="text" placeholder='Username'onChange={e => setUsername(e.target.value)}/>
                    </div>

                    <div className="input">
                      <img src='/assets/email.png' alt="" />
                      <input type="email" placeholder='E-mail' onChange={e => setEmail(e.target.value)}/>
                    </div>

                    <div className="input">
                        <img src='/assets/password.png' alt="" />
                        <input 
                            type={showPassword ? 'text' : 'password'} 
                            placeholder='Password' 
                            onChange={e => setPassword(e.target.value)}
                        />
                        <img 
                            src='/assets/show_password.png' 
                            alt="Toggle password visibility" 
                            onClick={() => setShowPassword(!showPassword)}
                        />
                    </div>

                    <div className="input">
                      <img src='/assets/description.png' alt="" />
                      <input type="description" placeholder='Description' onChange={e => setDescription(e.target.value)}/>        
                    </div>

                    <div className="input">
                      <img src='/assets/position.png' alt="" />
                      <input type="position" placeholder='Position' onChange={e => setPosition(e.target.value)}/>        
                    </div>
                </div>

                <div className="footer-signup">Already have an account?
                    <Link href='/' className='click-here-signup'>
                        <span> Click Here!</span>
                    </Link>
                </div>
                
                <div className='submit'
                        onClick={async ()=>{
                            setAction('Sign Up');
                            const user ={username, email, password, description, position}
                            try {
                                const response = await fetch('http://localhost:8080/Signup', {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify(user), 
                                });

                                if (!response.ok) {
                                    throw new Error(`HTTP error! status: ${response.status}`);
                                }

                                else if (response.ok) {
                                    const { token } = await response.json(); // extract the token from the response
                                    localStorage.setItem('token', token); // store the token in local storage
                                    localStorage.setItem('username', username); // store the username in local storage
                                    router.push('/Hub'); // navigate to /hub route if sign up is successful
                                }
                            } catch (error) {
                                console.error('There was a problem with the fetch operation: ', error);
                            }
                        }}
                >
                    Sign Up
                </div>
            </div>
        </div>
    )
}
