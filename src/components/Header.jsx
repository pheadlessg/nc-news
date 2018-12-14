import React from 'react';
import { Link } from '@reach/router';
import UserCard from './UserCard';

const Header = data => {
  return (
    <header className="header">
      <span className="headertext">NC News</span>
      {data.user ? (
        <>
          <UserCard data={data.user} />
          <nav className="homelink">
            <Link to="/">Home</Link>
          </nav>
          <nav className="topiclink">
            <Link to="/topics/">Topics</Link>
          </nav>
          <nav className="postlink">
            <Link to="/postarticle/">Post New Article</Link>
          </nav>
          <button onClick={data.logout} className="logout">
            Log Out
          </button>
        </>
      ) : (
        <h2>Please Log In</h2>
      )}
    </header>
  );
};

export default Header;
