const mongoose = require('mongoose');
require('dotenv').config();

const dbDetails = process.env.mongoDB

console.log(dbDetails)

const dbConnection = async () => {
  try {
    await mongoose.connect(dbDetails, {
      useNewUrlParser: true,
      useCreateIndex: true
    });
    console.log('DB connection created.');
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

module.exports = dbConnection;
