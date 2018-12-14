import React, { Component } from 'react';
import UserCard from './UserCard';
import VoteButton from './VoteButton';
import DeleteButton from './DeleteButton';

class CommentCard extends Component {
  state = {
    username: this.props.data.username,
    body: this.props.data.body,
    created_at: this.props.data.created_at,
    votes: this.props.data.votes,
    comment_id: this.props.data.comment_id,
    uservote: 0
  };
  render() {
    const {
      username,
      body,
      created_at,
      votes,
      comment_id,
      uservote
    } = this.state;
    const date = new Date(created_at).toUTCString();
    return (
      <div className="commentlink">
        <span className="commentuser">
          <UserCard data={username} />
        </span>

        <span className="commentbody">{body}</span>
        <span className="commentdate">{`${date}`}</span>
        <span className="commentvotes">Votes: {votes}</span>
        {this.props.user !== this.props.data.username ? (
          <span className="commentvotebuttons">
            <VoteButton
              data={{ id: comment_id, loc: 'comments', uservote }}
              newVotes={this.handleVote}
            />
          </span>
        ) : null}
        {this.props.user === this.props.data.username ? (
          <span className="commentdeletebutton">
            <DeleteButton
              deleted={this.props.deleted}
              data={{ id: comment_id, loc: 'comments' }}
            />
          </span>
        ) : null}
      </div>
    );
  }

  handleVote = (newVotes, voteVal) => {
    this.setState({
      votes: newVotes.comment.votes,
      uservote: this.state.uservote + voteVal
    });
  };
}

export default CommentCard;
