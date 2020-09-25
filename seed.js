const faker = require("faker");
const mongoose = require("mongoose");
const { MONGO_URL } = require("./src/config");

const { User } = require("./src/models/user.model");

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

    for (const user of users) {
      await user.save();
    }
  } catch (error) {
    console.log(error);
  }
};

console.log(MONGO_URL);

async function main() {
  await mongoose.connect(MONGO_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  await seedUsers();

  await mongoose.disconnect();
}
main();
