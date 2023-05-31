import React from "react";
// import SingleComment from './SingleComment';
import styles from '../styles/Comments.module.css';
import CommentForm from "./CommentForm";

export default function Comments({comments,post}){

    return(
        <div className={styles['comments']}>
            <CommentForm post={post}/>
            {/* {comments.length>0 ? comments.map(comment=><SingleComment key = {comment._id} comment={comment}/>): 'There are no comments' } */}
        </div>
    )
}
