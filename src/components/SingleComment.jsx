/* eslint-disable @next/next/no-img-element */
import React,{useState,useEffect} from "react";
import styles from '../styles/SingleComment.module.css'
import Link from "next/link";

export default function SingleComment({comment, post}){

    const [liked,setLiked] = useState(false);
    const handleLike = (e)=>{
        let action  = liked?'unlike':'like';
        const token = JSON.parse(localStorage.getItem('token'));
        const config = {
            headers: { Authorization: `Bearer ${token}`}
        }
        axios.patch(`http://localhost:4000/api/posts/${post._id}/${action}`,{},config)
        .then((res)=>{
            console.log(res.data);
            if(action ==='like'){
                setLiked(true);
            }else{
                setLiked(false);
            }
            
        }).catch(console.log);
    }
    return(
        <div className={styles['comment']}>
            <button className = 'icon'><img src={comment.author.image_url?comment.author.image_url:"/images/profile.png" } alt = "profile-icon"/></button>
            <div className={styles['comment-details']}>
                <div className={styles['details']}>
                    <Link href={`users/${comment.author._id}`}>{`${comment.author.first_name} ${comment.author.last_name}`}</Link>
                    <p className={styles['content']}> {comment.content}</p>
                </div>
            </div>
            <div className={styles['likes']}>
                 <button className='icon' onClick={handleLike} style ={{color: liked?'blue':'white', fontSize: liked? '1.2rem':'1rem'}}>
                    <img src='../../images/like.png' alt='likes'/> <p>{comment.likes.length}</p>
                </button>
                <button className='icon'><img src='../../images/comment.png' alt='comments'/> 0</button>
            </div>
        </div>
    )
}