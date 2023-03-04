import { Schema, models, model } from "mongoose";

const customSchema = new Schema({
  data: {
    type: Schema.Types.Mixed,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Customs = models.custom || model("custom", customSchema);

export default Customs;
