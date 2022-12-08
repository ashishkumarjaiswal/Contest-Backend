const mongoose = require("mongoose");

const connectToDataBase = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("Connected to Db");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectToDataBase;
