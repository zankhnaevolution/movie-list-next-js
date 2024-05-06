'use client'

import { useState } from 'react'
import Cookies from 'js-cookie'
import cStyles from '../../../styles/common.module.css'
import styles from '../../../styles/addmovie.module.css'

export default function createMovie(){

    const [ fileBlob, setFileBlob] = useState("");
    const [ formData, setFormData ] = useState({
        title: '',
        published_year: '',
        file: null
    })

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
            file,
        }));
    };

    function handleSubmit(e){
        e.preventDefault();

        const formdata = new FormData();
        formdata.append("title", formData.title);
        formdata.append("published_year", formData.published_year);
        formdata.append("img", formData.file);

        fetch(
            "http://localhost:3000/movie", 
            {
                method: 'POST',
                headers: {
                    "Authorization": `${Cookies.get('Authorization')}`
                },
                body: formdata,
            }
        )
            .then((response) => response.text())
            .then((result) => {
                setFormData({
                    title: "",
                    published_year: "",
                    file: null
                });
                setFileBlob("");
            })
            .catch((error) => console.error(error));
    }

    return(
        <form method="post" 
            onSubmit={(e) => {
                handleSubmit(e)
            }}
            encType='multipart/form-data'
        >
            <main className={`vh-100 d-flex justify-content-center align-items-center ${cStyles['page-background-color']} ${styles['main-div']}`}>
                {!formData.file ? (<div 
                    className={`${styles["upload-css"]}`}
                    onDragOver={(e) => {
                        e.preventDefault();
                        // setFileEnter(true);
                    }}
                    onDragLeave={() => {
                        // setFileEnter(false)
                    }}
                    onDrop={(e) => {
                        e.preventDefault();
                        if (e.dataTransfer.items) {
                            let item = e.dataTransfer.items[0]
                            if (item.kind === "file") {
                                const file = item.getAsFile();
                                if (file) {
                                    let blobUrl = URL.createObjectURL(file);
                                    setFileBlob(blobUrl);
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
                </div>) : (
                    <object 
                        className={`${styles["upload-css"]}`}
                        data={fileBlob}
                        type="image/jpeg"
                    ></object>
                )}
                <div className={`p-3 ${styles["form-css"]}`}>
                    
                        <div className="mb-3">
                            <input 
                                name='title'
                                value={formData.title}
                                className={`form-control ${styles["input-css"]} ${styles["input-css-title"]}`} 
                                placeholder="Title" 
                                onChange={(e) => handleChange(e)} />
                        </div>
            
                        <div className="mb-3">
                            <input
                                name='published_year'
                                value={formData.publishedYear}
                                className={`form-control ${styles["input-css"]} ${styles["input-css-publishedyear"]}`}
                                placeholder='Published Year'
                                onChange={(e) => handleChange(e)} />
                        </div>
                        <div className={`mb-3 ${cStyles["body-regular"]} ${styles['btn-container']}`}>
                            <button className={`btn ${styles["cancel-btn"]}`}>Cancel</button>
                            <button type="submit" className={`btn ${styles["submit-btn"]}`}>Submit</button>
                        </div>
                    {/* </form> */}
                </div>
            </main>
        </form>
    )
}

// components/MyForm.js

// import { useState } from 'react';

// export default function MyForm(){
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     file: null,
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     setFormData((prevData) => ({
//       ...prevData,
//       file,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formDataToSend = new FormData();
//     formDataToSend.append('title', formData.name);
//     formDataToSend.append('published_year', 2024);
//     formDataToSend.append('file', formData.file);

//     try {
//       const response = await fetch('http://localhost:3000/movie', {
//         method: 'POST',
//         body: formDataToSend,
//         headers: {
//                                 "Authorization": `${Cookies.get('Authorization')}`
//                             },
//       });
//       if (response.ok) {
//         // Handle success
//         console.log('Form submitted successfully');
//       } else {
//         // Handle error
//         console.error('Form submission failed');
//       }
//     } catch (error) {
//       console.error('Error submitting form:', error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         type="text"
//         name="name"
//         placeholder="Name"
//         value={formData.name}
//         onChange={handleChange}
//       />
//       <input
//         type="email"
//         name="email"
//         placeholder="Email"
//         value={formData.email}
//         onChange={handleChange}
//       />
//       <input type="file" name="file" onChange={handleFileChange} />
//       <button type="submit">Submit</button>
//     </form>
//   );
// };

// export default MyForm;
