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
import Navbar from '@/components/Navbar';

export default function Home() {
  const { auth, setAuth, message, setMessage } = useContext(AuthContext);
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setAuth(false);
      router.push('/login');
    }
  }, [auth,router,setAuth]);
  return (
    <>
    </>
  );
}
