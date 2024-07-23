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
const users = require("../database/users");

// require statement for the Ajv npm package.
const Ajv = require("ajv");
//creates a new instance of the Ajv class
const ajv = new Ajv();

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
<!DOCTYPE html>
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

        nav a:hover {
          color: #ffff00;
          text-decoration: underline;
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

      .navbar {
        overflow: hidden;
        background-color: #333;
      }

      .navbar a {
        float: left;
        font-size: 16px;
        color: white;
        text-align: center;
        padding: 14px 16px;
        text-decoration: none;
      }

      .subnav {
        float: left;
        overflow: hidden;
        color: white;
      }

      .subnav .subnavbtn {
        font-size: 16px;
        border: none;
        outline: none;
        color: white;
        padding: 14px 16px;
        background-color: inherit;
        font-family: inherit;
        margin: 0;
      }

      .navbar a:hover,
      .subnav:hover .subnavbtn {
        background-color: yellow;
        color: black;
      }

      .subnav-content {
        display: none;
        position: absolute;
        left: 0;
        background-color: yellow;
        color: white;
        width: 100%;
        z-index: 1;
      }

      .subnav-content a {
        float: left;
        color: black;
        text-decoration: none;
      }

      .subnav-content a:hover {
        background-color: #eee;
        color: black;
      }

      .subnav:hover .subnav-content {
        display: block;
      }
      .container {
        display: grid;
        place-items: center;
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

      <div class="navbar">
        <a href="">>Home</a>
        <a href="/api/books">Books</a>

        <div class="subnav">
          <button class="subnavbtn">
            Book by id <i class="fa fa-caret-down"></i>
          </button>
          <div class="subnav-content">
            <a href="/api/books/1">Book 1</a>
            <a href="/api/books/2">Book 2</a>
            <a href="/api/books/3">Book 3</a>
            <a href="/api/books/4">Book 4</a>
            <a href="/api/books/5">Book 5</a>
            <a href="/api/books/6">Book 6 (NA)</a>
            <a href="/api/books/NAN">Book NAN (NAN)</a>
          </div>
        </div>
      </div>

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
        <br />
        <br />

        <div class="container">
          <h2>Add a Book</h2>
          <form action="/api/books" method="post" target="_blank">
            <label for="id">id:</label>
            <input type="text" id="id" name="id" /><br /><br />
            <label for="title">title:</label>
            <input type="text" id="title" name="title" /><br /><br />
            <label for="author">author:</label>
            <input type="text" id="author" name="author" /><br /><br />
            <input type="submit" value="Submit" />
          </form>
        </div>
        <br />
        <br />

        <div class="container">
          <h2>Add a Book without a Title</h2>
          <form action="/api/books" method="post" target="_blank">
            <label for="id2">id:</label>
            <input type="text" id="id2" name="id" /><br /><br />
            <label for="author2">author:</label>
            <input type="text" id="author2" name="author" /><br /><br />
            <input type="submit" value="Submit" />
          </form>
        </div>
        <br />
        <br />

        <div class="container">
          <h2>Login without a password</h2>
          <form action="/api/login" method="post" target="_blank">
            <label for="email2">e-mail :</label>
            <input type="text" id="email2" name="email" /><br /><br />
            <input type="submit" value="Submit" />
          </form>
        </div>
        <br />
        <br />

        <div class="container">
          <h2>Login</h2>
          <form action="/api/login" method="post" target="_blank">
            <label for="email">e-mail :</label>
            <input type="text" id="email" name="email" /><br /><br />
            <label for="password">password:</label>
            <input type="text" id="password" name="password" /><br /><br />
            <input type="submit" value="Submit" />
          </form>
        </div>
        <br />
        <br />

        <div class="container">
          <h2>Verify Harry's Security Questions with a Bad Request</h2>
          <form
            action="/api/users/harry@hogwarts.edu/verify-security-question"
            method="post"
            target="_blank"
          >
            <label for="answer2">What is your pet's name? </label>
            <input
              type="text"
              id="answer2"
              name="securityQuestions[1][answer]"
            /><br /><br />
            <label for="question">Hedwig</label>
            <input
              type="text"
              id="question"
              name="securityQuestions[2][question]"
            /><br /><br />
            <label for="answer3">What is your mother's maiden name?</label>
            <input
              type="text"
              id="answer3"
              name="securityQuestions[3][answer]"
            /><br /><br />
            <label for="myName">What is your name</label>
            <input
              type="text"
              id="myName"
              name="securityQuestions[3][myName]"
            /><br /><br />
            <input type="submit" value="Submit" />
          </form>
        </div>
        <br />
        <br />

        <div class="container">
          <h2>Verify Harry's Security Question</h2>
          <form
            action="/api/users/harry@hogwarts.edu/verify-security-question"
            method="post"
            target="_blank"
          >
            <label for="answer">What is your pet's name? </label>
            <input
              type="text"
              id="answer"
              name="securityQuestions[1][answer]"
            /><br /><br />
            <label for="answer10">What is your favorite book?</label>
            <input
              type="text"
              id="answer10"
              name="securityQuestions[2][answer]"
            /><br /><br />
            <label for="answer11">What is your mother's maiden name</label>
            <input
              type="text"
              id="answer11"
              name="securityQuestions[3][answer]"
            /><br /><br />
            <input type="submit" value="Submit" />
          </form>
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

// Insert a book. It checks if the id, title, or author are not provided and throws an error if true.
app.post("/api/books", async (req, res, next) => {
  try {
    const newBook = req.body;
    const expectedKeys = ["id", "title", "author"];
    const receivedKeys = Object.keys(newBook);
    //checking if the book title is missing and throwing a 400 error if it is. Include a message that is appropriate for the 400 error
    if (
      !receivedKeys.every((key) => expectedKeys.includes(key)) ||
      receivedKeys.length !== expectedKeys.length
    ) {
      console.error("Bad Request: Missing keys or extra keys", receivedKeys);
      return next(createError(400, "Bad Request"));
    }
    const result = await books.insertOne(newBook);
    console.log("Result: ", result);
    res.status(201).send({ id: result.ops[0].id });
  } catch (err) {
    console.error("Error: ", err.message);
    next(err);
  }
});

// delete a book
app.delete("/api/books/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    // deletes a book with the matching id from the mock database and returns a 204-status code.
    const result = await books.deleteOne({ id: parseInt(id) });
    console.log("Result: ", result);
    res.status(204).send();
  } catch (err) {
    if (err.message === "No matching item found") {
      return next(createError(404, "Book not found"));
    }
    console.error("Error: ", err.message);
    next(err);
  }
});

// updates a book with the matching id in the mock database and returns a 204-status code.
app.put("/api/books/:id", async (req, res, next) => {
  // Use a try-catch block to handle any errors,
  try {
    let { id } = req.params;
    let book = req.body;
    id = parseInt(id);
    // Add error handling to check if the id is not a number and throw a 400 error if it is not with an applicable error message.
    if (isNaN(id)) {
      return next(createError(400, "Input must be a number"));
    }
    // including checking if the book title is missing and throwing a 400 error if it is with an applicable error message
    const expectedKeys = ["title", "author"];
    const receivedKeys = Object.keys(book);
    if (
      !receivedKeys.every((key) => expectedKeys.includes(key)) ||
      receivedKeys.length !== expectedKeys.length
    ) {
      console.error("Bad Request: Missing keys", receivedKeys);
      return next(createError(400, "Bad Request"));
    }
    const result = await books.updateOne({ id: id }, book);
    console.log("Result: ", result);
    res.status(204).send();
  } catch (err) {
    if (err.message === "No matching item found") {
      console.log("Book not found", err.message);
      return next(createError(404, "Book not found"));
    }
    console.error("Error: ", err.message);
    next(err);
  }
});

// login
app.post("/api/login", async (req, res, next) => {
  console.log("Request body: ", req.body);
  try {
    const user = req.body;
    const expectedKeys = ["email", "password"];
    const receivedKeys = Object.keys(user);
    if (
      !receivedKeys.every((key) => expectedKeys.includes(key)) ||
      receivedKeys.length !== expectedKeys.length
    ) {
      console.error("Bad Request", receivedKeys);
      return next(createError(400, "Bad Request"));
    }
    let authUser;
    try {
      authUser = await users.findOne({ email: user.email });
    } catch (err) {
      authUser = null;
    }
    if (authUser) {
      //get stored password from db
      let hashpw = authUser.password;

      // compare input pw to stored pw
      let result = bcrypt.compareSync(user.password, hashpw);
      if (result) {
        res
          .status(200)
          .send({ user: authUser, message: "Authentication successful" });
      } else {
        //password incorrect
        res.status(401).send({ user: authUser, message: "Unauthorized" });
      }
    } else {
      //user not registered
      res.status(401).send({ user: authUser, message: "Unauthorized" });
    }
  } catch (err) {
    console.error("Error: ", err);
    console.error("Error: ", err.message);
    next(err);
  }
});

//POST route to verify security questions
app.post(
  "/api/users/:email/verify-security-question",
  async (req, res, next) => {
    try {
      // creates an Ajv JSON Schema validator, which will be used to validate the request body of our POST request.
      const securityQuestionsSchema = {
        type: "object",
        properties: {
          securityQuestions: {
            type: "array",
            items: {
              type: "object",
              properties: {
                answer: { type: "string" },
              },
              required: ["answer"],
              additionalProperties: false,
            },
          },
        },
        required: ["securityQuestions"],
        additionalProperties: false,
      };

      const { email } = req.params;
      const { securityQuestions } = req.body;

      // compiles the Ajv JSON Schema and prepares it for validation
      const validate = ajv.compile(securityQuestionsSchema);
      // uses the Ajv JSON Schema to validate it against the request body.
      const valid = validate(req.body);

      // checks if the validation passed
      if (!valid) {
        // if not, it generates a 400 error object and forwards it to our middleware error handler.
        console.error("Bad Request: Invalid request body", validate.errors);
        return next(createError(400, "Bad Request"));
      }

      const user = await users.findOne({ email: email });

      // checks the saved security question answers against what’s being passed in the body of the request.
      if (
        securityQuestions[0].answer !== user.securityQuestions[0].answer ||
        securityQuestions[1].answer !== user.securityQuestions[1].answer ||
        securityQuestions[2].answer !== user.securityQuestions[2].answer
      ) {
        // If they do not match, a 401 error is generated with a message of “Unauthorized,”
        console.error("Unauthorized: Security questions do not match");
        //  which is then passed to the middleware’s errorhandler.
        return next(createError(401, "Unauthorized"));
      }

      // security questions match
      res.status(200).send({
        message: "Security questions successfully answered",
        user: user,
      });
    } catch (err) {
      console.error("Error: ", err.message);
      next(err);
    }
  }
);

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
