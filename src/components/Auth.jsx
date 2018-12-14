import React from 'react';
import Login from './Login';

function Auth({ children, user, setUser }) {
  if (user) {
    return children;
  } else {
    return (
      <>
        <Login setUser={setUser}>Login!</Login>
      </>
    );
  }
}

export default Auth;
