import React, { useState } from 'react';
import './Login.css';

import { useRouter } from 'next/router';
import Link from 'next/link';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    return (
        <div className=''>
            <div className="logo-login">
                <img src='/assets/logo.png' alt="" /> 
            </div>
            <div className='container-login'>
                <div className="header-login">

                    <div className="text-login">Log In</div>
                    <div className="underline-login"></div>

                </div>

                <div className="inputs-login">
                    <div className="input-login">
                        <img src='/assets/email.png' alt="" />
                        <input type="email" placeholder='E-mail' onChange={e => setEmail(e.target.value)}/>
                    </div>

                    <div className="input-login">
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

                    <div className='submit-login' 
                        onClick={async () => {
                            const token = btoa(`${email}:${password}`); // Base64 encode the email and password
                            try {
                                const response = await fetch('http://localhost:8080/authentication/api/check-authentication', {
                                    method: 'GET',
                                    headers: {
                                        'Authorization': token,
                                    },
                                });
                                if (response.ok) {
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
                                
                <div className="footer-login">Don't have an account?
                    <Link href='/Signup' className='click-here-login'>
                        <span> Click Here!</span>
                    </Link>
                </div>

            </div>
        </div>
    );
}

export default Login;