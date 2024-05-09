'use client'

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import styles from '../../styles/movielist.module.css'
import cStyles from '../../styles/common.module.css';
import Loading from "./loading";
import EmptyState from "./empty-state";
import apiCall from "@/app/utils/apiCall";
import Head from "next/head";

export default () => {
    const [ isFetching, setIsFetching ] = useState(true);
    const [ movies, setMovies ] = useState([]);
    const [ currentPage, setCurrentPage ] = useState(1)
    const [ prevDisabled, setPrevDisabled ] = useState(true);
    const [ nextDisabled, setNextDisabled ] = useState(false);
    const [ totalPages, setTotalPages ] = useState(0);
    const router = useRouter();

    async function getMovies({ page }: { page: number }){
        /* try{
            const response = await fetch(
                `http://localhost:3000/movie?page=${page}`, 
                {
                    headers: {
                        method: 'GET',
                        "Authorization": `${Cookies.get('Authorization')}`
                    }
                }
            )
            if(!response.ok){
                throw new Error(response.status);
            }
            const result = await response.json();
            setMovies(result.movies)
            setTotalPages(Math.ceil(parseInt(result.totalMovies)/8));
            setIsFetching(false);
        }catch(error){
            if(error.message == 401){
                console.log(Cookies.get('refresh_token'))
                let token = await refreshToken(Cookies.get('refresh_token'))
                console.log({token})
                console.log("Handle Unauthorized Error")
            }
        } */

        try{
            const result = await apiCall(`/movie?page=${page}`, 'GET', {}, {})
            setMovies(result.movies)
            setTotalPages(Math.ceil(parseInt(result.totalMovies)/8));
            setIsFetching(false);
        }catch(error){
            console.log("Movie List")
            console.log(error)
        }
    }

    function handlePaginationClick(page: string | number){
        let pageNumber: number;
        switch(page){
            case 'prev' : 
                if(currentPage > 1){
                    pageNumber = currentPage - 1;
                }else{
                    pageNumber = currentPage
                }
                break;
            case 'next': 
                pageNumber = currentPage + 1;
                break;
            default:
                pageNumber = parseInt(page);
        }

        pageNumber === 1 ? setPrevDisabled(true) : setPrevDisabled(false);
        pageNumber === totalPages ? setNextDisabled(true) : setNextDisabled(false);

        setCurrentPage(pageNumber);
        getMovies({ page: pageNumber })
    }

    console.log("Fetching") // Called twice

    useEffect(() => {
        getMovies({ page: currentPage });
    }, [])

    const handleLogout = () => {
        Cookies.remove('Authorization');
        router.push('/signin');
    }

    return(
        <>
            <Head>
                <title>Zankhna</title>
            </Head>
            { isFetching ? (
                <Loading/>
            ) :  movies.length > 0 ? 
                ( 
                    <main className={`d-flex justify-content-center flex-column gap-5 ${cStyles['page-background-color']} ${styles['movie-list-main-css']}`}>

                        <div className={`w-100 d-flex flex-row align-items-center justify-content-between`}>
                            <div className={`d-flex flex-row align-items-center gap-2`}>
                                <div className={`${styles["heading-css"]}`}>My movies</div> 
                                <Link href={'movie/create'}><i className="bi bi-plus-circle" style={{
                                    fontSize: "1.6rem"
                                }}></i></Link>
                            </div>
                            <div className={`d-flex align-items-center gap-2 ${styles['logout-css']}`} onClick={() => handleLogout()}>
                                <div className={`cStyles["body-regular"] ${styles['logout-text']}`}>Logout</div>
                                <i className={`bi bi-box-arrow-right`} style={{
                                    fontSize: "1.3rem"
                                }}></i>
                            </div>
                        </div>

                        <div className={`${styles['movies-div']}`}>
                        {/* <div className={`row row-cols-sm-2 ${styles['movies-div']}`}> */}

                            { movies.map((movie : {
                                _id: string,
                                movie_title: string,
                                movie_published_year: number
                            }) => (
                                    
                                <Link href={`/movie/${movie._id}`} className={`col text-decoration-none ${styles['movie-div']}`} key={movie._id}>
                                    <div className={`card ${styles['movie-div-card']}`}>
                                        <img 
                                            className={`card-img-top ${styles['movie-img']}`}
                                            src={`http://localhost:3000/uploads/${movie.movie_img}`}
                                            alt="..."/>
                                        <div className={`card-body ${styles['movie-div-card']}}`}>
                                            <h5 className={`card-title ${styles["movie-title-css"]}`} style={{color: "white"}}>{movie.movie_title}</h5>
                                            <p className={`card-text ${cStyles['body-small']}`}>{movie.movie_published_year}</p>
                                        </div>
                                    </div>
                                </Link>

                            ))}

                        </div>

                        <nav>
                            <ul className={`pagination justify-content-center pb-4 ${cStyles["body-regular"]}`}>
                                <span 
                                    className={`${styles["movie-nav-element"]} ${ prevDisabled ? styles['pagination-disabled'] : '' }`}
                                    onClick={() => handlePaginationClick('prev')}
                                >Prev</span>

                                {[...Array(totalPages)].map((d, i) => 
                                    <div 
                                        className={`${styles["movie-nav-element"]} ${styles["movie-nav-square"]} ${ currentPage === (i+1) ? styles["movie-nav-square-active"]: '' }`}
                                        onClick={() => handlePaginationClick((i+1))}
                                        key={i}
                                    >{i+1}</div>
                                )}

                                <span 
                                    className={`${styles["movie-nav-element"]} ${ nextDisabled ? styles['pagination-disabled'] : '' }`}
                                    onClick={() => handlePaginationClick('next')}
                                >Next</span>
                            </ul>
                        </nav>

                    </main> 
                ) : (
                    <EmptyState/>
                )
            }
        </>
    )
}