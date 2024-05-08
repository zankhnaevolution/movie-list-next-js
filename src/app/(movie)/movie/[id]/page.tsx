'use client'

import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import MovieForm from "../movie-form";

export default function SingleFunction({ params }: { params: { id: string }}){

    const [ movieObject, setMovieObject ] = useState({
        title: '',
        published_year: '',
        img: null,
        img_url: ''
    })
    const [ objectReady, setObjectReady ] = useState(false);
    const [ fileBlob, setFileBlob ] = useState("");
    
    useEffect(() => {
        fetch(
            `http://localhost:3000/movie/${params.id}`, 
            {
                method: 'GET',
                headers: {
                    "Authorization": `${Cookies.get('Authorization')}`
                },
            }
        )
            .then((response) => response.json())
            .then((result) => {
                setMovieObject({
                    title: result.movie_title,
                    published_year: result.movie_published_year,
                    img: null,
                    img_url: `http://localhost:3000/uploads/` + result.movie_img
                })
                setObjectReady(true);
            })
            .catch((error) => console.error(error))
    }, [])
    
    return(
        <>
            { objectReady && 
                <MovieForm pageName="update" movieId={params.id} movieObject={movieObject}/> 
            }
        </>
    )
}