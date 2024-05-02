'use client'

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react"

export default function Signin() {

    let [ email, setEmail ] = useState("zankhna.r@evolutioncloud.in");
    let [ password, setPassword ] = useState("12345678");
    let [ tryAgainMessage, setTryAgainMessage ] = useState(false);
    const router = useRouter();

    function handleSubmit(e: FormEvent){
        e.preventDefault();

        fetch(
            "http://localhost:3000/signin", 
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
            .then((response) => {
                if(!response.ok){
                    throw new Error('Try Again');
                }
                response.json()
            })
            .then((result) => {
                router.push('/movie/')
            })
            .catch((error) => {
                console.log(error)
                setEmail('')
                setPassword('')
                setTryAgainMessage(true);
            });
    }

    function handleKeyDown(){
        setTryAgainMessage(false);
    }

    return (

        <>

        { tryAgainMessage && "Try Again for Login" }

        <form method="post" onSubmit={(e) => handleSubmit(e)}>
            Email: 
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} onKeyDown={() => handleKeyDown()}/><br></br>
            Password: 
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} onKeyDown={() => handleKeyDown()}/><br></br>
            <button type="submit">Sign In</button>
        </form>

        </>
    )
}