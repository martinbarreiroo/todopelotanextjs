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

async function handleSignup(username, email, password, description, position, router) {
    
    try {
        const response = await fetch('http://localhost:8080/Signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, password, description, position, router}), // send the email and password as JSON
        });

        if (response.ok) {
            
            const { token, userId } = await response.json(); // extract the token from the response
            localStorage.setItem('token', token); // store the token in local storage
            localStorage.setItem('username', username); // store the username in local storage
            localStorage.setItem('userId', userId); // store the userId in local storage
            router.push('/Hub'); // navigate to /hub route if login is successful
        }
    } catch (error) {
        console.error(error);
    }
}

export const Signup = () => {

    const [email, setEmail] = useState('')
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState('')  
    const [username, setUsername] = useState('')
    const [description, setDescription] = useState('')
    const [position, setPosition] = useState('')
    const [errors, setErrors] = useState({});
    const router = useRouter();

    const validateForm = () => {
        let formErrors = {};

        // Username validation
        if (!username) {
            formErrors.username = "Username is required";
        }

        // Email validation
        if (!email) {
            formErrors.email = "Email is required";
        }

        // Password validation
        if (!password) {
            formErrors.password = "Password is required";
        }

        // Description validation
        if (!description) {
            formErrors.description = "Description is required";
        }

        // Position validation
        if (!position) {
            formErrors.position = "Position is required";
        }

        setErrors(formErrors);

        // If no errors, return true
        return Object.keys(formErrors).length === 0;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            handleSignup(username, email, password, description, position, router);
        }
    }

    return (
        <div className=''>
            <div className={styles.logo_signup}>
                <img src='/assets/logo.png' alt="" /> 
            </div>
            <div className={styles.container}>
                <div className={styles.header}></div>
                <div>
                    <div className={styles.text}>Sign Up</div>
                    <div className={styles.underline}></div>
                </div>
            
                <form onSubmit={handleSubmit}>
                        <div className={styles.inputs}>
                            <div className={styles.inputContainer}>
                                <div className={styles.input}>
                                    <img src='/assets/person.png' alt="" />
                                    <input type="text" placeholder='Username' onChange={e => setUsername(e.target.value)}/>
                                </div>
                                <span>
                                    {errors.username && <p style={{color: 'red', marginLeft: '40px'}}>{errors.username}</p>}
                                </span>
                            </div>
                            <div className={styles.inputContainer}>
                                <div className={styles.input}>
                                    <img src='/assets/email.png' alt="" />
                                    <input type="email" placeholder='E-mail' onChange={e => setEmail(e.target.value)}/>
                                </div>
                                <span>
                                    {errors.email && <p style={{color: 'red', marginLeft: '40px'}}>{errors.email}</p>}
                                </span>
                            </div>
                            <div className={styles.inputContainer}>
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
                                <span>
                                    {errors.password && <p style={{color: 'red', marginLeft: '40px'}}>{errors.password}</p>}
                                </span>
                            </div>
                            <div className={styles.inputContainer}>
                                <div className={styles.input}>
                                    <img src='/assets/description.png' alt="" />
                                    <input type="description" placeholder='Description' onChange={e => setDescription(e.target.value)}/>        
                                </div>
                                <span>
                                    {errors.description && <p style={{color: 'red', marginLeft: '40px'}}>{errors.description}</p>}
                                </span>
                            </div>
                            <div className={styles.inputContainer}>
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
                                <span>
                                    {errors.position && <p style={{color: 'red', marginLeft: '40px'}}>{errors.position}</p>}
                                </span>
                            </div>
                            <button className={styles.submit} type="submit">
                                Sign Up
                            </button>
                        </div>
                    </form>

                <div className={styles.footer_signup}>Already have an account?
                    <Link href='/' className={styles.click_here_signup}>
                        <span> Click Here!</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}
