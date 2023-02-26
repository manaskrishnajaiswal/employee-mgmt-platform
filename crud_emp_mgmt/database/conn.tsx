const URI = process.env.MONGO_URI;

import mongoose from "mongoose";

const connectMongo = async () => {
  try {
    // console.log(URI);
    const { connection } = await mongoose.connect(URI);

    if (connection.readyState == 1) {
      console.log("Database Connected");
    }
  } catch (errors) {
    return Promise.reject(errors);
  }
};

export default connectMongo;
