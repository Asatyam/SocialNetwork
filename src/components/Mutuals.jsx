import React,{useEffect, useState} from "react";
import  styles from '../styles/Mutuals.module.css'
import axios from "axios";
export default function Mutuals(){

    const [mutuals, setMutuals] = useState([]);

    useEffect(()=>{
        const token = JSON.parse(localStorage.getItem('token'));
        const user = JSON.parse(localStorage.getItem('user'));
        const config = {
            headers: {Authorization: `Bearer ${token}`}
        }
        axios.get(`https://socialnetwork-api-r5ve.onrender.com/api/users/${user}/getMutuals`,config)
        .then((res)=>{
            setMutuals(res.data);
        }).catch(console.log)
    })

    return(
        <div className={styles['container']}>
            {mutuals.length>0?<li>{mutuals[0]}</li>:'No mutuals'}
        </div>
    )
}