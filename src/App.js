import React, { Component } from 'react';
import './App.css';
import { Router } from '@reach/router';
import Header from './components/Header';
import Footer from './components/Footer';
import Articles from './components/Articles';
import SingleArticle from './components/SingleArticle';
import ArticleComments from './components/ArticleComments';
import Topics from './components/Topics';
import TopicArticles from './components/TopicArticles';
import Auth from './components/Auth';
import PostNewArticle from './components/PostNewArticle';
import Error from './components/Error';

class App extends Component {
  state = {
    user: ''
  };
  render() {
    return (
      <div className="App">
        <Header user={this.state.user} logout={this.logoutUser} />
        <Auth user={this.state.user} setUser={this.setUser}>
          <Router>
            <Articles path="/" />
            <Articles path="/articles" />
            <SingleArticle
              path="/articles/:article_id"
              user={this.state.user}
            />
            <ArticleComments
              path="/articles/:article_id/comments"
              user={this.state.user}
            />
            <Topics path="/topics" />
            <TopicArticles path="articles/t/:slug/" />
            <PostNewArticle path="/postarticle" user={this.state.user} />
            <Error path="/error" />
            <Error path="*" />
          </Router>
          <Footer />
        </Auth>
      </div>
    );
  }
  setUser = user => {
    this.setState({ user });
  };
  logoutUser = () => {
    this.setState({ user: '' });
  };
}

export default App;
