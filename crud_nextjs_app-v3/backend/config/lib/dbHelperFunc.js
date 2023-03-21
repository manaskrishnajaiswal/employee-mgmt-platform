import mongoose from "mongoose";
import connectMongo from "../database/conn";
import Ajv from "ajv";
// create a model
export async function createDynamicModel(schemaDefinition) {
  console.log(schemaDefinition);
  await connectMongo();
  const ajv = new Ajv(); // initialize AJV library
  const validate = ajv.compile(schemaDefinition);
  const isValid = validate({});
  if (isValid) {
    const schema = new mongoose.Schema(schemaDefinition);
    const Model = mongoose.model(schemaDefinition.modelname, schema);
    return Model;
  } else {
    console.log("Error occured during model creation");
  }
}

// Get a list of available models in the database
export async function getModelNames() {
  // const modelNames = mongoose.modelNames();
  const collectionsCursor = await mongoose.connection.db.listCollections();
  const collections = await collectionsCursor.toArray();
  const modelNames = await collections.map((collection) => collection.name);
  return modelNames;
}

// Delete data from a specified model
export async function deleteDataFromModel(modelName, query) {
  try {
    // Connect to the database
    await connectMongo();

    // Find the model with the specified name
    const Model = mongoose.model(modelName);

    // Delete the document(s) matching the query
    const result = await Model.deleteMany(query);

    return result.deletedCount;
  } catch (error) {
    console.error(error);
    throw new Error(`Failed to delete data from '${modelName}'`);
  }
}
