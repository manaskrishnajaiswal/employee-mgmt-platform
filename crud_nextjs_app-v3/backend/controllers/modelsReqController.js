import { createDynamicModel, getModelNames } from "../config/lib/dbHelperFunc";

export async function createModel(req, res) {
  const { modelName, schemaDefinition } = req.body;
  try {
    const Model = await createDynamicModel(modelName, schemaDefinition);
    res.status(200).json({
      message: `Model '${modelName}' created successfully!`,
      model: Model,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: `Failed to create model '${modelName}'`, error: error });
  }
}

export async function getModels(req, res) {
  try {
    // Get a list of available models in the database
    const modelNames = await getModelNames();
    if (modelNames.length > 0) {
      res.status(200).json({
        message: `Models list fetched successfully!`,
        models: modelNames,
      });
    } else {
      res.status(200).json({
        message: `Models list is Empty!`,
        models: modelNames,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Failed to fetch models`, error: error });
  }
}
