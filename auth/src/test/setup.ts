import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';

// The tests timesout if the default timout interval is not changed
jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000;

let mongo: any;
beforeAll(async () => {
  process.env.JWT_KEY = 'asdfasdf';
  // Tells mongodb memory server what version to use
  process.env.MONGOMS_DOWNLOAD_URL="https://fastdl.mongodb.org/linux/mongodb-linux-x86_64-ubuntu1804-4.2.8.tgz";
  process.env.MONGOMS_VERSION="4.2.8";

  mongo = new MongoMemoryServer();
  const mongoUri = await mongo.getUri();

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
});

// Removes all items from the database before each test
beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for(let collection of collections) {
    await collection.deleteMany({});
  };
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close()
});
