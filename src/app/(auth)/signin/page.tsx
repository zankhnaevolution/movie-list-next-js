'use client'

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react"
import Cookies from 'js-cookie';
import styles from '../../styles/signin.module.css'
import cStyles from '../../styles/common.module.css';
import toast from "react-hot-toast";

export default function SignIn() {

    let [ email, setEmail ] = useState("");
    let [ password, setPassword ] = useState("");
    const router = useRouter();

    const NEXT_PUBLIC_BACKEND_API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;

    function handleSubmit(e: FormEvent){
        e.preventDefault();

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
                        if(error?.message){
                            toast.error(error.message)
                        }else{
                            throw new Error();
                        }
                    }
                    return response.json();
                })
                .then((result) => {    
                    Cookies.set('Authorization', `Bearer ${result.access_token}`);
                    Cookies.set('refresh_token', `${result.refresh_token}`);
                    router.push('/movie/')
                })
                .catch((error) => {                    
                    setEmail('')
                    setPassword('')
                });
        }
    }

    return (
        <main className={`vh-100 d-flex justify-content-center align-items-center ${cStyles['page-background-color']}`}>
            <div className={styles.login_box + ' p-3'}>
                <h1 className={`display-6 mb-3 text-center text-white ${cStyles['h1-css']}`}>Sign in</h1>
                <form method="post" onSubmit={(e) => handleSubmit(e)}>
                    <div className="mb-3">
                        <input 
                            value={email}
                            className={`form-control ${styles["input-css"]}`} 
                            placeholder="Email" 
                            onChange={(e) => setEmail(e.target.value)} />
                    </div>
        
                    <div className="mb-3">
                        <input
                            value={password} 
                            className={`form-control ${styles["input-css"]}`}
                            placeholder="Password" 
                            type="password"
                            onChange={(e) => setPassword(e.target.value)} />
                    </div>

                    <div className={`mb-3 ${styles["wrapper"]} ${cStyles["body-small"]}`}>
                        <label className={`d-flex justify-content-center align-items-center gap-1 ${styles["container"]}`}>
                            <input 
                                type="checkbox" 
                                value="remember-me" 
                                /* className={styles["checkbox-css"]} */ />
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