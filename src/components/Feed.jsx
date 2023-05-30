import React, { useEffect,useState } from "react";
import styles from '../styles/Feed.module.css';
import axios from "axios";
import SinglePost from "./SinglePost";

export default function Feed(){
    
    const [feed, setFeed] = useState([]);

    useEffect(()=>{
        const token = JSON.parse(localStorage.getItem('token'));
        const config = {
            headers: {Authorization: `Bearer ${token}`}
        }
        axios.get('http://localhost:4000/api/feed',config)
        .then((res)=>{
            setFeed(res.data.friendsPosts);
            // console.log(feed);
        })
        .catch(console.log);    
    },[feed])

    return (
        <div className={styles['container']}>
           { feed.length>0?<SinglePost post = {feed[0]}/>:'There are no posts'}
        </div>
    )
}

