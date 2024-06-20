/**
 * Author: Bernice Templeman
 * Date: 6/15/2024
 * File Name: app.js
 * Description: the in-n-out-books application
 */

// set up an Express application by adding the following require statements:
const express = require("express");
const bcrypt = require("bcryptjs");
const createError = require("http-errors");
const books = require("../database/books");

//Create an express application by defining a variable and assigning it the Express module.
const app = express(); // Creates an Express application

// parse incoming requests with JSON payloads
app.use(express.json());

// parse incoming requests with urlencoded payloads
app.use(express.urlencoded({ extended: true }));

//Add a GET route for the root URL (“/”). This route should return an HTML response with a fully designed landing page that represents the “in-n-out-books” project.
app.get("/", async (req, res, next) => {
  // HTML content for the landing page
  const html = `
<html>
  <head>
    <title>In-N-Out-Books</title>
    <style>
      body,
      h1,
      h2,
      h3 {
        margin: 0;
        padding: 0;
        border: 0;
      }
      body {
        background: #00b5e2;
        color: #000;
        margin: 1.25rem;
        font-size: 1.25rem;
      }
      h1,
      h2,
      h3 {
        color: #ffffff;
        font-family: "Emblema One", cursive;
      }
      h1,
      h2 {
        text-align: center;
      }
      h3 {
        color: #ffffff;
      }

      .container {
        width: 50%;
        margin: 0 auto;
        font-family: "Lora", serif;
      }
      .book {
        border: 1px solid #ffff;
        padding: 1rem;
        margin: 1rem 0;
      }
      .book h3 {
        margin-top: 0;
      }
      main a {
        color: #000;
        text-decoration: none;
      }
      main a:hover {
        color: #ffff00;
        text-decoration: underline;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <header>
        <h1>In-N-Out-Books</h1>
        <h2>Discover and Share Amazing Books</h2>
      </header>

      <br />

      <main>
        <p>
          The idea of the “In-N-Out-Books” was inspired by the love of books and
          the desire to create a platform where uses can manage their own
          collection of books. Whether you are an avid reader who wants to keep
          track of the books you’ve read, or a book club organizer who needs to
          manage a shared collection, “In-N-Out-Books” is designed to cater to
          your needs.
        </p>
      </main>
    </div>
  </body>
</html>
`; // end HTML content for the landing page
  res.send(html); // Sends the HTML content to the client
});

// add a get route: sets up an asynchronous GET endpoint at the path /api/books.
app.get("/api/books", async (req, res, next) => {
  try {
    //retrieves all books from the books.js module.
    //The await keyword is used to wait for the promise returned by the books.find() to resolve
    const allBooks = await books.find();
    console.log("All Books: ", allBooks); // Logs all books

    // This sends the retrieved books back to the client as the response of the GET request.
    res.send(allBooks); // Sends response with all books
  } catch (err) {
    //The catch block handles any errors that occur during the execution of the try block.
    //It logs the error message to stdout and passes the error to the next middleware function in the stack.
    console.error("Error: ", err.message); // Logs error message
    next(err); // Passes error to the next middleware
  }
});

// add a get route: define a GET endpoint at /api/books/:id in our Express application.
// This endpoint retrieves a specific book by its ID from our mock database and sends it back to the client
app.get("/api/books/:id", async (req, res, next) => {
  try {
    let { id } = req.params; // destructing the id property from the req.params object
    id = parseInt(id); // parseInt() function to parse the string value into a numerical one.
    if (isNaN(id)) {
      // error handling to check if the id is not a number and throwing a 400 error if it is not with an error message.
      return next(createError(400, "Input must be a number"));
    }
    // fetches the book with the specified ID from the mock database.
    // The await keyword is used to pause execution until the promise returned by the findOne() method is resolved.
    // req.params.id is used to retrieve the value being passed to the endpoint.
    const book = await books.findOne({ id: id }); // check if the id variable is NaN (not a number). parseInt() function wil return NaN if the string value cannot be converted to a numerical one.
    console.log("Book: ", book);

    // sends the retrieved book back to the client as the response to the GET request.
    res.send(book);
  } catch (err) {
    console.error("Error: ", err.message);
    next(err);
  }
});

// Add middleware functions to handle 404 and 500 errors.
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// In the 500-error middleware, return a JSON response with the error details. Include the error stack only if the application is running in development mode.
// error handler
app.use(function (err, req, res, next) {
  res.status(err.status || 500);

  res.json({
    type: "error",
    status: err.status,
    message: err.message,
    stack: req.app.get("env") === "development" ? err.stack : undefined,
  });
});

//Export the Express application from the app.js file.
module.exports = app;
