import { ObjectID } from "mongodb";

const faker = require("faker");
const mongoose = require("mongoose");
const { MONGO_URL } = require("./src/config");

const { User } = require("./src/models/user.model");

export const seedUsers = async () => {
  try {
    const quantity = 10;
    const users = [];
    const numUsers = await User.find().estimatedDocumentCount();

    if (numUsers >= quantity) {
      return;
    }

    for (let u = 0; u < quantity; u++) {
      users.push(
        new User({
          first_name: faker.name.firstName(),
          last_name: faker.name.lastName(),
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

export const seedHomes = async () => {
  try {
    const quantity = 10;
    const homes = [];
    const numHomes = await User.find().estimatedDocumentCount();

    if (numHomes >= quantity) {
      return;
    }

    for (let u = 0; u < quantity; u++) {
      homes.push(
        new Home({
          address: faker.address.streetAddress(),
          user: User,
          img: faker.image.imageUrl(),
        })
      );
    }

    for (const home of homes) {
      await home.save();
    }
  } catch (error) {
    console.log(error);
  }
};

async function main() {
  await mongoose.connect(MONGO_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  await seedUsers();
  // await seedHomes();
  await mongoose.disconnect();
}
main();
