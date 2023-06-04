/* eslint-disable @next/next/no-img-element */
import React,{useState,useEffect} from "react";
import styles from '../styles/SingleComment.module.css'
import Link from "next/link";
import axios from "axios";

export default function SingleComment({comment, post}){

    const [color,setColor] = useState('');
    const [sameUser, setSameUser] = useState('false');

    useEffect(()=>{

        const user = JSON.parse(localStorage.getItem('user'));
        const isLiked = comment.likes.find(like=>like._id === user );
        setSameUser(false);
        if(comment.author._id === user){
            setSameUser(true);
        }
        isLiked? setColor('red'):setColor('white');
    },[comment.likes,comment.author._id]);

    const handleLike = (e)=>{
        const token = JSON.parse(localStorage.getItem('token'));
        const config = {
            headers: { Authorization: `Bearer ${token}`}
        }
        axios.patch(`https://socialnetwork-api-r5ve.onrender.com/api/posts/${post._id}/comments/${comment._id}/like`,{},config)
        .then((res)=>{
           setColor('red');
            
        }).catch((err)=>{
            if(err.response.status === 402){
                axios.patch(`https://socialnetwork-api-r5ve.onrender.com/api/posts/${post._id}/comments/${comment._id}/unlike`,{},config)
                .then((res)=>{
                    setColor('white');
                })
                .catch(console.log);
            }
        });
    }
    const deleteComment = (e)=>{

         const token = JSON.parse(localStorage.getItem('token'));
        const config = {
            headers: { Authorization: `Bearer ${token}`}
        }
        const isSure = confirm('Are you sure you want to delete this comment \n' + comment.content);
        if(isSure){
            axios.delete(`https://socialnetwork-api-r5ve.onrender.com/api/posts/${post._id}/comments/${comment._id}`,config)
        .then(console.log)
        .catch(console.log)
        }
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
                 <button className='icon' onClick={handleLike} style = {{color: color}}>
                    <img src='../../images/like.png' alt='likes'/> <p>{comment.likes.length}</p>
                </button>
                <button className='icon'><img src='../../images/comment.png' alt='comments'/> 0</button>
                {sameUser && <button className='icon' onClick={deleteComment}><img src='../../images/delete.png' alt='delete'/> </button>}
            </div>
        </div>
    )
}