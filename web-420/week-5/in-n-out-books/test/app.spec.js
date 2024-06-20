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
  it("it should return an array of books", async () => {
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
  it("should return a single book", async () => {
    //{ id: 1, title: "The Fellowship of the Ring", author: "J.R.R. Tolkien" },
    const res = await request(app).get("/api/books/1");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("id", 1);
    expect(res.body).toHaveProperty("title", "The Fellowship of the Ring");
    expect(res.body).toHaveProperty("author", "J.R.R. Tolkien");
  });

  // defines a unit test that checks if the /api/books/:id endpoint returns a 400 status code when the ID is not a number.
  it("should return a 400 error if the id is not a number", async () => {
    // sends a GET request to the /api/books/:id endpoint and waits for a response using the supertest npm package
    const res = await request(app).get("/api/books/foo");
    expect(res.statusCode).toEqual(400); // status code is 400: bad request
    expect(res.body.message).toEqual("Input must be a number");
  });
});

describe("Chapter 4: API Tests", () => {
  it("should return a 201 status code when adding a new book", async () => {
    const res = await request(app).post("/api/books").send({
      id: 99,
      title: "Pragmatic APIs with NodeJS and Express",
      author: "Richard Krasso",
    });
    expect(res.statusCode).toEqual(201);
  });

  it("should return a 400 status code when adding a new book with missing title", async () => {
    const res = await request(app).post("/api/books").send({
      id: 100,
      author: "Bernice",
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toEqual("Bad Request");
  });

  it("should return a 204 status code when deleting a book", async () => {
    const res = await request(app).delete("/api/books/99");
    expect(res.statusCode).toEqual(204);
  });
});
