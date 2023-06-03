import React, { useEffect } from 'react';
import { useState, useContext } from 'react';
import axios from 'axios';
import styles from '../styles/Signup.module.css';
import { Roboto } from 'next/font/google';
import { useRouter } from 'next/router';
const roboto = Roboto({ subsets: ['latin'], weight: '500' });
const robotoBold = Roboto({ subsets: ['latin'], weight: '900' });
import Link from 'next/link';
export default function Signup() {
    const initial = {
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        confirm: '',
    }
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState();

  const router = useRouter();
  /*To do Client side validation */
  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      router.replace('/');
    }
  });
 

  const handleSubmit = (e) => {
    console.log(e);
  };

  return (
    <div className={`${styles['main']} ${roboto.className}`}>
      <div className={styles['text-box']}>
        <h1 className={robotoBold.className}>Odinbook</h1>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. </p>
      </div>
      <div className={styles['form-container']}>
        <form>
          <div className={styles['form-item']}>
            <label htmlFor="first_name">
              First Name <span style={{ color: 'red' }}>*</span>
            </label>
            <input
              type="text"
              id="first_name"
              name="first_name"
              placeholder="John"
              required
            />
          </div>
          <div className={styles['form-item']}>
            <label htmlFor="last_name">
              Last Name <span style={{ color: 'red' }}>*</span>
            </label>
            <input
              type="text"
              id="last_name"
              name="last_name"
              placeholder="Doe"
              required
            />
          </div>
          <div className={styles['form-item']}>
            <label htmlFor="email">
              Email <span style={{ color: 'red' }}>*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="abc123@email.com"
              required
            />
          </div>

          <div className={styles['form-item']}>
            <label htmlFor="password">
              Password <span style={{ color: 'red' }}>*</span>
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Abcd@123"
              minLength="8"
              required
            />
          </div>
          <div className={styles['form-item']}>
            <label htmlFor="confirm">
              Confirm Password <span style={{ color: 'red' }}>*</span>
            </label>
            <input
              type="password"
              id="confirm"
              name="confirm"
              placeholder="Abcd@123"
              minLength="8"
              required
            />
          </div>
          <button type="submit" className={styles['form-btn']}>
            Sign Up
          </button>
          {errors && <p className={styles['error']}>{errors.message} </p>}
        </form>
        <p>
          Already have an account?{' '}
          <Link href="/login" style={{ color: 'navy', fontWeight: '600' }}>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
