import { Schema, models, model } from "mongoose";

const fieldConverter = ({ name, type }) => {
  console.log(`Converting field ${name} with type ${type}`);
  switch (type) {
    case "String":
      return { [name]: String };
    case "Number":
      return { [name]: Number };
    case "Date":
      return { [name]: Date };
    default:
      throw new Error(`Unsupported type ${type} for field ${name}`);
  }
};

const dbCustomSchema = new Schema({
  data: {
    type: Schema.Types.Mixed,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const DBCustoms = models.dbcustom || model("dbcustom", dbCustomSchema);
export default DBCustoms;
