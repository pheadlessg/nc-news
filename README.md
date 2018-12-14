# FE2-NC-News

## Northcoders News React App

A front-end application accessing my previously built back-end database which allows users to login, view articles and comments, post and delete their own articles and comments, view and create new topics and moderate other user's content through a voting system. It also allows a rudimentary sort to allow you to view articles by author name, article title, value of votes on the article or date the article was created, as well as a sorting system for comments which allows comments to be viewed by value of votes or date comment was created.

It's basically a very, very basic old school newsgroup. Retro Reddit.

### Getting Started

Clone the the repo into your CLI

```http
npm install
```

will install all dependencies needed.

```http
npm start
```

will start the development server. This will start up React which in turn should allow you to view the working site in your browser of choice.

### Prerequisites

This project uses no particular prerequisites which will prevent you from running it with the CLI and browser of your choice.

### What now?

Now you can play around with the thing. Here's how:

Start the development server by running

```http
npm start
```

on command line.

## Run Through of App Functionality

### Login

The site should appear in your default browser and present you with a login page.

As creating new users is currently not available, several test users have been created for the purposes of demonstrating the functionality of the app. These have been presented as buttons on the login page, though entering their username in the login field will also allow a user to log in.

### Header

The header comtains four available paths - Log Out, Home, Topics and Post New Article.

Home will always redirect back to the opening page showing all articles.

Topics will take you to a page where you can view all currently available topics.

### Home Page

Following login the default home page is set to show all articles by date created in descending order.
You can re-order this page with the two drop boxes under the header to sort by Date Posted, Author, Title or Votes. You can also choose which way to sort by selecting Descending or Ascending from the second drop box.

Clicking on an article title will take you to that article.

Clicking on a topic will take you to the available articles for that topic with the same sorting functionality as the home page.

Clicking on Comments will take you to the comments for that article.

If there are more than 10 articles available, a button to show the next page will appear at the bottom of the list. If this is clicked, it will be accompanied by a button to return to the previous page. If there are no more articles to be viewed after the current list, the next page button will be removed.

### Single Article

The title, topic, author, body, date posted and current votes will be shown on the article page. If you did not post the article, you will be able to moderate it's votes by clicking 'Up' or 'Down'. Once you have voted it will disable that button, so you cannot vote more than once. If you did post the article you will not be able to moderate it's votes, but you will have the option of deleting the article by clicking the 'Delete' button. This will automatically redirect you back to the home page. Clicking on comments here will take you to the comments page for that article.

### Article Comments

The current comments for the article will be listed by date posted in descending order showing the user who posted them, the body of the comment, the date posted and the current votes. If the logged in user did not post the comment, they will be able to moderate the vote on the comment with the same functionality as moderating votes on articles. If the logged in user posted the comment, they will be able to delete it but not moderare the vote.

At the bottom of the comments there is a text field for entering a new comment. Once text is entered a post button will appear allowing the user to submit their comment. Username is provided by the logged in user, so no validation is required for it. Once the comment is posted, the comment will immediately appear on the page.

### Topics

Clicking on a topic on this page will take you to all articles currently posted in that topic, while clicking the Add New Topic button will open two text fields where you can enter a unique topic name and a short description for the topic. Once both fields have text in them, a post button will appear which will allow you to post your topic and see it appear immediately on the topic page.

### Post New Article

Post New Article will take you to a page for contributing a new article to the app. A dropbox containing the currently available topics allows you to choose which topic your article will be posted in, while title and body text boxes allow you to enter a title and content for your post. Once all fields have text in them, a post button will appear which will allow you to submit your article and redirect you to the article made. Username will be taken from the currently logged in user, so no input is required to validate this.

### Log Out

Log Out will return you to the login page so you can login as a new user, if you require.

### Can I test it?

Yes, though currently test functionality is extremely limited and no tests have been implemented.

Test on JavaScript components is currently handled by [Jest](https://jestjs.io/).

Run

```http
npm test
```

to runs the available tests on the code.

Further Front-end testing will be implemented in a future version using [Cypress](https://www.cypress.io/).

### Deployment

The app can be deployed easily using [Netlify](https://www.netlify.com/), which works well with React apps.

To deploy to your own Netlify, log in or create an account before following the next steps.

```http
npm run build
```

Will build a production version of the app ready for deployment.

```http
npm install netlify-cli -g
```

Will globally install netlify commands on your system.

```http
netlify deploy
```

Will log you into your Netlify Account in your browser. You should choose to Create & Configure a new site and add a site name if you don't want one of their super-duper-awesome randomly generated names. Select which account you would like to deploy the app to and the site will be created as a draft, which you can check over before finally committing it.

Use

```http
./build
```

as your deploy folder and deployment will be complete!

Currently this project is hosted on Netlify [here](https://practical-mirzakhani-81b282.netlify.com).

### Built With

- [React](https://reactjs.org/)
- [Axios](https://github.com/axios/axios)

And a lotta love...

### Author

Sean Fisher

### Acknowledgements

Big shout out to coffee.
