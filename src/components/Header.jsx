import React from 'react';
import '../Header.css';
import { Link } from '@reach/router';
import UserCard from './UserCard';

const Header = data => {
  return (
    <header className="header">
      <span className="headertext">NC News</span>
      {data.user ? (
        <>
          <div className="headeruser">
            <UserCard data={data.user} />
            <button onClick={() => data.logout('')} className="logout">
              Log Out
            </button>
          </div>
          <Link to="/" className="homelink">
            <span>Home</span>
          </Link>
          <Link to="/topics/" className="topiclink">
            <span>Topics</span>
          </Link>
          <Link to="/postarticle/" className="postlink">
            <span>Post New Article</span>
          </Link>
        </>
      ) : (
        <h2>Please Log In</h2>
      )}
    </header>
  );
};

export default Header;
