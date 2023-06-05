/* eslint-disable @next/next/no-img-element */
import React,{useState,useEffect} from "react";
import styles from '../styles/SinglePost.module.css'
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";
import formatDate from "@/utils/formatDate";

export default function SinglePost({post,user,isLike}){
    const [comments,setComments] = useState([]);
    const [sameUser, setSameUser] = useState('false');
    const [likes, setLikes] = useState([]);
    const [showLikes,setShowLikes] = useState(false);
    const router = useRouter();
    let init;
    if(typeof post.author ==='object'){
        init = post.author
    }
    else{
        init = user;
    }
    const [poster,setPoster] = useState(init);
    const author = user?user:post.author;
    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem('user'));
        setSameUser(false);
        if(author._id === user){
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
        const authorid = typeof post.author === 'object'?post.author._id : post.author;
        axios.get(`https://socialnetwork-api-r5ve.onrender.com/api/users/${authorid}`,config)
            .then((res)=>{
                setPoster(res.data.user);
            })
            .catch(console.log);
    },[sameUser,author._id, isLike, post.author, post._id])

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
    const displayLikes = (e)=>{
        e.stopPropagation();
         const token = JSON.parse(localStorage.getItem('token'));
        const config = {
            headers: { Authorization: `Bearer ${token}`}
        }
        axios.get(`https://socialnetwork-api-r5ve.onrender.com/api/posts/${post._id}`,config)
        .then((res)=>{
            setLikes(res.data.post.likes);
            setShowLikes(true);
        })
        .catch(console.log);

    }
    return (
        <div className={styles['container']}  >
          <div className={styles['author']}>
            <button className='icon'><img src={(poster && poster.image_url) || '/images/profile.png'} alt={poster.first_name}/></button>
            <Link href={`/users/${poster._id}`}>{`${poster.first_name} ${poster.last_name}`}</Link>
        
          </div>
          <div className={styles['content']} onClick={showPost}>
            {post.content} 
          </div>
          <div className={styles['post-img']}>
                {post.image && <img src ={post.image} alt='post-image'/> }
          </div>
          <div className={styles['details']}>
                <button className='icon' onClick={handleLike} style ={{color: color}}>
                    <img src='../../images/like.png' alt='likes'/> <p onClick={displayLikes} style={{fontSize:'1.1rem',alignSelf:'center'}} >{post.likes.length}</p>
                </button>
                <p>{formatDate(new Date(post.date)) }</p>
                <button className='icon'><img src='../../images/comment.png' alt='comments'/> {comments.length}</button>
                {sameUser && <button className='icon' onClick={deletePost}><img src='../../images/delete.png' alt='delete'/> </button>}
          </div>
          {showLikes && <div className={styles['likes-users']}>
                <h2>Likes</h2>
                <ul>
                     {likes.map(like=><li key={like._id} onClick={(e)=>setShowLikes(false)}><Link href={`/users/${like._id}`}>{like.first_name + ' ' + like.last_name}</Link></li>)}
                </ul> 
                <button className='icon' onClick={(e)=>{setShowLikes(false)}}><img src='../../images/cancel.png' alt = 'close-btn'/></button>
            </div>
            }
        </div>
    )
}