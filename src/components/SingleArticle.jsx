import React, { Component } from 'react';
import * as api from './api';
import { Link, navigate } from '@reach/router';
import VoteButton from './VoteButton';
import DeleteButton from './DeleteButton';
import ArticleComments from './ArticleComments';

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
    uservote: 0,
    showComments: false,
    firstRun: false
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
          {this.state.showComments ? (
            <>
              <button onClick={this.handleShowComments}>Hide Comments</button>
              <ArticleComments
                article_id={this.props.article_id}
                user={this.props.user}
              />
            </>
          ) : (
            <>
              <p className="commentcount">Comments: {comment_count}</p>
              <button onClick={this.handleShowComments}>Show Comments</button>
            </>
          )}
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
    if (!this.state.firstRun) {
      window.scrollTo(0, 0);
      this.setState({ firstRun: true });
    }
    this.getSingleArticle();
    this.setState({ isLoading: false });
  }
  componentDidUpdate(prevProps, prevState) {
    const updateOnMethods = ['votes', 'showComments', 'comment_count'];
    const updateOnMethodChecker = element => {
      return prevState[element] !== this.state[element];
    };
    if (updateOnMethods.some(updateOnMethodChecker)) {
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
  handleShowComments = () => {
    this.setState({ showComments: !this.state.showComments });
  };
}

export default SingleArticle;
