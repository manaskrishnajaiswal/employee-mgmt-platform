import mongoose from "mongoose";
import connectMongo from "../database/conn.js";

const myfunc = async () => {
  await connectMongo().catch(() =>
    console.log({ error: "Error in the Connection" })
  );
};
myfunc();
const getSchemaFromData = (data) => {
  const schemaFields = {};
  for (const [fieldName, fieldValue] of Object.entries(data)) {
    let fieldType = typeof fieldValue;
    if (fieldType === "object") {
      if (fieldValue instanceof Date) {
        fieldType = "date";
      } else if (Array.isArray(fieldValue)) {
        fieldType = "array";
      }
    }
    schemaFields[fieldName] = { type: fieldType };
  }
  return new mongoose.Schema(schemaFields);
};

const Person = mongoose.model(
  "Person",
  getSchemaFromData({ name: "John Doe", age: 30, dob: new Date("1992-01-01") })
);

const john = new Person({
  name: "John jaiswal",
  age: 30,
  dob: new Date("1992-01-01"),
});

john.save(function (err) {
  if (err) {
    console.error(err);
  } else {
    console.log("Person saved successfully");
  }
});
