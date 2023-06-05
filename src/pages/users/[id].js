/* eslint-disable @next/next/no-img-element */
import React, { useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { LoadingScreen } from '@/components/Loading';
import axios from 'axios';
import styles from '../../styles/Profile.module.css';
import Link from 'next/link';
import SinglePost from '@/components/SinglePost';
import UpdateProfile from '@/components/UpdateProfile';
import ProfileCard from '@/components/ProfileCard';
import FriendStatus from '@/components/FriendStatus';

export default function Profile() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [visible, setVisible] = useState('posts');
  const [friends, setFriends] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const [requests, setRequests] = useState([]);
  const [sent, setSent] = useState([]);
  const userid = router.query.id;
  const [sameUser, setSameUser] = useState(false);
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('token'));
    if (!token) {
      router.push('/login');
    }
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const userid = router.query.id;
    axios
      .get(
        `https://socialnetwork-api-r5ve.onrender.com/api/users/${userid}`,
        config
      )
      .then((res) => {
        // setPost(res.data.post);
        setUser(res.data.user);
        setPosts(res.data.posts);
        setSameUser(res.data.sameUser);
      })
      .catch(console.log);
    axios
      .get(
        `https://socialnetwork-api-r5ve.onrender.com/api/users/${userid}/friends`,
        config
      )
      .then((res) => {
        setFriends(res.data.friends);
      })
      .catch(console.log);
    axios
      .get(
        `https://socialnetwork-api-r5ve.onrender.com/api/users/${userid}/likedPosts`,
        config
      )
      .then((res) => {
        setLikedPosts(res.data.likes);
      })
      .catch(console.log);
    if (sameUser) {
      axios
        .get(
          `https://socialnetwork-api-r5ve.onrender.com/api/users/${userid}/requests`,
          config
        )
        .then((res) => {
          setRequests(res.data.requests);
        })
        .catch(console.log);
      axios
        .get(
          `https://socialnetwork-api-r5ve.onrender.com/api/users/${userid}/sentRequests`,
          config
        )
        .then((res) => {
          setSent(res.data.sentRequests);
        })
        .catch(console.log);
    }
  }, [userid, router, sameUser]);

  if (!user) {
    return <LoadingScreen />;
  }
  const removeProfilePhoto = (e) => {
    const isSure = confirm('Are you sure you want to remove profile photo?');
    if (isSure) {
      const token = JSON.parse(localStorage.getItem('token'));
      const user = JSON.parse(localStorage.getItem('user'));
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      axios
        .patch(
          `https://socialnetwork-api-r5ve.onrender.com/api/users/${router.query.id}/deletePhoto`,
          undefined,
          config
        )
        .then(console.log)
        .catch(console.log);
    }
  };
  return (
    <div className={styles['main']}>
      {showForm && (
        <div className={styles['focus-check']}>
          <UpdateProfile user={user} setShowForm={setShowForm} />
        </div>
      )}
      <div
        className={styles['profile']}
        style={showForm ? { filter: 'blur(3px)' } : {}}
      >
        <div className={styles['cover']}>
          <img
            className={styles['cover-img']}
            src="../../images/placeholder.png"
            alt="cover-img"
          />
        </div>

        <div className={styles['info']}>
          <div className={styles['profile-img']}>
            <img
              src={user.image_url ? user.image_url : '../../images/profile.png'}
              alt="profile-img"
            />
          </div>
          <div className={styles['user-info']}>
            <h2 className={styles['profile-name']}>
              {user.first_name + ' ' + user.last_name}
            </h2>
            <p>{friends.length} friends</p>
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
              <button onClick={() => setShowForm(true)}>Update Profile</button>
              <button onClick={removeProfilePhoto}>Remove Profile Photo</button>
            </div>
          )}
          {!sameUser && (
            <div className={styles['actions']}>
              <FriendStatus account={user} />
            </div>
          )}
        </div>
        <div className={styles['tabs']}>
          <button
            className={styles['tab']}
            style={
              visible === 'posts'
                ? {
                    color: '#06b6d4',
                    borderBottom: ' 5px solid teal',
                  }
                : {}
            }
            onClick={() => setVisible('posts')}
          >
            Posts
          </button>
          <button
            className={styles['tab']}
            style={
              visible === 'friends'
                ? {
                    color: '#06b6d4',
                    borderBottom: ' 5px solid teal',
                  }
                : {}
            }
            onClick={() => setVisible('friends')}
          >
            Friends
          </button>
          <button
            className={styles['tab']}
            style={
              visible === 'likes'
                ? {
                    color: '#06b6d4',
                    borderBottom: ' 5px solid teal',
                  }
                : {}
            }
            onClick={() => setVisible('likes')}
          >
            Likes
          </button>
          {sameUser && (
            <button
              className={styles['tab']}
              onClick={() => setVisible('received')}
              style={
                visible == 'received'
                  ? {
                      color: '#06b6d4',
                      borderBottom: ' 5px solid teal',
                    }
                  : {}
              }
            >
              Friend Requests
            </button>
          )}
          {sameUser && (
            <button
              className={styles['tab']}
              onClick={() => setVisible('sent')}
              style={
                visible === 'sent'
                  ? {
                      color: '#06b6d4',
                      borderBottom: ' 5px solid teal',
                    }
                  : {}
              }
            >
              Sent Requests
            </button>
          )}
        </div>

        {visible === 'posts' && (
          <div className={styles['posts']}>
            {posts.length > 0
              ? posts.map((post) => (
                  <SinglePost key={post._id} post={post} user={user} />
                ))
              : 'There are no posts'}
          </div>
        )}
        {visible === 'friends' && (
          <div className={styles['friends']}>
            {friends.length > 0
              ? friends.map((friend) => {
                  return <ProfileCard key={friend._id} account={friend} />;
                })
              : 'There are no Friends'}
          </div>
        )}
        {visible === 'likes' && (
          <div className={styles['posts']}>
            {likedPosts.length > 0
              ? likedPosts.map((liked) => {
                  return (
                    <SinglePost key={liked._id} post={liked} user={user} isLike = {true} />
                  );
                })
              : 'There are no liked posts'}
          </div>
        )}
        {visible === 'received' && (
          <div className={styles['friends']}>
            {requests.length > 0
              ? requests.map((request) => {
                  return <ProfileCard key={request._id} account={request} />;
                })
              : 'There are no Requests'}
          </div>
        )}
        {visible === 'sent' && (
          <div className={styles['friends']}>
            {sent.length > 0
              ? sent.map((sent) => {
                  return <ProfileCard key={sent._id} account={sent} />;
                })
              : 'You have not sent any requests'}
          </div>
        )}
      </div>
    </div>
  );
}
