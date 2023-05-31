import React from "react";
import SingleComment from './SingleComment';
import styles from '../styles/Comments.module.css';
import CommentForm from "./CommentForm";

export default function Comments({comments,post}){

    return(
        <div className={styles['container']}>
            <CommentForm post={post}/>
            <div className={styles['comments']}>
                <h1>Comments</h1>
                {(comments && comments.length>0) ? comments.map(comment=><SingleComment key = {comment._id} comment={comment} post={post}/>): <p>There are no comments </p>}
            </div>
            
        </div>
    )
}
