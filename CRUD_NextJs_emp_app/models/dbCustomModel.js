import mongoose from "mongoose";
import { Schema, models, model } from "mongoose";

const DBCustomSchema = new mongoose.Schema({}, { strict: false });

const DBCustom = models.DBCustom || mongoose.model("DBCustom", DBCustomSchema);

export default DBCustom;
