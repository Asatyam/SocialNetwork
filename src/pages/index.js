import styles from '@/styles/Home.module.css';
import Link from 'next/link';
import { useState, useContext, useEffect } from 'react';
import { AuthContext } from './context';
import axios from 'axios';
import { useRouter } from 'next/router';
import AddPost from '@/components/AddPost';
import PostForm from '@/components/PostForm';
// import Mutuals from '@/components/Mutuals';
import Feed from '@/components/Feed';


export default function Home() {
  const [showForm , setShowForm] = useState(false);
  const { auth, setAuth } = useContext(AuthContext);
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setAuth(false);
      router.push('/login');
    }
  }, [auth, router, setAuth]);
  return (
    <div className={styles['main']}>
      <div style={showForm ? { filter: 'blur(3px)' } : {}}>
        <AddPost setShowForm={setShowForm} />
        <Feed />
      </div>
      {showForm && (
        <div className={styles['focus-check']}>
          <PostForm setShowForm = {setShowForm}/>
        </div>
      )}
    </div>
  );
}
