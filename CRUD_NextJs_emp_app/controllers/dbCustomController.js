import DBCustoms from "../models/dbCustomModel";
import getSchemaFromData from "../lib/getSchemaFromData";

// post : http://localhost:3000/api/custom
export async function postDBCustomData(req, res) {
  try {
    const outFormData = req.body;
    console.log(outFormData);
    const modDBCustomSchema = await getSchemaFromData(outFormData);
    // const newDBCustomModel = DBCustoms.discriminator(
    //   "DBCustoms",
    //   modDBCustomSchema
    // );
    // const updatedDBCustomData = await new newDBCustomModel(outFormData);
    const updatedDBCustomData = await new DBCustoms(modDBCustomSchema);
    const result = await updatedDBCustomData.save();
    console.log(result);
    res.status(200).send({ result, message: "Data created successfully" });
  } catch (error) {
    return res.status(404).json({ error, message: "Error creating Data" });
  }
}
