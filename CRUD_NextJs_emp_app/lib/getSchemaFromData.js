import { Schema, models, model } from "mongoose";
const getSchemaFromData = async (data) => {
  const schemaFields = {};
  for (const [key, value] of Object.entries(data)) {
    const valueType = typeof value;
    if (valueType === "string") {
      schemaFields[key] = { type: String };
    } else if (valueType === "number") {
      schemaFields[key] = { type: Number };
    } else if (valueType === "object" && value instanceof Date) {
      schemaFields[key] = { type: Date };
    } else {
      throw new Error(`Unsupported type ${valueType} for field ${key}`);
    }
  }

  return new Schema(schemaFields);
};

export default getSchemaFromData;
