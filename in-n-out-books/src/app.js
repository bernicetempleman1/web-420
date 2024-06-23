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
<html lang="en">
  <head>
    <title>In-N-Out-Books: Template</title>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link
      href="https://fonts.googleapis.com/css2?family=Emblema+One&family=Lora&display=swap"
      rel="stylesheet"
    />
    <style>
      /* CSS Reset */
      body,
      header,
      nav,
      main,
      footer,
      img,
      h1,
      h3,
      ul,
      aside,
      figure,
      figcaption,
      video {
        margin: 0;
        padding: 0;
        border: 0;
      }

      /* Style rules for body and images */
      body {
        background-color: #f6eee4;
      }

      img,
      video {
        max-width: 100%;
        display: block;
      }

      /* Style rules for mobile viewport*/
      .mobile,
      .mobile-tablet {
        display: block;
      }

      /* Style rules to show mobile class and hide tab-desk class */
      .tab-desk,
      .desktop {
        display: block;
      }

      /* Style  rules for header area */
      .mobile h1,
      .mobile h3 {
        padding: 2%;
        text-align: center;
      }

      .mobile h1 {
        font-family: "Emblema One";
      }

      .mobile h3 {
        font-family: "Lora", serif;
      }

      h1,
      h3 {
        padding: 2%;
        text-align: center;
      }

      h1 {
        font-family: "Emblema One";
      }

      h3 {
        font-family: "Lora", serif;
      }

      /* Style rules for navigation area */
      nav {
        background: #2a1f14;
      }

      nav ul {
        list-style: none;
        text-align: center;
      }

      nav li {
        display: block;
        font-size: 1.5em;
        font-family: Geneva, Arial, sans-serif;
        font-weight: bold;
      }

      nav li a {
        display: block;
        color: #f6eee4;
        padding: 0.5em 2em;
        text-decoration: none;
        border-top: 0.5px solid #f6eee4;
      }

      nav a:hover {
        color: #ffff00;
        text-decoration: underline;
      }

      /* Style rules for main content */
      main {
        padding: 2%;
        font-family: "Lora", serif;
      }

      main p {
        font-size: 1.25em;
      }

      main h3 {
        padding-top: 2%;
      }

      main ul {
        list-style: square;
      }

      .link {
        color: #4d3319;
        text-decoration: none;
        font-weight: bold;
        font-style: italic;
      }
      /* Style rules for footer content */
      footer {
        text-align: center;
        font-size: 0.85em;
        background-color: #2a1f14;
        color: #f6eee4;
        padding: 1% 0%;
      }

      /* Media Query for Tablet Viewport */
      @media screen and (min-width: 620px), print {
        /* Tablet Viewport: Show tab-desk class, hide mobile class */
        .tab-desk {
          display: block;
        }

        .mobile {
          display: none;
        }

        /* Tablet Viewport: Style rules for nav area */
        nav li {
          border-top: none;
          display: inline-block;
          font-size: 1.25em;
        }

        nav li a {
          padding: 0.5em;
        }
      }

      /* Media Query for Desktop Viewport */
      @media screen and (min-width: 1000px), print {
        /* Desktop Viewport: Show desktop class, hide mobile-tablet class */

        .desktop {
          display: block;
        }

        .mobile-tablet {
          display: none;
        }
      }

      /* Media  Query for Large Desktop Viewports */
      @media screen and (min-width: 1921px) {
        body {
          background: linear-gradient(#f6eee4, #78593a);
        }

        #wrapper {
          width: 1920px;
          margin: 0 auto;
        }

        main {
          background-color: #f6eee4;
        }
      }

      /* Media Query for Print */
      @media print {
        body {
          background-color: white;
          color: black;
        }
      }

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
        text-align: center;
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
    <div id="wrapper">
      <!-- Use the header area for the website name or logo -->
      <header>
        <div class="tab-desk"></div>
        <div>
          <h1>In-N-Out Books</h1>
          <h3>Discover and Share Amazing Books.</h3>
        </div>
      </header>

      <!-- Use the nav area to add hyperlinks to other pages within the website-->
      <nav>
        <ul>
          <li><a href="http://localhost:3000">Home</a></li>
          <li><a href="http://localhost:3000/api/books"> All Books</a></li>
          <ul>
            <li><a href="http://localhost:3000/api/books/1">Book 1</a></li>
            <li><a href="http://localhost:3000/api/books/2">Book 2</a></li>
            <li><a href="http://localhost:3000/api/books/3">Book 3</a></li>
            <li><a href="http://localhost:3000/api/books/4">Book 4</a></li>
            <li><a href="http://localhost:3000/api/books/5">Book 5</a></li>
          </ul>
        </ul>
      </nav>

      <!-- Use the main area to add the main content to the webpage -->
      <main>
        <div id="welcome">
          <!-- 1st paragraph element: Use the first paragraph below for a welcome message and mission statement. -->
          <p>
            The idea of the “In-N-Out-Books” was inspired by the love of books
            and the desire to create a platform where uses can manage their own
            collection of books.
          </p>

          <!-- 2nd paragraph element: Use the second paragraph below for services provided. -->
          <p>
            Whether you are an avid reader who wants to keep track of the books
            you’ve read, or a book club organizer who needs to manage a shared
            collection, “In-N-Out-Books” is designed to cater to your needs.
          </p>
        </div>

        <div id="latest">

        <!-- Heading for the latest rescue -->
        <h2>Our Latest Book: Return of the King</h2>


        <!-- Paragraph element: Use the paragraph below to describe the latest book-->
        <p>Title: "The Return of the King" by author: J.R.R. Tolkien</p>

      </div>

      </main>

      <!-- Use the footer area to add webpage footer content-->
      <footer>
        <p>&copy; Copyright 2024. All Rights Reserved.</p>
      </footer>
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
