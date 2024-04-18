import React, { useState } from 'react';
import styles from './Signup.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';

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
        name: "ED"
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
            <div className={styles.logo_signup}>
                <img src='/assets/logo.png' alt="" /> 
            </div>
            <div className={styles.container}>
                <div className={styles.header}></div>
                <div>
                    <div className={styles.text}>{action}</div>
                    <div className={styles.underline}></div>
                </div>
            
                <div className={styles.inputs}>
                    
                    <div className={styles.input}>
                        <img src='/assets/person.png' alt="" />
                        <input type="text" placeholder='Username'onChange={e => setUsername(e.target.value)}/>
                    </div>

                    <div className={styles.input}>
                      <img src='/assets/email.png' alt="" />
                      <input type="email" placeholder='E-mail' onChange={e => setEmail(e.target.value)}/>
                    </div>

                    <div className={styles.input}>
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

                    <div className={styles.input}>
                      <img src='/assets/description.png' alt="" />
                      <input type="description" placeholder='Description' onChange={e => setDescription(e.target.value)}/>        
                    </div>

                    <div className={styles.input}>
                      <img src='/assets/position.png' alt="" />
                      <select className="w-97% h-full bg-transparent outline-none"  onChange={e => setPosition(e.target.value)}> 
                        {positions.map(position => (
                            <option key={position.id} value={position.id}>
                                {position.name}
                            </option>
                        ))}
                      </select>        
                    </div>
                </div>

                <div className={styles.footer_signup}>Already have an account?
                    <Link href='/' className={styles.click_here_signup}>
                        <span> Click Here!</span>
                    </Link>
                </div>
                
                <div className={styles.submit}
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
