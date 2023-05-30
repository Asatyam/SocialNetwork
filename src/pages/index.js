import Head from 'next/head';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.css';
import Link from 'next/link';
import { useState, useContext, useEffect } from 'react';
import { AuthContext } from './context';
import axios from 'axios';
import { useRouter } from 'next/router';
const inter = Inter({ subsets: ['latin'] });
import AddPost from '@/components/AddPost';
import PostForm from '@/components/PostForm';
import Feed from '@/components/Feed';
// import PostForm from '@/components/PostForm';


export default function Home() {
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
      <AddPost />
      <Feed/>
    </div>
  );
}
