/* eslint-disable @next/next/no-img-element */
import React,{useState} from "react";
import Link from "next/link";
import styles from "../styles/PostDetail.module.css"
export default function PostDetail({post}){


    return (
        <div className={styles['container']} >
          <div className={styles['author']}>
            <button className='icon'><img src={post.author.image_url || '/images/profile.png'} alt={post.author.full_name}/></button>
            <Link href={`/users/${post.author._id}`}>{`${post.author.first_name} ${post.author.last_name}`}</Link>
          </div>
          <div className={styles['content']}>
            {post.content} 
          </div>
          <div className={styles['post-img']}>
                {post.image? <img src ={post.image} alt='post-image'/>:<img src ='/images/placeholder.png' alt='post-image'/> }
          </div>
          <div className={styles['details']}>
                <button className='icon'>
                    <img src='../../images/like.png' alt='likes'/> {post.likes.length}
                </button>
                <p>{`${new Date(post.date).toLocaleTimeString()} ${new Date(post.date).toDateString()}` }</p>
                <button className='icon'><img src='../../images/comment.png' alt='comments'/> {post.comments.length}</button>
          </div>
        </div>
    )

}
