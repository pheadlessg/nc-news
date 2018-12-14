import React from 'react';

const Error = state => {
  return (
    <div>
      <h1>{state.location.state.message}</h1>
    </div>
  );
};

export default Error;
