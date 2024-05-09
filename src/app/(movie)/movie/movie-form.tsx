'use client'

import { useState } from "react";
import { useForm } from "react-hook-form"
import cStyles from '../../styles/common.module.css'
import styles from '../../styles/add_update_movie.module.css'
import Link from "next/link";
import apiCall from "@/app/utils/apiCall";
import toast from "react-hot-toast";

export default function MovieForm({ pageName, movieId, movieObject = { title: '', published_year: '', img: null, img_url: '' } }: { pageName: string, movieId: string, movieObject: {
    title: string,
    published_year: string,
    img: string | null | Blob
    img_url: string
} }){

    const { register, handleSubmit, formState: { errors } } = useForm();

    const [ fileBlob, setFileBlob ] = useState("");
    const [ formData, setFormData ] = useState(movieObject)

    const handleFormSubmit = () => {
        const apiData = new FormData();
        apiData.append("title", formData.title);
        apiData.append("published_year", formData.published_year);
        apiData.append("img", formData.img);

        pageName === 'create' ? handlePost(apiData) : handlePatch(apiData);
    }

    const handlePost = async (apiData: any) => {

        // const postFormdata = new FormData();
        // postFormdata.append("title", formData.title);
        // postFormdata.append("published_year", formData.published_year);
        // postFormdata.append("img", formData.img);

        try{
            await apiCall('/movie', 'POST', apiData, {});

            toast.success('Wohooo, Movie created!!!');

            setFormData({
                title: "",
                published_year: "",
                img: null,
                img_url: ''
            });
            setFileBlob("");
        }catch(error){
            if(error.response && error.response.data && error.response.data.message){
                toast.error(error.response.data.message);
            }else{
                toast.error("Oops, Something went wrong!!!");
            }
        }
        /* fetch(
            "http://localhost:3000/movie", 
            {
                method: 'POST',
                headers: {
                    "Authorization": Cookies.get('Authorization')
                },
                body: formdata,
            }
        )
            .then((response) => response.text())
            .then((result) => {
                setFormData({
                    title: "",
                    published_year: "",
                    img: null
                });
                setFileBlob("");
            })
            .catch((error) => console.error(error)); */
    }

    const handlePatch = async (apiData: any) => {
        // const putFormData = new FormData();
        // putFormData.append("title", formData.title);
        // putFormData.append("published_year", formData.published_year);
        // putFormData.append("img", formData.img);

        try{
            await apiCall(`/movie/${movieId}`, 'PATCH', apiData, {});
            toast.success('Wohooo, Movie updated!!!')
        }catch(error){
            if(error.response && error.response.data && error.response.data.message){
                toast.error(error.response.data.message);
            }else{
                toast.error("Oops, Something went wrong!!!");
            }
        }
 
       /*  fetch(
            `http://localhost:3000/movie/${movieId}`, 
            {
                method: 'PATCH',
                headers: {
                    "Authorization": Cookies.get('Authorization')
                },
                body: putFormData,
            }
        )
            .then((response) => response.json())
            .then((result) => {
            })
            .catch((error) => console.error(error)); */
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        setFileBlob(URL.createObjectURL(e.target.files[0]))
        const file = e.target.files[0];
        setFormData((prevData) => ({
            ...prevData,
            img: file,
        }));
    };

    const handleResetImage = (e) => {
        e.preventDefault();
        setFormData((prevData) => ({
            ...prevData,
            img: null,
            img_url: ''
        }))
        setFileBlob("");
    }

    return(
        <>
            <form method="post" 
                onSubmit={handleSubmit(handleFormSubmit)}
                encType='multipart/form-data'
            >
                <main className={`vh-100 d-flex flex-column justify-content-center gap-5 ${cStyles['page-background-color']}`}>
                    
                    <div className={`${cStyles["h2-css"]} ${cStyles["page-background-color"]}`} style={{
                        paddingLeft: "17%"
                    }}>
                        { pageName === "create" ? 'Create a new movie' : 'Edit' }
                    </div>

                    <div className="d-flex w-100 align-items-center justify-content-center" style={{
                        gap: '8%'
                    }}>

                        { !formData.img && formData.img_url == '' ? (
                                <div 
                                    className={`${styles["upload-div"]} ${styles["upload-css"]}`}
                                    onDragOver={(e) => {
                                        e.preventDefault();
                                    }}
                                    onDragLeave={() => {
                                    }}
                                    onDrop={(e) => {
                                        e.preventDefault();
                                        if (e.dataTransfer.items) {
                                            let item = e.dataTransfer.items[0]
                                            if (item.kind === "file") {
                                                const file = item.getAsFile();
                                                if (file) {
                                                    let blobUrl = URL.createObjectURL(file);
                                                    // console.log("From Drop")
                                                    // console.log(blobUrl)
                                                    setFileBlob(blobUrl);
                                                    setFormData((prevData) => ({
                                                        ...prevData,
                                                        img: file,
                                                    }));
                                                }
                                            }
                                        }
                                    }}
                                >
                                    <label htmlFor='file'>Drop an image here</label>                
                                    <input
                                        id="file"
                                        type="file"
                                        className="d-none"
                                        onChange={(e) => {
                                            handleFileChange(e)
                                        }}
                                    />
                                </div>
                            ) : (
                                <div className={`d-flex flex-column align-items-center gap-2 ${styles['upload-div']}`}>

                                    { 
                                        formData.img_url == '' ? 
                                            <object 
                                                className={`${styles["image-css"]}`}
                                                data={fileBlob}
                                                type="image/jpeg"
                                            ></object>
                                        : 
                                            <img 
                                                src={formData.img_url} 
                                                className={`${styles["image-css"]}`} 
                                                /> 
                                    }

                                    <button className={`${styles['reset-cancel-btn']}`} onClick={(e) => handleResetImage(e)}>Reset</button>
                                </div>
                            )
                        }
    
                        <div className={`${styles["form-css"]}`}>                    
                            <div className="mb-3">
                                <input 
                                    { ...register('title', { 
                                        required: "Movie title is required" 
                                    } )}
                                    value={formData.title}
                                    className={`form-control ${styles["input-css"]} ${styles["input-css-title"]} ${errors.title?.message ? styles['input-css-error'] : ''}`} 
                                    placeholder="Title" 
                                    onChange={(e) => handleChange(e)} />

                                <p className={`mt-2 ${cStyles["body-extra-small"]} ${styles["error-text"]}`}>{ errors.title?.message }</p>
                            </div>
                
                            <div className="mb-3">
                                <input
                                    { ...register('published_year', { 
                                        required: "Movie published year field is required",
                                        pattern: {
                                            value: /^[0-9]{4}$/,
                                            message: 'Please enter valid published year',
                                        } 
                                    } ) }
                                    value={formData.published_year}
                                    className={`form-control ${styles["input-css"]} ${styles["input-css-publishedyear"]} ${errors.published_year?.message ? styles['input-css-error'] : ''}`}
                                    placeholder='Published Year'
                                    onChange={(e) => handleChange(e)} />

                                <p className={`mt-2 ${cStyles["body-extra-small"]} ${styles["error-text"]}`}>{ errors.published_year?.message }</p>
                            </div>
                            
                            <div className={`mb-3 ${styles['btn-container']}`}>
                                <Link href={'/movie'} type="reset" className={`btn ${cStyles["body-regular"]} ${styles["reset-cancel-btn"]}`}>Cancel</Link>
                                <button type="submit" className={`btn ${cStyles["body-regular"]} ${styles["submit-btn"]}`}>
                                    { pageName === 'create' ? 'Submit' : 'Update' }
                                </button>
                            </div>
                        </div>
                    </div>
                </main>
            </form>
        </>
    )
}