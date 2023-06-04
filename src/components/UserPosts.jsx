/* eslint-disable @next/next/no-img-element */
import React,{useState,useEffect} from "react";
import styles from '../styles/SinglePost.module.css'
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";

export default function SinglePost({post}){
    const [comments,setComments] = useState([]);
    const [sameUser, setSameUser] = useState('false');
    const router = useRouter();

    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem('user'));
        setSameUser(false);
        if(post.author._id === user){
            setSameUser(true);
        }
        const token = JSON.parse(localStorage.getItem('token'));
        const config = {
            headers: { Authorization: `Bearer ${token}`}
        }
        axios.get(`https://socialnetwork-api-r5ve.onrender.com/api/posts/${post._id}/comments`,config)
        .then(res=>{
            setComments(res.data.comments);  
        }).catch(console.log);
    },[setSameUser,post._id,post.author._id])

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
        axios.patch(`https://socialnetwork-api-r5ve.onrender.com/api/posts/${post._id}/like`,{},config)
        .then((res)=>{
           setColor('red');
            
        }).catch((err)=>{
            console.log(err);
            if(err.response.status === 403){
                axios.patch(`https://socialnetwork-api-r5ve.onrender.com/api/posts/${post._id}/unlike`,{},config)
                .then((res)=>{
                    setColor('black');
                })
                .catch(console.log);
            }
        });
    }
    const deletePost = (e)=>{

         const token = JSON.parse(localStorage.getItem('token'));
        const config = {
            headers: { Authorization: `Bearer ${token}`}
        }
        const isSure = confirm('Are you sure you want to delete this comment \n' + post.content);
        if(isSure){
            axios.delete(`https://socialnetwork-api-r5ve.onrender.com/api/posts/${post._id}`,config)
        .then(console.log)
        .catch(console.log)
        }
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
                {post.image && <img src ={post.image} alt='post-image'/> }
          </div>
          <div className={styles['details']}>
                <button className='icon' onClick={handleLike} style ={{color: color}}>
                    <img src='images/like.png' alt='likes'/> {post.likes.length}
                </button>
                <p>{`${new Date(post.date).toLocaleTimeString()} ${new Date(post.date).toLocaleDateString()}` }</p>
                <button className='icon'><img src='images/comment.png' alt='comments'/> {comments.length}</button>
                {sameUser && <button className='icon' onClick={deletePost}><img src='../../images/delete.png' alt='delete'/> </button>}
          </div>
        </div>
    )
}