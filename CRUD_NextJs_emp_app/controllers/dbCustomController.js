import DBCustom from "../models/dbCustomModel";
import getSchemaFromData from "../lib/getSchemaFromData";

// post : http://localhost:3000/api/dbcustom
export async function postDBCustomData(req, res) {
  try {
    const outFormData = req.body;
    const currentdate = new Date();
    console.log(currentdate);
    outFormData.createdAt = currentdate;
    console.log(outFormData);
    const modDBCustomSchema = await getSchemaFromData(outFormData);
    console.log(modDBCustomSchema);
    const newDBCustomData = new DBCustom(outFormData);
    console.log(newDBCustomData);
    newDBCustomData.schema = modDBCustomSchema;
    // newDBCustomData.createdAt = new Date();
    const result = await newDBCustomData.save();
    console.log(result);
    res.status(200).send({ result, message: "Data created successfully" });
  } catch (error) {
    return res.status(404).json({ error, message: "Error creating Data" });
  }
}
