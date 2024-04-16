import React, { useState } from 'react';
import styles from './Login.module.css';

import { useRouter } from 'next/router';
import Link from 'next/link';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    return (
        <div className=''>
            <div className={styles.logo_login}>
                <img src='/assets/logo.png' alt="" /> 
            </div>
            <div className={styles.container_login}>
                <div className={styles.header_login}>

                    <div className={styles.text_login}>Log In</div>
                    <div className={styles.underline_login}></div>

                </div>

                <div className={styles.inputs_login}>
                    <div className={styles.input_login}>
                        <img src='/assets/person.png' alt="" />
                        <input type="username" placeholder='Username' onChange={e => setUsername(e.target.value)}/>
                    </div>

                    <div className={styles.input_login}>
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

                    <div className={styles.submit_login} 
                        onClick={async () => {
                            try {
                                const response = await fetch('http://localhost:8080/Login', {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify({ username, password }), // send the email and password as JSON
                                });

                                if (response.ok) {
                                    const { token } = await response.json(); // extract the token from the response
                                    localStorage.setItem('token', token); // store the token in local storage
                                    localStorage.setItem('username', username); // store the username in local storage
                                    router.push('/Hub'); // navigate to /hub route if login is successful
                                }
                            } catch (error) {
                                console.error(error);
                            }
                        }}
                    >
                        Log In
                    </div>
                </div>
                                
                <div className={styles.footer_login}>Don't have an account?
                    <Link href='/Signup' className={styles.click_here_login}>
                        <span> Click Here!</span>
                    </Link>
                </div>

            </div>
        </div>
    );
}

export default Login;