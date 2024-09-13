const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username) => { //returns boolean
  const user = users.filter(user => {
    return user.username = username;
  })
  if (user.length > 0) return true;
  else return false;
}

const authenticatedUser = (username, password) => { //returns boolean
  //write code to check if username and password match the one we have in records.
  const user = users.filter(user => {
    return (user.username === username && user.password === password);
  })

  if (user.length > 0) return true;
  else return false;
}

//only registered users can login
regd_users.post("/login", (req, res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;
  if (!username || !password) {
    return res.status(400).json({
      status: "failed",
      message: "please insert a valid username and password"
    });
  }
  if (authenticatedUser(username, password)) {
    let accessToken = jwt.sign({ username: username },
      'access',
      { expiresIn: 60 * 60 });

    req.session.authorization = {
      accessToken, username
    };
    return res.status(200).send("User successfully logged in");
  }
  return res.status(400).json({ message: "invalid user name or password" });
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const review = req.query.review;
  const username = req.user;
  books[isbn].reviews[username] = review;
  return res.status(300).json({
    message: "Yet to be implemented",
    books: books[isbn].reviews
  });
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
