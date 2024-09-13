const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

const axios = require('axios');

function getBooksList() {
  axios.get('http://localhost:5000/')
    .then(response => {
      const books = response.data; // Assuming the API returns the books in `response.data`
      console.log('Books available in the shop:', books);
      return books;
    })
    .catch(error => {
      console.error('Error fetching books:', error.message);
      // Handle error
    });
}

// Example usage
getBooksList();

function getBookDetailsByISBN(isbn) {
  axios.get(`http://your-api-url.com/isbn/${isbn}`)
    .then(response => {
      const bookDetails = response.data; // Assuming the API returns the book details in `response.data`
      console.log(`Details of the book with ISBN ${isbn}:`, bookDetails);
      return bookDetails;
    })
    .catch(error => {
      console.error(`Error fetching book details for ISBN ${isbn}:`, error.message);
      // Handle error
    });
}
// Example usage
getBookDetailsByISBN(1);

function getBooksByAuthor(author) {
  axios.get(`http://localhost:5000/author/${author}`)
    .then(response => {
      const booksByAuthor = response.data; // Assuming the API returns a list of books in `response.data`
      console.log(`Books by ${author}:`, booksByAuthor);
      return booksByAuthor;
    })
    .catch(error => {
      console.error(`Error fetching books for author ${author}:`, error.message);
      // Handle error
    });
}

// Example usage
getBooksByAuthor("Jane Austen");

function getBooksByTitle(title) {
  axios.get(`http://localhost:5000/title/${title}`)
    .then(response => {
      const booksByTitle = response.data; // Assuming the API returns a list of books in `response.data`
      console.log(`Books by ${title}:`, booksByTitle);
      return booksByTitle;
    })
    .catch(error => {
      console.error(`Error fetching books for title ${title}:`, error.message);
      // Handle error
    });
}

// Example usage
getBooksByTitle("ssnjsnjs jsnjsn");

public_users.post("/register", (req, res) => {

  const username = req.body.username;
  const password = req.body.password;
  console.log(username)
  // Check if both username and password are provided
  if (username && password) {
    // Check if the user does not already exist
    if (!isValid(username)) {
      // Add the new user to the users array
      users.push({ "username": username, "password": password });
      return res.status(200).json({ message: "User successfully registered. Now you can login" });
    } else {
      return res.status(404).json({ message: "User already exists!" });
    }
  }
  // Return error if username or password is missing
  return res.status(404).json({ message: "Unable to register user." });
});

// Get the book list available in the shop


public_users.get('/', function (req, res) {
  // const allBooks = books;
  // return res.status(300).json({
  //   message: "Yet to be implemented",
  //   allBooks: allBooks
  // });
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  const book = books[isbn];
  return res.status(300).json({
    message: "Yet to be implemented",
    book: book
  });
});

// Get book details based on author
public_users.get('/author/:author', function (req, res) {
  const author = req.params.author;

  let authorBooks = []
  const keys = Object.keys((books))

  keys.forEach(key => {
    if (author === books[key].author) {
      authorBooks.push(books[key]);
    }
  })

  return res.status(300).json({
    message: "Yet to be implemented",
    authorBooks: authorBooks
  });
});

// Get all books based on title
public_users.get('/title/:title', function (req, res) {

  const title = req.params.title;

  let book = [];
  const keys = Object.keys((books))

  keys.forEach(key => {
    if (title === books[key].title) {
      book.push(books[key]);
    }
  })

  return res.status(300).json({
    message: "Yet to be implemented",
    book: book
  });

});

//  Get book review
public_users.get('/review/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  const bookReview = books[isbn].reviews;
  return res.status(300).json({
    message: "Yet to be implemented",
    review: bookReview
  });
});

module.exports.general = public_users;
