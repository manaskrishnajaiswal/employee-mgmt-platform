import DBCustom from "../models/dbCustomModel";
import getSchemaFromData from "../lib/getSchemaFromData";
import moment from "moment";

// post : http://localhost:3000/api/dbcustom
export async function postDBCustomData(req, res) {
  try {
    const outFormData = req.body;
    Object.keys(outFormData).forEach((key) => {
      if (moment(outFormData[key], "YYYY-MM-DD", true).isValid()) {
        outFormData[key] = new Date(outFormData[key]);
      }
    });
    // const dateString = "2023-03-03T00:00:00.000Z";
    // const regex = /^[0-9]{4}-[0-9]{2}-[0-9]{2}T00:00:00.000Z$/;

    // if (regex.test(dateString)) {
    //   console.log("String matches the pattern");
    // } else {
    //   console.log("String does not match the pattern");
    // }
    const currentdate = new Date();
    outFormData.createdAt = currentdate;
    const modDBCustomSchema = await getSchemaFromData(outFormData);
    const newDBCustomData = new DBCustom(outFormData);
    newDBCustomData.schema = modDBCustomSchema;
    const result = await newDBCustomData.save();
    console.log(result);
    res.status(200).send({ result, message: "Data created successfully" });
  } catch (error) {
    return res.status(404).json({ error, message: "Error creating Data" });
  }
}
