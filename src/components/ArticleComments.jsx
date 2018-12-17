import React, { Component } from 'react';
import * as api from './api';
import { navigate } from '@reach/router';
import CommentCard from './CommentCard';
import PostNewComment from './PostNewComment';

class ArticleComments extends Component {
  state = {
    comments: null,
    isLoading: true,
    query: 'created_at',
    directon: 'sort_descending=true',
    commentactions: '',
    isPosted: false,
    page: 0,
    moreComments: false
  };
  render() {
    if (this.state.isLoading) {
      return <h1>LOADING</h1>;
    } else {
      return (
        <div className="commentlist">
          <select id="query" onChange={this.handleChange}>
            <option value="created_at">Date Posted</option>
            <option value="votes">Votes</option>
          </select>
          <select id="direction" onChange={this.handleChange}>
            <option value="sort_descending=true">Descending</option>
            <option value="sort_ascending=true">Ascending</option>
          </select>
          {!this.state.comments.length ? (
            <h1>No comments yet! Why not leave one?</h1>
          ) : null}
          {this.state.comments.map((comment, index) => {
            return (
              <div key={index}>
                <CommentCard
                  user={this.props.user}
                  deleted={this.handleDelete}
                  key={comment.comment_id}
                  data={comment}
                />
              </div>
            );
          })}
          <span>Page {this.state.page + 1}</span>
          {this.state.moreComments ? (
            <button value={1} onClick={this.handlePageChange}>
              Next Page
            </button>
          ) : null}
          {this.state.page !== 0 ? (
            <button value={-1} onClick={this.handlePageChange}>
              Previous Page
            </button>
          ) : null}
          <PostNewComment
            posted={this.handlePost}
            data={this.props.article_id}
            user={this.props.user}
          />
        </div>
      );
    }
  }

  getArticleComments() {
    api
      .fetchArticleComments(
        this.props.article_id,
        this.state.query,
        this.state.direction,
        this.state.page
      )
      .then(comments => {
        this.setState({
          comments: comments,
          isLoading: false,
          isPosted: false,
          commentactions: ''
        });
      })
      .then(() => {
        api
          .fetchArticleComments(
            this.props.article_id,
            this.state.query,
            this.state.direction,
            this.state.page + 1
          )
          .then(data => {
            if (data.length) {
              this.setState({ moreComments: true });
            } else {
              this.setState({ moreComments: false });
            }
          });
      })
      .catch(err => {
        navigate('/error', {
          replace: true,
          state: {
            code: err.code,
            message: err.message,
            from: '/articles/:article_id/comments'
          }
        });
      });
  }
  componentDidMount() {
    window.scrollTo(0, 0);
    this.getArticleComments();
  }
  componentDidUpdate(prevProps, prevState) {
    const updateOnMethods = [
      'isLoading',
      'query',
      'direction',
      'page',
      'isPosted',
      'commentactions'
    ];
    const updateOnMethodChecker = element => {
      return prevState[element] !== this.state[element];
    };
    if (updateOnMethods.some(updateOnMethodChecker)) {
      this.getArticleComments();
    }
  }

  handleChange = event => {
    const { value, id } = event.target;
    this.setState({ [id]: value });
  };
  handlePost = posted => {
    this.setState({ isPosted: posted });
  };
  handleDelete = deleted => {
    this.setState({ commentactions: deleted });
  };
  handlePageChange = event => {
    const { value } = event.target;
    const newVal = this.state.page + Number(value);
    this.setState({ page: newVal });
  };
}
export default ArticleComments;
