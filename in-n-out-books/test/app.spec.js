/*
/**
 * Author: Bernice Templeman
 * Date: 6/20/2024
 * File Name: app.spec.js
 * Description: test the in-n-out-books application
*/

// Add require statements for the app.js file and supertest.
const app = require("../src/app");
const request = require("supertest");

//Create a new test suite using Jest’s describe method:
describe("Chapter 3: API Tests", () => {
  it("Should return an array of books.", async () => {
    const res = await request(app).get("/api/books");

    // 200 status code
    expect(res.statusCode).toEqual(200);

    // The response body should be an instance of an array
    expect(res.body).toBeInstanceOf(Array);

    // Each item in the array should have the following properties: id, title, author
    res.body.forEach((book) => {
      expect(book).toHaveProperty("id");
      expect(book).toHaveProperty("title");
      expect(book).toHaveProperty("author");
    });
  });

  // This defines a unit test that checks if the /api/books/:id endpoint returns a single book.
  it("Should return a single book", async () => {
    //{ id: 1, title: "The Fellowship of the Ring", author: "J.R.R. Tolkien" },
    const res = await request(app).get("/api/books/1");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("id", 1);
    expect(res.body).toHaveProperty("title", "The Fellowship of the Ring");
    expect(res.body).toHaveProperty("author", "J.R.R. Tolkien");
  });

  // defines a unit test that checks if the /api/books/:id endpoint returns a 400 status code when the ID is not a number.
  it("Should return a 400 error if the id is not a number", async () => {
    // sends a GET request to the /api/books/:id endpoint and waits for a response using the supertest npm package
    const res = await request(app).get("/api/books/foo");
    expect(res.statusCode).toEqual(400); // status code is 400: bad request
    expect(res.body.message).toEqual("Input must be a number");
  });
});

//Create a new test suite using Jest’s describe method:
describe("Chapter 4: API Tests", () => {
  //checks if the /api/books POST endpoint returns a 201 status code for successful creations.
  it("Should return a 201-status code when adding a new book.", async () => {
    // sends a POST request to /api/recipes endpoint and waits for a response
    const res = await request(app).post("/api/books").send({
      id: 99,
      title: "Pragmatic APIs with NodeJS and Express",
      author: "Richard Krasso",
    });
    //checks if the response status code is 201, indicating the request was successful.
    expect(res.statusCode).toEqual(201);
  });

  // This defines a unit test that checks if the /api/books POST endpoint returns a 400 status code with a message of “Bad Request”.
  it("Should return a 400-status code when adding a new book with missing title.", async () => {
    const res = await request(app).post("/api/books").send({
      id: 100,
      author: "Bernice",
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toEqual("Bad Request");
  });

  //checks if the /api/books/:id endpoint returns a 204 status code when deleting book from our mock database.
  it("Should return a 204-status code when deleting a book.", async () => {
    const res = await request(app).delete("/api/books/99");
    expect(res.statusCode).toEqual(204);
  });
});

//Create a new test suite using Jest’s describe method:
describe("Chapter 5: API Tests", () => {
  // This defines a unit test that checks if the /api/books/:id PUT endpoint returns a 204 status code for successful updates.
  it("Should update a book and return a 204-status code.", async () => {
    // sends a PUT request to /api/recipes/:id endpoint and waits for a response, using the supertest npm package.
    const res = await request(app)
      .put("/api/books/1")
      .send({
        //{ id: 1, title: "The Fellowship of the Ring", author: "J.R.R. Tolkien" },
        title: "The Fellowship of the Ring",
        author: ["J.R.R. Tolkien"],
      });
    // checks if the response status code is 204, indicating the request was successful.
    expect(res.statusCode).toEqual(204);
  });

  // checks if the /api/books/:id PUT endpoint returns a 204 status code for successful updates.
  it("Should return a 400-status code when using a non-numeric id.", async () => {
    const res = await request(app).put("/api/books/foo").send({
      title: "Test Book",
      author: "test",
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toEqual("Input must be a number");
  });

  // checks if the /api/books/:id endpoint returns a 400 status code when the ID is not a number.
  it("Should return a 400-status code when updating a book with a missing title.", async () => {
    const res = await request(app).put("/api/books/1").send({
      author: "Test Author",
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toEqual("Bad Request");
  });
}); // end chapter 5

//Create a new test suite using Jest’s describe method:
describe("Chapter 6: API Tests", () => {
  // login user and return a status 200 for success
  it("should log a user in and return a 200-status with ‘Authentication successful’ message", async () => {
    const res = await request(app).post("/api/login").send({
      email: "harry@hogwarts.edu",
      password: "potter",
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual("Authentication successful");
  });

  // return a 401-status code with ‘Unauthorized’ message when logging in with incorrect credentials
  it("should return a 401-status code with ‘Unauthorized’ message when logging in with incorrect credentials.", async () => {
    const res = await request(app).post("/api/login").send({
      email: "harry@hogwarts.edu",
      password: "harry",
    });
    expect(res.statusCode).toEqual(401);
    expect(res.body.message).toEqual("Unauthorized");
  });

  // return a 400-status code with ‘Bad Request’ when missing email or password.
  it("It should return a 400-status code with ‘Bad Request’ when missing email or password.", async () => {
    const res = await request(app).post("/api/login").send({
      email: "harry@hogwarts.edu",
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toEqual("Bad Request");
    const res2 = await request(app).post("/api/login").send({
      email: "harry@hogwarts.edu",
    });
    expect(res2.statusCode).toEqual(400);
    expect(res2.body.message).toEqual("Bad Request");
  });
}); // end chapter 6

//Create a new test suite using Jest’s describe method:
describe("Chapter 7: API Tests", () => {
  // It should return a 200 status with ‘Security questions successfully answered’ message.
  it("should return a 200 status code with a message of 'Security questions successfully answered' ", async () => {
    const res = await request(app)
      .post("/api/users/harry@hogwarts.edu/verify-security-question")
      .send({
        securityQuestions: [
          { answer: "Hedwig" },
          { answer: "Quidditch Through the Ages" },
          { answer: "Evans" },
        ],
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual("Security questions successfully answered");
  });

  // It should return a 400 status code with ‘Bad Request’ message when the request body fails ajv validation.
  it("should return a 400 status code with a message of 'Bad Request' when the request body fails ajv validation", async () => {
    const res = await request(app)
      .post("/api/users/harry@hogwarts.edu/verify-security-question")
      .send({
        securityQuestions: [
          { answer: "Hedwig", question: "What is your pet's name?" },
          { answer: "Quidditch Through the Ages", myName: "Harry Potter" },
        ],
      });
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toEqual("Bad Request");
  });

  // It should return a 401 status code with ‘Unauthorized’ message when the security questions are incorrect.
  it("should return 401 status code with a message of 'Unauthorized' when the security answers are incorrect", async () => {
    const res = await request(app)
      .post("/api/users/harry@hogwarts.edu/verify-security-question")
      .send({
        securityQuestions: [
          { answer: "Flufy" },
          { answer: "Quidditch Through the Ages" },
          { answer: "Evans" },
        ],
      });
    expect(res.statusCode).toEqual(401);
    expect(res.body.message).toEqual("Unauthorized");
  });
}); // end chapter7