import React,{useState,useContext, useEffect} from "react";
import { useRouter } from "next/router";
import { LoadingScreen } from "@/components/Loading";
import axios from "axios";
import PostDetail from "@/components/PostDetail";
import Comments from "@/components/Comments";

export default function Posts(){

    const router = useRouter();
    const [post,setPost] = useState(null);
    const [comments,setComments] = useState(null);
    useEffect(()=>{
        const token = JSON.parse(localStorage.getItem('token'));
        if(!token){
            router.push('/login');
        }
         const config = {
                headers: {Authorization: `Bearer ${token}`}
           }
        const postid = router.query.id;
        axios.get(`http://localhost:4000/api/posts/${postid}`,config)
        .then((res)=>{
            setPost(res.data.post);
        }).catch(console.log);
        axios.get(`http://localhost:4000/api/posts/${postid}/comments`,config)
        .then((res)=>{
            setComments(res.data.comments);
        }).catch(console.log);
    });

    if(!post){
        return <LoadingScreen/>
    }
    return (
        <div style = {{backgroundColor: '#082f49',color: 'white', minHeight: '100vh'}}>
            <PostDetail post = {post}/>
            <Comments comments={comments} post={post}/>
        </div>
    )

    

}
