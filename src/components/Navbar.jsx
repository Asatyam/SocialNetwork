/* eslint-disable @next/next/no-img-element */
import React, { useContext, useEffect, useRef } from "react";
import { useState } from "react";
import styles from '../styles/Navbar.module.css'
import Link from "next/link";
import axios from "axios";
import { AuthContext } from "@/pages/context";
import { useRouter } from "next/router";



export default function Navbar(){


    const [search, setSearch] = useState('');
    const [users,setUsers] = useState([]);
    const {setAuth} = useContext(AuthContext);
    const [results,setResults] = useState([]);
    const [showResults, setShowResults] = useState(true);
    const searchRef = useRef(null);

    const router = useRouter();
    let userid;
    if(typeof window !=='undefined'){
        const user = JSON.parse(localStorage.getItem('user'));
        userid = user;
    }
    useEffect(()=>{
         const token = JSON.parse(localStorage.getItem('token'));
           const config = {
                headers: {Authorization: `Bearer ${token}`}
           }
        axios.get('https://socialnetwork-api-r5ve.onrender.com/api/users',config)
        .then((res)=>{
            setUsers(res.data.users);
        }) 
        .catch(console.log);

        
    },[])
    const searchUsers = (e)=>{
        setSearch(e.target.value);
        setShowResults(true);
        setResults((r)=>[]);
        if(e.target.value.length>0){
            for(let i=0;i<users.length;i++){
                const searchValue =  e.target.value.toLowerCase();
                const first_name = users[i].first_name.toLowerCase();
                const last_name = users[i].last_name.toLowerCase();
                const condition1 = first_name.includes(searchValue);
                const condition2 = last_name.includes(searchValue);
                if(condition1 || condition2){
                    setResults(r=>[...r,users[i]])
                }
            }
        }
       
    }
    const handleLogout = (e)=>{
        const token = JSON.parse(localStorage.getItem('token'));
           const config = {
                headers: {Authorization: `Bearer ${token}`}
           }
           localStorage.clear();
           setAuth(false);
           router.push('/login');
        axios.post('https://socialnetwork-api-r5ve.onrender.com/api/logout',config)
        .catch(console.log);
    }

    
    if(typeof window !=='undefined')
    {
    document.addEventListener('click',(evt)=>{
        if(showResults && searchRef.current){
            const isClickInside = searchRef.current.contains(evt.target);
            if(!isClickInside){
                setShowResults(false);
            }
        }
    })
    }
    return(
            <nav  className={styles['main-nav']}>
                <h1><Link href = '/'>LetsTalk</Link></h1>
                <div className={styles['search']}>
                    <div className={styles['search-box']}>
                         <input type="search" name='search' value={search} onChange={searchUsers} placeholder="Search"/>
                   </div>
                    {results.length>0 && showResults && <div className={styles['search-results']} ref={searchRef}>
                    {results.map(
                    result=>(
                         <p key={result._id}>
                            <Link href={`users/${result._id}`}>{result.first_name + ' ' + result.last_name}</Link>
                        </p>
                    ))}
                </div>
                }
                </div>
                <nav className = {styles['small-nav']}>
                    <button className='icon'><img src="/images/chat.png" alt = "Chat-icon"/></button>
                    <button className = 'icon' onClick={handleLogout}><img src="/images/logout.png" alt = "logout-icon"/></button>
                    <button className = 'icon'><Link href = {`/users/${userid}`}><img src="/images/profile.png" alt = "profile-icon"/></Link></button>
                </nav>
              
            </nav>
    )
}