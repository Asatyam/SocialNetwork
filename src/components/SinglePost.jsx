/* eslint-disable @next/next/no-img-element */
import React,{useState,useEffect} from "react";
import styles from '../styles/SinglePost.module.css'
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";

export default function SinglePost({post}){
    const [comments,setComments] = useState([]);
    const router = useRouter();

    useEffect(()=>{
        const token = JSON.parse(localStorage.getItem('token'));
        const config = {
            headers: { Authorization: `Bearer ${token}`}
        }
        axios.get(`http://localhost:4000/api/posts/${post._id}/comments`,config)
        .then(res=>{
            setComments(res.data.comments);  
        }).catch(console.log);
    })

    const showPost = (e)=>{
        router.push(`/posts/${post._id}`);
    }

    const [color,setColor] = useState('black');

    useEffect(()=>{

        const user = JSON.parse(localStorage.getItem('user'));
        const isLiked = post.likes.includes(user);
        isLiked? setColor('red'):setColor('black');
    },[post.likes]);

    const handleLike = (e)=>{
        const token = JSON.parse(localStorage.getItem('token'));
        const config = {
            headers: { Authorization: `Bearer ${token}`}
        }
        axios.patch(`http://localhost:4000/api/posts/${post._id}/like`,{},config)
        .then((res)=>{
           setColor('red');
           console.log(res);
            
        }).catch((err)=>{
            console.log(err);
            if(err.response.status === 403){
                axios.patch(`http://localhost:4000/api/posts/${post._id}/unlike`,{},config)
                .then((res)=>{
                    setColor('black');
                })
                .catch((err)=>{
                    console.log(err);
                });
            }
        });
    }
    return (
        <div className={styles['container']}  >
          <div className={styles['author']}>
            <button className='icon'><img src={post.author.image_url || '/images/profile.png'} alt={post.author.full_name}/></button>
            <Link href={`/users/${post.author._id}`}>{`${post.author.first_name} ${post.author.last_name}`}</Link>
          </div>
          <div className={styles['content']} onClick={showPost}>
            {post.content} 
          </div>
          <div className={styles['post-img']}>
                {post.image? <img src ={post.image} alt='post-image'/>:<img src ='/images/placeholder.png' alt='post-image'/> }
          </div>
          <div className={styles['details']}>
                <button className='icon' onClick={handleLike} style ={{color: color}}>
                    <img src='images/like.png' alt='likes'/> {post.likes.length}
                </button>
                <p>{`${new Date(post.date).toLocaleTimeString()} ${new Date(post.date).toLocaleDateString()}` }</p>
                <button className='icon'><img src='images/comment.png' alt='comments'/> {comments.length}</button>
          </div>
        </div>
    )
}