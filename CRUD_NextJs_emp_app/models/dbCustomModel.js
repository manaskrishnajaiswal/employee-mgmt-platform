import { Schema, models, model } from "mongoose";
const dbCustomSchema = new Schema({
  // define any default fields here, e.g.
  createdAt: { type: Date, default: Date.now },
});
const DBCustoms = models.dbcustom || model("dbcustom", dbCustomSchema);
export default DBCustoms;
