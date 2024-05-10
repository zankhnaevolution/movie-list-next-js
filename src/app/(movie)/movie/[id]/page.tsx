'use client'

import React, { useEffect, useState } from "react";
import MovieForm from "../movie-form";
import apiCall from "@/app/utils/apiCall";

export default function SingleFunction({ params }: { params: { id: string }}){

    const [ movieObject, setMovieObject ] = useState({
        title: '',
        published_year: '',
        img: '',
        img_url: ''
    })
    const [ objectReady, setObjectReady ] = useState(false);

    const NEXT_PUBLIC_BACKEND_API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;
    
    useEffect(() => {

        apiCall(`/movie/${params.id}`, 'GET', {}, {})
            .then((result) => {
                setMovieObject({
                    title: result.movie_title,
                    published_year: result.movie_published_year,
                    img: '',
                    img_url: `${NEXT_PUBLIC_BACKEND_API_URL}/uploads/${result.movie_img}`
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