'use client'

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react"
import Cookies from 'js-cookie';
import { useForm } from 'react-hook-form';
import styles from '../../styles/signin.module.css'
import cStyles from '../../styles/common.module.css';

type Inputs = {
    email: string,
    password: string
}

export default function SignIn() {

    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");

    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();

    const [ rememberMe, setRememberMe ] = useState(false);
    const [ error, setError ] = useState(false);
    const [ showPassword, setShowPassword ] = useState(false);
    const router = useRouter();

    const NEXT_PUBLIC_BACKEND_API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;

    function handleFormSubmit(/* e: FormEvent */){
        // e.preventDefault();

        if(email && password){
            fetch(
                `${NEXT_PUBLIC_BACKEND_API_URL}/signin`, 
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email, password
                    }),
                }
            )
                .then(async(response) => {
                    if(!response.ok){
                        const error = await response.json()
                        throw new Error();
                    }
                    return response.json();
                })
                .then((result) => { 
                    if(rememberMe){
                        Cookies.set('Authorization', `Bearer ${result.access_token}`, { expires: 7 });
                        Cookies.set('refresh_token', `${result.refresh_token}`, { expires: 7 });
                    }else{
                        Cookies.set('Authorization', `Bearer ${result.access_token}`);
                        Cookies.set('refresh_token', `${result.refresh_token}`);
                    } 
                    router.push('/movie/')
                })
                .catch((error) => {    
                    setError(true);
                });
        }
    }

    function handleKeyDown(){
        setError(false);
    }

    return (
        <main className={`vh-100 d-flex justify-content-center align-items-center ${cStyles['page-background-color']}`}>
            <div className={styles.login_box + ' p-3'}>
                <h1 className={`display-6 mb-3 text-center text-white ${cStyles['h1-css']}`}>Sign in</h1>

                { error && <div className={`text-center text-danger ${cStyles['body-regular']} mb-2`}>
                    Incorrect Email or Password
                </div> }

                <form method="post" onSubmit={handleSubmit(handleFormSubmit)}>
                    <div className="mb-3">
                        <input 
                            {
                                ...register('email', {
                                    required: 'Email is required'
                                })
                            }
                            value={email}
                            className={`form-control ${styles["input-css"]} ${errors.email?.message ? cStyles['input-css-error'] : '' }`} 
                            placeholder="Email" 
                            onChange={(e) => setEmail(e.target.value)}
                            onKeyDown={() =>  handleKeyDown()} />
                        <p className={`mt-2 ${cStyles["body-extra-small"]} ${cStyles["error-text"]}`}>{ errors.email?.message }</p>
                    </div>
        
                    <div className={`mb-3`}>  
                        <span className={styles["password-div"]}>                      
                            <span className={styles['eye-css']}><i className={`bi ${ showPassword ? 'bi-eye-slash-fill' : 'bi-eye-fill' }`} onClick={() => setShowPassword(!showPassword)}></i></span>
                            <input
                                {
                                    ...register('password', {
                                        required: 'Password is required',
                                        pattern:{
                                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
                                            message: "Pasword must has at least 8 characters that include at least 1 lowercase character, 1 uppercase character, 1 number and 1 special character in (!@#$%^&*)"
                                        }
                                    })   
                                }
                                value={password} 
                                className={`form-control ${styles["input-css"]} ${errors.password?.message ? cStyles['input-css-error'] : ''}`}
                                placeholder="Password" 
                                type={ showPassword ? 'text' : 'password' }
                                onChange={(e) => setPassword(e.target.value)}
                                onKeyDown={() =>  handleKeyDown()} />
                        </span>
                        <p className={`mt-2 ${cStyles["body-extra-small"]} ${cStyles["error-text"]}`}>{ errors.password?.message }</p>
                    </div>

                    <div className={`mb-3 ${styles["wrapper"]} ${cStyles["body-small"]}`}>
                        <label className={`d-flex justify-content-center align-items-center gap-1 ${styles["container"]}`}>
                            <input 
                                type="checkbox" 
                                value="remember-me" 
                                onChange={(e) => setRememberMe(e.target.checked)} />
                                <span className={styles["checkmark"]}></span> Remember me
                        </label>
                    </div>

                    <div className={`mb-3 ${styles["wrapper"]}`}>
                        <button type="submit" className={`btn ${styles["login-btn"]} ${cStyles["body-regular"]}`}>Login</button>
                    </div>
                </form>
            </div>
        </main>
    )
}