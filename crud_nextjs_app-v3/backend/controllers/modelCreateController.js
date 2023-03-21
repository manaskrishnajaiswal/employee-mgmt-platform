import { createDynamicModel } from "../config/lib/dbHelperFunc";

export default async function createModel(req, res) {
  const { modelName, schemaDefinition } = req.body;
  try {
    const Model = await createDynamicModel(modelName, schemaDefinition);
    res.status(200).json({
      message: `Model '${modelName}' created successfully!`,
      model: Model,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Failed to create model '${modelName}'` });
  }
}
