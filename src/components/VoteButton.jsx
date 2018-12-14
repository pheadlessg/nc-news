import React from 'react';
import * as api from './api';

const VoteButton = ({ data, newVotes }) => {
  const { id, loc, uservote } = data;
  const vote = (id, loc, value) => {
    let thisUserVote = 0;
    let voteVal;
    if (value === 'up') {
      voteVal = 1;
      thisUserVote++;
    }
    if (value === 'down') {
      voteVal = -1;
      thisUserVote--;
    }
    api.updateVotes(id, loc, voteVal).then(data => {
      newVotes(data, thisUserVote);
    });
  };

  if (uservote === 1) {
    return (
      <div>
        <button value="down" onClick={e => vote(id, loc, e.target.value)}>
          Down
        </button>
      </div>
    );
  }
  if (uservote === -1) {
    return (
      <div>
        <button value="up" onClick={e => vote(id, loc, e.target.value)}>
          Up
        </button>
      </div>
    );
  } else {
    return (
      <div>
        <button value="up" onClick={e => vote(id, loc, e.target.value)}>
          Up
        </button>
        <button value="down" onClick={e => vote(id, loc, e.target.value)}>
          Down
        </button>
      </div>
    );
  }
};

export default VoteButton;
