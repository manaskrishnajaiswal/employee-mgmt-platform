const MONGO_URI =
  "mongodb+srv://manas5996:Mkj5996@eplantdb.25bbqlq.mongodb.net/emp-mgmt-platform?retryWrites=true&w=majority";
import mongoose from "mongoose";

const connectMongo = async () => {
  try {
    const { connection } = await mongoose.connect(MONGO_URI);

    if (connection.readyState == 1) {
      console.log("Database Connected");
    }
  } catch (errors) {
    return Promise.reject(errors);
  }
};

export default connectMongo;
