/* eslint-disable @next/next/no-img-element */
import React from "react";
import { useState } from "react";
import styles from '../styles/UpdateProfile.module.css'
import axios from "axios";

export default function UpdateProfile({user, setShowForm}){

    const [file,setFile] = useState(null);
    const [firstName, setFirstName] = useState(user.first_name);
    const [lastName, setLastName] = useState(user.last_name);

    const [errors,setErrors] = useState([]);

    const closeForm = (e)=>{
        setShowForm(false);
    }
    const handleSubmit = (e)=>{
        const formData = new FormData();
        formData.set('first_name',firstName);
        formData.set('last_name',lastName);
        
        if(file){ 
            formData.append('file',file);  
        }
        e.preventDefault();
         const token = JSON.parse(localStorage.getItem('token'));
         const user = JSON.parse(localStorage.getItem('user'));
           const config = {
                headers: {Authorization: `Bearer ${token}`},
                'Content-Type': 'multipart/form-data'
           }
           axios.post(`http://localhost:4000/api/users/${user}/editProfile`,formData,config)
           .then((res)=>{
                setShowForm(false);
                setFirstName('');
                setLastName('');     
           })
           .catch(console.log);
    }
    const handleFileChange = (e)=>{
        setFile(e.target.files[0]);
    }
    return(
       
        <div className={styles['container']}>
            <header>
                <h1>Update Profile</h1>
                <button className='icon' onClick={closeForm}><img src='../../images/cancel.png' alt = 'close-btn'/></button>
            </header>
            <div className={styles['form-container']}>
        <form onSubmit={handleSubmit}>
          <div className={styles['form-item']}>
            <label htmlFor="first_name">
              First Name <span style={{ color: 'red' }}>*</span>
            </label>
            <input
              type="text"
              id="first_name"
              name="first_name"
              placeholder="John"
               value={firstName}
               onChange={(e)=>setFirstName(e.target.value)}
              required
            />
          </div>
          <div className={styles['form-item']}>
            <label htmlFor="last_name">
              Last Name <span style={{ color: 'red' }}>*</span>
            </label>
            <input
              type="text"
              id="last_name"
              name="last_name"
              placeholder="Doe"
              value={lastName}
              onChange={(e)=>setLastName(e.target.value)}
              required
            />
          </div>
          <div className = {styles['form-item']}>
            <label htmlFor="image">Update Profile Photo</label>
            <input type="file" id='image' size='60' name='postImage' onChange={handleFileChange} />
          </div>
          <button type="submit" className={styles['form-btn']}>
            Update 
          </button>
          {errors.length>0 && errors.map(err=> <li key={err.msg} className={styles['error']}>{err.msg} </li>)}
        </form>
      </div>
            

        </div>
    )
}