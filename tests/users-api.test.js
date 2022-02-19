const mongoose = require("mongoose");
const supertest = require("supertest");
const helper = require("./api-test-helper");
const app = require("../app");
const testUsers = require("./test-users");

const api = supertest(app);

describe("Adding invalid user with", () => {
  describe("invalid username because", () => {
    test("no username was given, status 400 and correct error message", async () => {
      const noUsernameUser = { name: "Dario Melia", password: "1111" };
      const result = await api
        .post("/api/users")
        .send(noUsernameUser)
        .expect(400);
      const usersAtEnd = await helper.usersInDb();
      expect(result.body).toEqual({
        error: "User validation failed: username: No username was given",
      });
      expect(usersAtEnd).toHaveLength(helper.initialUsers.length);
    });

    test("username has less than 3 characters, status 400 and correct error message", async () => {
      const shortUsernameUser = {
        username: "a",
        name: "Dario Melia",
        password: "1111",
      };
      const result = await api
        .post("/api/users")
        .send(shortUsernameUser)
        .expect(400);
      const usersAtEnd = await helper.usersInDb();
      expect(result.body).toEqual({
        error: "User validation failed: username: Username must be longer",
      });
      expect(usersAtEnd).toHaveLength(helper.initialUsers.length);
    });
  });
  describe("invalid password because", () => {
    test("no password was given, status 400 and correct error message", async () => {
      const noPasswordUser = { username: "SuperTest", name: "Dario Melia" };
      const result = await api
        .post("/api/users")
        .send(noPasswordUser)
        .expect(400);
      const usersAtEnd = await helper.usersInDb();
      expect(result.body).toEqual({ error: "No password was given" });
      expect(usersAtEnd).toHaveLength(helper.initialUsers.length);
    });
    test("password is less than 3 char long, status 400 and correct error message", async () => {
      const ShortPasswordUser = {
        username: "SuperTest",
        name: "Dario Melia",
        password: "s",
      };
      const result = await api
        .post("/api/users")
        .send(ShortPasswordUser)
        .expect(400);
      const usersAtEnd = await helper.usersInDb();
      expect(result.body).toEqual({ error: "Password is too short" });
      expect(usersAtEnd).toHaveLength(helper.initialUsers.length);
    });
  });
});
beforeEach(() => helper.resetDB("user"));
afterAll(() => {
  mongoose.connection.close();
});
