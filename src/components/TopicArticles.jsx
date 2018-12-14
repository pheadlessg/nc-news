import React, { Component } from 'react';
import * as api from './api';
import ArticleListCard from './ArticleListCard';

class TopicArticles extends Component {
  state = {
    topic: null,
    articles: [],
    isLoading: true,
    query: 'created_at',
    direction: 'sort_descending=true',
    page: 0,
    moreArticles: false
  };
  render() {
    if (this.state.isLoading) {
      return <h1>LOADING</h1>;
    } else {
      return (
        <>
          <h1>{this.state.topic}</h1>
          <div className="articlelist">
            <select id="query" onChange={this.handleChange}>
              <option value="created_at">Date Posted</option>
              <option value="author">Author</option>
              <option value="title">Title</option>
              <option value="votes">Votes</option>
            </select>
            <select id="direction" onChange={this.handleChange}>
              <option value="sort_descending=true">Descending</option>
              <option value="sort_ascending=true">Ascending</option>
            </select>
            {!this.state.articles.length ? (
              <h1>Nothing here! Why not post an article?</h1>
            ) : null}
            {this.state.articles.map((article, index) => {
              return (
                <div key={index}>
                  <ArticleListCard data={article} />
                </div>
              );
            })}
            <span>Page {this.state.page + 1}</span>
            {this.state.moreArticles ? (
              <button value={1} onClick={this.handlePageChange}>
                Next Page
              </button>
            ) : null}
            {this.state.page !== 0 ? (
              <button value={-1} onClick={this.handlePageChange}>
                Previous Page
              </button>
            ) : null}
          </div>
        </>
      );
    }
  }
  getArticleTopics() {
    api
      .fetchTopicArticles(
        this.props.slug,
        this.state.query,
        this.state.direction,
        this.state.page
      )
      .then(data => {
        this.setState({
          topic: this.props.slug,
          articles: data
        });
      })
      .then(() => {
        api
          .fetchTopicArticles(
            this.props.slug,
            this.state.query,
            this.state.direction,
            this.state.page + 1
          )
          .then(data => {
            if (data.length > 0) {
              this.setState({ moreArticles: true });
            } else {
              this.setState({ moreArticles: false });
            }
          });
      });
  }
  componentDidMount() {
    window.scrollTo(0, 0);
    this.getArticleTopics();
    this.setState({ isLoading: false });
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.isLoading !== this.state.isLoading) {
      this.getArticleTopics();
    }
    if (prevState.query !== this.state.query) {
      this.getArticleTopics();
    }
    if (prevState.direction !== this.state.direction) {
      this.getArticleTopics();
    }
    if (prevState.page !== this.state.page) {
      this.getArticleTopics();
    }
  }
  handleChange = event => {
    const { value, id } = event.target;
    this.setState({ [id]: value });
  };
  handlePageChange = event => {
    const { value } = event.target;
    const newVal = this.state.page + Number(value);
    this.setState({ page: newVal });
  };
}

export default TopicArticles;
