import React, { useState } from 'react';
import styles from './Login.module.css';
import { useRouter } from 'next/router';
import Link from 'next/link';


async function handleLogin(username, password, router, setLoginError) {
    
    try {
        const response = await fetch('http://localhost:8080/Login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }), // send the email and password as JSON
        });

        if (response.ok) {
            
            const { token, userId } = await response.json(); // extract the token from the response
            localStorage.setItem('token', token); // store the token in local storage
            localStorage.setItem('username', username); // store the username in local storage
            localStorage.setItem('userId', userId); // store the userId in local storage
            router.push('/Hub'); // navigate to /hub route if login is successful
        } else {
            setLoginError('Incorrect username or password'); // set login error to true if the response is not ok
        }
    } catch (error) {
        console.error(error);
    }
}


function Login() {

    const [loginError, setLoginError] = useState(null);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const router = useRouter();

    const validateForm = () => {
        let formErrors = {};

        // Username validation
        if (!username) {
            formErrors.username = "Username is required";
        }

        // Password validation
        if (!password) {
            formErrors.password = "Password is required";
        }

        setErrors(formErrors);

        // If no errors, return true
        return Object.keys(formErrors).length === 0;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValidForm = validateForm();
    
        if (isValidForm && !errors.username && !errors.password) {
            handleLogin(username, password, router, setLoginError);
        }
    }

    return (
        <div className=''>
            <div className="absolute top-0 left-0 w-full h-[12.5%]"
                style={{ backgroundColor: "#729560" }}
            ></div>
            
            <img src='/assets/logo.png' alt="Logo" className={styles.logo_login} />

            <div className={styles.container_login}>
                <div className={styles.header_login}>

                    <div className={styles.text_login}>Log In</div>
                    <div className={styles.underline_login}></div>

                </div>


                <form onSubmit={handleSubmit}>
                    <div className={styles.inputs_login}>
                        <div className={styles.inputContainer_login}>
                            <div className={styles.input_login}>
                                <img src='/assets/person.png' alt="" />
                                <input type="username" placeholder='Username' onChange={e => setUsername(e.target.value)}/>
                        </div>
                        <span>
                            {errors.username && <p style={{color: 'red', marginLeft: '50px', marginTop: '10px'}}>{errors.username}</p>}
                        </span>
                            
                        </div>

                        <div className={styles.inputContainer_login}>
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
                            {errors.password && <p style={{color: 'red', marginLeft: '50px', marginTop: '10px'}}>{errors.password}</p>}
                            {loginError && <p style={{color: 'red', marginLeft: '50px', marginTop: '10px'}}>{loginError}</p>}
                        </div>
                        
                    </div>

                
            
                    <button className={styles.submit_login} type="submit">Log In</button>
                
                </form>
                
                                
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