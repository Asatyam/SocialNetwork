import React, { useEffect,useState } from "react";
import styles from '../styles/Feed.module.css';
import axios from "axios";
import SinglePost from "./SinglePost";
import useSWR from 'swr';
import ProfileCard from "./ProfileCard";

export default function Feed(){
    
    const [feed, setFeed] = useState([])
    const [mutuals,setMutuals] =useState('');
    useEffect(()=>{
        const token = JSON.parse(localStorage.getItem('token'));
        const user = JSON.parse(localStorage.getItem('user'))

        const config = {
            headers: {Authorization: `Bearer ${token}`}
        }
        axios.get('http://localhost:4000/api/feed',config)
        .then((res)=>{
            setFeed(res.data.friendsPosts);
        },[])
        .catch(console.log);
        axios.get(`http://localhost:4000/api/users/${user}/mutuals`,config)
        .then(res=>{
            setMutuals(res.data);
        })
        .catch(console.log)
    },[])

    return (
        <div className={styles['container']}>
            <h2>People you may know</h2>
            <div className={styles['mutuals']}>
                {mutuals.length>0 && mutuals.map(mutual=>{
                    return <ProfileCard key={mutual._id} account={mutual} />
                })}
            </div>
           { feed.length>0?feed.map(post=><SinglePost key = {post._id} post = {post} />):'There are no posts'}
        </div>
    )
}

