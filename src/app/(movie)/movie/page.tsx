'use client'

import Link from "next/link";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { notFound } from "next/navigation";

export default function Auth(){

    const [ movies, setMovies ] = useState([]);

    useEffect(() => {
        fetch(
            `http://localhost:3000/movie`, 
            {
                headers: {
                    method: 'GET',
                    "Authorization": `${Cookies.get('Authorization')}`
                }
            }
        )
            .then((response) => response.json())
            .then((result) => {
                if(result.length > 0){
                    setMovies(result)
                }else{
                    console.log("Elseeee")
                    notFound();
                }
            })
            .catch((error) => console.error(error));
    }, [])

    return(
        <>  
            <main className="vh-100 d-flex justify-content-center align-items-center">
                <div className="row row-cols-3 row-cols-md-4">

                    { movies.map(movie => (

                    <div className="col mb-4">
                        <div className="card">
                        <img src={`http://localhost:3000/uploads/${movie.movie_img}`} className="card-img-top" alt="..."/>
                        <div className="card-body">
                            <h5 className="card-title" style={{color: "white"}}>{movie.movie_title}</h5>
                            <p className="card-text">{movie.movie_published_year}</p>
                        </div>
                        </div>
                    </div>

                    ))}

                </div>
            </main>
        </>
    )
}