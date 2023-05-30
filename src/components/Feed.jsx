import React, { useContext, useEffect,useState } from "react";
import styles from '../styles/Feed.module.css';
import axios from "axios";
import SinglePost from "./SinglePost";
import useSWR from 'swr';

export default function Feed(){
    
    const [feed, setFeed] = useState([])
    useEffect(()=>{
        const token = JSON.parse(localStorage.getItem('token'));
        const config = {
            headers: {Authorization: `Bearer ${token}`}
        }
        axios.get('http://localhost:4000/api/feed',config)
        .then((res)=>{
            setFeed(res.data.friendsPosts);
            // console.log(feed);
        },[])
        .catch(console.log);    
    })

    return (
        <div className={styles['container']}>
           { feed.length>0?feed.map(post=><SinglePost key = {post._id} post = {post} />):'There are no posts'}
        </div>
    )
}

