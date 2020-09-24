const faker = require("faker");

import { User } from "./src/models/user.model";

export const seedUsers = async () => {
  try {
    const quantity = 10;
    const users = [];

    for (let u = 0; u < quantity; u++) {
      users.push(
        new User({
          email: faker.internet.email(),
          password: faker.internet.password(),
          username: faker.internet.userName(),
        })
      );
    }
    console.log(users);
  } catch (error) {
    console.log(error);
  }
};

seedUsers();
