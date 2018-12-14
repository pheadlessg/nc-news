import React, { Component } from 'react';
import VoteButton from './VoteButton';
import DeleteButton from './DeleteButton';
import { Link, navigate } from '@reach/router';
import * as api from './api';

class SingleComment extends Component {
  state = {
    author: '',
    body: '',
    created_at: '',
    votes: '',
    comment_id: '',
    article_id: '',
    user: {},
    isLoading: false,
    isDeleted: '',
    uservote: 0
  };
  render() {
    if (this.state.isLoading) {
      return <h1>LOADING</h1>;
    } else {
      const date = new Date(this.state.created_at).toUTCString();
      const {
        author,
        body,
        votes,
        article_id,
        uservote,
        comment_id
      } = this.state;
      return (
        <div>
          <p>Posted by: {author}</p>
          <p className="articlebodytext">{body}</p>
          <p>{date}</p>
          <p>Votes: {votes}</p>
          {this.state.author !== this.props.user ? (
            <VoteButton
              data={{ id: article_id, loc: 'articles', uservote }}
              newVotes={this.handleVote}
            />
          ) : null}
          {this.state.author === this.props.user ? (
            <Link to="/">
              <DeleteButton
                data={{ id: comment_id, loc: 'comments' }}
                deleted={this.handleDelete}
              />
            </Link>
          ) : null}
          <Link to={`/articles/${article_id}/comments`}>
            <p>Back to Comments</p>
          </Link>
        </div>
      );
    }
  }
  getSingleComment() {
    console.log(this.props);
    api
      .fetchSingleComment(this.props.article_id, this.props.comment_id)
      .then(data => {
        console.log(data);
        this.setState({ ...data.comments });
      })
      .catch(err => {
        navigate('/error', {
          replace: true,
          state: {
            code: err.code,
            message: err.message,
            from: '/singlecomment'
          }
        });
      });
  }
  componentDidMount() {
    window.scrollTo(0, 0);
    this.getSingleComment();
    this.setState({ isLoading: false });
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.votes !== this.state.votes) {
      this.getSingleComment();
    }
  }
  handleVote = (newVotes, voteVal) => {
    this.setState({
      votes: newVotes.comment.votes,
      uservote: this.state.uservote + voteVal
    });
  };
  handleDelete = deleted => {
    this.setState({ isDeleted: deleted });
  };
}

export default SingleComment;
