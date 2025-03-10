const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    if (!process.env.MONGO_DB_URL) {
      console.error('MongoDB URL is missing in environment variables.');
      process.exit(1);
    }

    const connection = await mongoose.connect(process.env.MONGO_DB_URL);
    console.log(`MongoDB Connected: ${connection.connection.host}, ${connection.connection.name}`);
  } catch (err) {
    console.error(`MongoDB Connection Error: ${err.message}`);
    process.exit(1);
  }
};

const disconnectDB = async () => {
  await mongoose.disconnect();
  console.log('MongoDB Disconnected');
};

module.exports = { connectDB, disconnectDB };
