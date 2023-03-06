import { Schema } from "mongoose";
import moment from "moment";

const getSchemaFromData = async (data) => {
  const schemaFields = {};
  for (const [key, value] of Object.entries(data)) {
    const valueType = typeof value;
    if (
      (valueType === "object" && value instanceof Date) ||
      moment(value, "YYYY-MM-DD", true).isValid()
    ) {
      schemaFields[key] = { type: Date };
    } else if (valueType === "number") {
      schemaFields[key] = { type: Number };
    } else if (valueType === "string") {
      schemaFields[key] = { type: String };
    } else {
      throw new Error(`Unsupported type ${valueType} for field ${key}`);
    }
  }
  // console.log(schemaFields);
  // schemaFields.createdAt = { type: Date, default: Date.now };
  return new Schema(schemaFields);
};

export default getSchemaFromData;

// import { Schema, models, model } from "mongoose";

// const getSchemaFromData = async (data) => {
//   const schemaFields = {};
//   for (const [key, value] of Object.entries(data)) {
//     const valueType = typeof value;
//     if (valueType === "string") {
//       schemaFields[key] = { type: String };
//     } else if (valueType === "number") {
//       schemaFields[key] = { type: Number };
//     } else if (valueType === "object" && value instanceof Date) {
//       schemaFields[key] = { type: Date };
//     } else {
//       throw new Error(`Unsupported type ${valueType} for field ${key}`);
//     }
//   }

//   schemaFields.createdAt = { type: Date, default: Date.now };
//   const schema = new Schema(schemaFields);

//   schema.pre("save", function (next) {
//     if (!this.createdAt) {
//       this.createdAt = new Date();
//     }
//     next();
//   });

//   const modelName = "DBCustom";
//   const existingModel = models[modelName];
//   if (existingModel) {
//     return existingModel;
//   }

//   return model(modelName, schema);
// };

// export default getSchemaFromData;
