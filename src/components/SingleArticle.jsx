import React, { Component } from 'react';
import * as api from './api';
import { Link, navigate } from '@reach/router';
import VoteButton from './VoteButton';
import DeleteButton from './DeleteButton';

class SingleArticle extends Component {
  state = {
    title: '',
    author: '',
    body: '',
    created_at: '',
    votes: '',
    comment_count: '',
    article_id: '',
    user: {},
    isLoading: true,
    isDeleted: '',
    uservote: 0
  };
  render() {
    if (this.state.isLoading) {
      return <h1>LOADING</h1>;
    } else {
      const date = new Date(this.state.created_at).toUTCString();
      const {
        title,
        topic,
        author,
        body,
        votes,
        comment_count,
        article_id,
        uservote
      } = this.state;
      return (
        <div>
          <h2>{title}</h2>
          <h3>{topic}</h3>
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
                data={{ id: article_id, loc: 'articles' }}
                deleted={this.handleDelete}
              />
            </Link>
          ) : null}
          <Link to={`/articles/${article_id}/comments`}>
            <p className="commentcount">Comments: {comment_count}</p>
          </Link>
        </div>
      );
    }
  }
  getSingleArticle() {
    api
      .fetchSingleArticle(this.props.article_id)
      .then(data => {
        this.setState({ ...data.articles });
      })
      .catch(err => {
        navigate('/error', {
          replace: true,
          state: {
            code: err.code,
            message: err.message,
            from: '/articles'
          }
        });
      });
  }
  componentDidMount() {
    window.scrollTo(0, 0);
    this.getSingleArticle();
    this.setState({ isLoading: false });
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.votes !== this.state.votes) {
      this.getSingleArticle();
    }
  }
  handleVote = (newVotes, voteVal) => {
    this.setState({
      votes: newVotes.article.votes,
      uservote: this.state.uservote + voteVal
    });
  };
  handleDelete = deleted => {
    this.setState({ isDeleted: deleted });
  };
}

export default SingleArticle;
