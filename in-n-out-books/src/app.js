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
      .recipe {
        border: 1px solid #ffff;
        padding: 1rem;
        margin: 1rem 0;
      }
      .recipe h3 {
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
