module.exports = {
  PORT: process.env.PORT || 5000,
  HTTP_STATUS_CODES: {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
  },
  // MONGO_URL: process.env.MONGO_URL || 'mongodb://localhost:27017/fit-journal',
  MONGO_URL: process.env.MONGO_URL || 'mongodb://ds237932.mlab.com:37932/fit-journal',
  TEST_MONGO_URL: process.env.TEST_MONGO_URL || 'mongodb://localhost:27017/test-fit-journal',
  JWT_SECRET: process.env.JWT_SECRET || 'default',
  JWT_EXPIRY: process.env.JWT_EXPIRY || '7d',
};
