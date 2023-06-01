/* eslint-disable @next/next/no-img-element */
import React, { useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { LoadingScreen } from '@/components/Loading';
import axios from 'axios';
import styles from '../../styles/Profile.module.css'
import Link from 'next/link';
import SinglePost from '@/components/SinglePost';

export default function Profile() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [changeProfile, setChangeProfile] = useState(false);
  const userid = router.query.id;
  const [sameUser,setSameUser] = useState(false);
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('token'));
    if (!token) {
      router.push('/login');
    }
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const userid = router.query.id;
    console.log(userid);
    if(!user){
        console.log('Done');
    axios
      .get(`http://localhost:4000/api/users/${userid}`, config)
      .then((res) => {
        // setPost(res.data.post);
        console.log(res.data);
        setUser(res.data.user);
        setPosts(res.data.posts);
        setSameUser(res.data.sameUser);
      })
      .catch(console.log);
    }
    });

  if (!user) {
    return <LoadingScreen />;
  }
  return (
    <div className={styles['profile']}>
      {changeProfile && (
        <div className={styles['update-profile-photo']}>
          <input type="file" Change profile photo />
        </div>
      )}
      <div className={styles['cover']}>
        <img
          className={styles['cover-img']}
          src="../../images/placeholder.png"
          alt="cover-img"
        />
      </div>
      <div className={styles['info']}>
        <div className={styles['profile-img']}>
          <img src="../../images/profile.png" alt="profile-img" />
          {sameUser && (
            <button className="icon">
              <img src="/images/edit.png" alt="edit-profile-icon" />
              <img src="/images/delete.png" alt="delete-profile-icon" />
            </button>
          )}
        </div>
        <div className={styles['user-info']}>
          <h2 className={styles['profile-name']}>
            {user.first_name + ' ' + user.last_name}
          </h2>
          <p>{user.friends.length} friends</p>
          <button className="icon">
            <img src="/images/profile.png" alt="profile-icon" />
            <img src="/images/profile.png" alt="profile-icon" />
            <img src="/images/profile.png" alt="profile-icon" />
            <img src="/images/profile.png" alt="profile-icon" />
            <img src="/images/profile.png" alt="profile-icon" />
            <img src="/images/profile.png" alt="profile-icon" />
            <img src="/images/profile.png" alt="profile-icon" />
          </button>
        </div>
        {sameUser && (
          <div className={styles['actions']}>
            <button>Add to your story</button>
            <button>Update Profile</button>
          </div>
        )}
        {!sameUser && (
          <div className={styles['actions']}>
            <button>Add friends</button>
            <button>Message</button>
          </div>
        )}
      </div>
      {posts.length > 0
        ? posts.map((post) => <SinglePost key={post._id} post={post} user = {user} />)
        : 'There are no posts'}
    </div>
  );
}
