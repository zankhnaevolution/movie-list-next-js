'use client'

import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { notFound } from "next/navigation";
import styles from '../../styles/movielist.module.css'
import cStyles from '../../styles/common.module.css';
import Loading from "./loading";
import EmptyState from "./empty-state";

export default function Auth(){
    const [ isFetching, setIsFetching ] = useState(true);
    const [ movies, setMovies ] = useState([]);
    const [ currentPage, setCurrentPage ] = useState(1)
    const [ prevDisabled, setPrevDisabled ] = useState(true);
    const [ nextDisabled, setNextDisabled ] = useState(false);
    const [ totalPages, setTotalPages ] = useState(0);
    
    function fetchMovies({ page }: { page: number }){
        fetch(
            `http://localhost:3000/movie?page=${page}`, 
            {
                headers: {
                    method: 'GET',
                    "Authorization": `${Cookies.get('Authorization')}`
                }
            }
        )
            .then((response) => response.json())
            .then((result) => {
                setMovies(result.movies)
                setTotalPages(Math.ceil(parseInt(result.totalMovies)/8));
                setIsFetching(false);
            })
            .catch((error) => console.error(error));
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
        fetchMovies({ page: pageNumber })
    }

    useEffect(() => {
        fetchMovies({ page: currentPage });
    }, [])

    return(
        <>
            { isFetching ? (
                <Loading/>
            ) :  movies.length > 0 ? 
                ( 
                    <main className={`d-flex justify-content-center flex-column gap-5 ${cStyles['page-background-color']} ${styles['movie-list-main-css']}`}>

                        <div className={`w-100 d-flex flex-row align-items-center justify-content-between ${cStyles["h2-css"]}`}>
                            <div className={`d-flex flex-row align-items-center gap-2`}>
                                <div className={cStyles["h2-css"]}>My movies</div> 
                                <Link href={'movie/create'} className={`${styles["create-movie-btn"]} ${cStyles["body-regular"]}`}>+</Link>
                            </div>
                            <div className="d-flex align-items-center gap-2">
                                <div className={cStyles["body-regular"]}>Logout</div>
                                <i className={`bi bi-box-arrow-right`} style={{
                                    fontSize: "1.3rem"
                                }}></i>
                            </div>
                        </div>

                        <div className={`row row-cols-3 row-cols-md-4 ${styles['movies-div']}`}>

                            { movies.map((movie : {
                                _id: string,
                                movie_title: string,
                                movie_published_year: number
                            }) => (
                                    
                                <Link href={`/movie/${movie._id}`} className={`col mb-4 ml-4 text-decoration-none ${styles['movie-div']}`} key={movie._id}>
                                    <div className={`card ${styles['movie-div-card']}`}>
                                        <img 
                                            className={`card-img-top ${styles['movie-img']}`}
                                            src={`http://localhost:3000/uploads/${movie.movie_img}`}
                                            alt="..."/>
                                        <div className={`card-body ${styles['movie-div-card']}}`}>
                                            <h5 className={`card-title ${cStyles['body-large']}`} style={{color: "white"}}>{movie.movie_title}</h5>
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
                                {/* <div 
                                    className={`${styles["movie-nav-element"]} ${styles["movie-nav-square"]} ${ currentPage === 1 ? styles["movie-nav-square-active"]: '' }`}
                                    onClick={() => handlePaginationClick('1')}
                                >1</div>
                                <div 
                                    className={`${styles["movie-nav-element"]} ${styles["movie-nav-square"]} ${ currentPage === 2 ? styles["movie-nav-square-active"]: '' }`}
                                    onClick={() => handlePaginationClick('2')}
                                >2</div> */}

                                {[...Array(totalPages)].map((d, i) => 
                                    <div 
                                        className={`${styles["movie-nav-element"]} ${styles["movie-nav-square"]} ${ currentPage === (i+1) ? styles["movie-nav-square-active"]: '' }`}
                                        onClick={() => handlePaginationClick((i+1))}
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