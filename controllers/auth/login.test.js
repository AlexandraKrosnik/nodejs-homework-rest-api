const gravatar = require("gravatar");
const mongoose = require("mongoose");
const request = require("supertest");
require("dotenv").config();

const app = require("../../app");
const { User } = require("../../models");

const { DB_HOST_TEST, PORT = 3000 } = process.env;

describe("test auth routes", () => {
  let server;
  beforeAll(() => (server = app.listen(PORT)));
  afterAll(() => server.close());

  beforeEach((done) => {
    mongoose.connect(DB_HOST_TEST).then(() => done());
  });

  afterEach((done) => {
    User.collection.drop(() => {
      mongoose.connection.close(() => done());
    });
  });

  test("test register route", async () => {
    const newUser = new User({
      email: "testUser@gmail.com",
      password: "testuser",
      avatarURL: gravatar.url(this.email),
    });

    newUser.setPassword(newUser.password);

    const signupUser = {
      email: "testUser@gmail.com",
      password: "testuser",
    };

    const response = await request(app)
      .post("/api/auth/register")
      .send(signupUser);
    const { user } = response.body.data;
    const { email, avatarURL } = user;
    expect(response.statusCode).toBe(201);
    expect(typeof email).toBe("string");
    expect(typeof avatarURL).toBe("string");
  });

  test("test login route", async () => {
    const newUser = new User({
      email: "alexandra@gmail.com",
      password: "alexandra",
      avatarURL: gravatar.url(this.email),
    });

    newUser.setPassword(newUser.password);

    const user = await User.create(newUser);

    const loginUser = {
      email: "alexandra@gmail.com",
      password: "alexandra",
    };

    const response = await request(app).post("/api/auth/login").send(loginUser);
    expect(response.statusCode).toBe(200);
    const { data } = response.body;
    const { email, subscription } = data.user;
    expect(typeof email).toBe("string");
    expect(typeof subscription).toBe("string");
    expect(data.token).toBeTruthy();
    const { token } = await User.findById(user._id);
    expect(data.token).toBe(token);
  });
});
