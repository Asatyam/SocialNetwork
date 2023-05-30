import React, { useContext, useEffect,useState } from "react";
import styles from '../styles/Feed.module.css';
import axios from "axios";
import SinglePost from "./SinglePost";
import useSWR from 'swr';

export default function Feed(){
    
    const [feed, setFeed] = useState([])
    const [updated, setUpdated] = useState(false);
    useEffect(()=>{
        const token = JSON.parse(localStorage.getItem('token'));
        const config = {
            headers: {Authorization: `Bearer ${token}`}
        }
        axios.get('http://localhost:4000/api/feed',config)
        .then((res)=>{
            setFeed(res.data.friendsPosts);
            setUpdated(false);
            // console.log(feed);
        })
        .catch(console.log);    
    },[feed,updated])

    return (
        <div className={styles['container']}>
           { feed.length>0?feed.map(post=><SinglePost key = {post._id} post = {post} setUpdated = {setUpdated}/>):'There are no posts'}
        </div>
    )
}

