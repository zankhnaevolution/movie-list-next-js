'use client'

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Auth(){

    const [ movies, setMovies ] = useState([]);

    useEffect(() => {
        fetch(
            "http://localhost:3000/movie", 
            {
                headers: {
                    method: 'GET',
                    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MzBlNDNhZjA4YjRhMGIxZWIxY2E0NCIsImVtYWlsIjoiemFua2huYS5yQGV2b2x1dGlvbmNsb3VkLmluIiwiaWF0IjoxNzE0NjU2OTA5LCJleHAiOjE3MTQ3NDMzMDl9.DJEZJZDK8Fl1N7G8CbWsaaQaneZ6vXSb1N5DYJxXRFc"
                }
            }
        )
            .then((response) => response.json())
            .then((result) => {
                setMovies(result)
            })
            .catch((error) => console.error(error));
    }, [])


    return(
        <>
            { movies.map(movie => (
                movie._id
            )) }
        </>
    )
}