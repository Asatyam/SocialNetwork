/* eslint-disable @next/next/no-img-element */
import React,{useState,useEffect} from "react";
import axios from "axios";
import Link from "next/link";
import styles from "../styles/PostDetail.module.css"
import formatDate from "@/utils/formatDate";

export default function PostDetail({post}){

    const[comments, setComments] = useState([]);

      useEffect(()=>{
        const token = JSON.parse(localStorage.getItem('token'));
        const config = {
            headers: { Authorization: `Bearer ${token}`}
        }
        axios.get(`http://localhost:4000/api/posts/${post._id}/comments`,config)
        .then(res=>{
            setComments(res.data.comments);  
        }).catch(console.log);
    },[comments,setComments,post._id])

    const [color,setColor] = useState('black');

    useEffect(()=>{

        const user = JSON.parse(localStorage.getItem('user'));
        const isLiked = post.likes.includes(user);
        isLiked? setColor('red'):setColor('white');
    },[post.likes]);

    const handleLike = (e)=>{
        const token = JSON.parse(localStorage.getItem('token'));
        const config = {
            headers: { Authorization: `Bearer ${token}`}
        }
        axios.patch(`http://localhost:4000/api/posts/${post._id}/like`,{},config)
        .then((res)=>{
           setColor('red');
            
        }).catch((err)=>{
            console.log(err);
            if(err.response.status === 403){
                axios.patch(`http://localhost:4000/api/posts/${post._id}/unlike`,{},config)
                .then((res)=>{
                    setColor('white');
                })
                .catch((err)=>{
                    console.log(err);
                });
            }
        });
    }

    return (
        <div className={styles['container']} >
          <div className={styles['author']}>
            <button className='icon'><img src={post.author.image_url || '/images/profile.png'} alt={post.author.full_name}/></button>
            <Link href={`/users/${post.author._id}`}>{`${post.author.first_name} ${post.author.last_name}`}</Link>
          </div>
          <div className={styles['content']}>
          <div className={styles['text']}>
            {post.content} 
          </div>
          { post.image && <div className={styles['post-img']}>
                { <img src ={post.image} alt='post-image'/> }
          </div>}
          </div>
          <div className={styles['details']}>
                <button className='icon' onClick={handleLike} style={{color:color}}>
                    <img src='../../images/like.png' alt='likes'/> {post.likes.length}
                </button>
                <p>{formatDate(new Date(post.date)) }</p>
                <button className='icon'><img src='../../images/comment.png' alt='comments'/> {comments.length}</button>
          </div>
        </div>
    )

}
