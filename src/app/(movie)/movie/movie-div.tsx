import styles from '../../styles/movielist.module.css'
import cStyles from '../../styles/common.module.css';
import { useState } from 'react';

export default function MovieDiv({ movies, currentPage }: { movies: [], currentPage: number }){

    const [ prevDisabled, setPrevDisabled ] = useState(true);

    function handlePaginationClick(page: string){
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

        setCurrentPage(pageNumber);
        fetchMovies({ page: pageNumber })
    }

    return (
        <main className={`justify-content-center align-items-center ${cStyles['page-background-color']}`}>

            <div className={`${cStyles["h2-css"]} ms-4`}>My movies</div>

            <div className={`row row-cols-3 row-cols-md-4 ${styles['movies-div']}`}>

                { movies.map((movie : {
                    _id: string,
                    movie_title: string,
                    movie_published_year: number
                }) => (

                <div className={`col mb-4 ml-4 ${styles['movie-div']}`} key={movie._id}>
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
                </div>

                ))}

            </div>

            <nav>
                <ul className={`pagination justify-content-center pb-4 ${cStyles["body-regular"]}`}>
                    <span 
                        className={`${styles["movie-nav-element"]} ${ prevDisabled ? styles['pagination-disabled'] : '' }`}
                        onClick={() => handlePaginationClick('prev')}
                    >Prev</span>                        
                    <div 
                        className={`${styles["movie-nav-element"]} ${styles["movie-nav-square"]} ${ currentPage === 1 ? styles["movie-nav-square-active"]: '' }`}
                        onClick={() => handlePaginationClick('1')}
                    >1</div>
                    <div 
                        className={`${styles["movie-nav-element"]} ${styles["movie-nav-square"]} ${ currentPage === 2 ? styles["movie-nav-square-active"]: '' }`}
                        onClick={() => handlePaginationClick('2')}
                    >2</div>
                    <span 
                        className={`${styles["movie-nav-element"]}`}
                        onClick={() => handlePaginationClick('next')}
                    >Next</span>
                </ul>
            </nav>

        </main> 
    )
}