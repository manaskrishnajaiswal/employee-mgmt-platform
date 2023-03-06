import mongoose from "mongoose";

const DBCustomSchema = new mongoose.Schema({}, { strict: false });

const DBCustom = mongoose.model("DBCustom", DBCustomSchema);

export default DBCustom;
