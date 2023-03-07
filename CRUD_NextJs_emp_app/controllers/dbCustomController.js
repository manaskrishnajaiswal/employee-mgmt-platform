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

// get : http://localhost:3000/api/dbcustom
export async function getDBCustomData(req, res) {
  try {
    const customData = await DBCustom.find({});
    const regex = /^[0-9]{4}-[0-9]{2}-[0-9]{2}T00:00:00.000Z$/;
    const modifiedData = customData.map((doc) => {
      const obj = doc.toObject();
      Object.keys(obj).forEach((key) => {
        if (obj[key] instanceof Date) {
          const dateString = obj[key].toISOString();
          // console.log("This is a Date object");
          if (regex.test(dateString)) {
            // console.log("String matches the pattern");
            obj[key] = dateString.slice(0, 10);
          } else {
            // console.log("String does not match the pattern");
          }
        } else {
          // console.log("This is not a Date object");
        }
        // console.log(`${key}-${obj[key]}`);
      });
      return obj;
    });
    // console.log(modifiedData);
    if (!modifiedData) return res.status(404).json({ error: "Data not Found" });
    res.status(200).send(modifiedData);
  } catch (error) {
    res.status(404).json({ error: "Error While Fetching Data" });
  }
}

// delete : http://localhost:3000/api/dbcustom
export async function deleteDBCustomData(req, res) {
  try {
    const { customDataId } = req.query;
    const customData = await DBCustom.findById(customDataId);

    if (customData) {
      await customData.remove();
      res.status(200).json({ message: "Custom data deleted successfully" });
    } else {
      res.status(404);
      res.json({ message: "Custom data not found" });
    }
  } catch (error) {
    return res.status(404).json({ error });
  }
}

// get : http://localhost:3000/api/dbcustom/customDataId
export async function getSingleCustomData(req, res) {
  try {
    const { customDataId } = req.query;
    const customData = await DBCustom.findById(customDataId).lean();
    const regex = /^[0-9]{4}-[0-9]{2}-[0-9]{2}T00:00:00.000Z$/;
    const updatedData = {};
    Object.keys(customData).forEach((key) => {
      // console.log(`${key}-${customData[key]}`);
      if (customData[key] instanceof Date) {
        const dateString = customData[key].toISOString();
        // console.log("This is a Date object");
        if (regex.test(dateString)) {
          // console.log("String matches the pattern");
          updatedData[key] = dateString.slice(0, 10);
        } else {
          // console.log("String does not match the pattern");
          updatedData[key] = customData[key];
        }
      } else {
        // console.log("This is not a Date object");
        updatedData[key] = customData[key];
      }
      // console.log(`${key}-${updatedData[key]}`);
    });
    // console.log(updatedData);
    if (customData) {
      res.status(200).send(updatedData);
    } else {
      res.status(404);
      res.json({ message: "CustomData not found" });
    }
  } catch (error) {
    return res.status(404).json({ error });
  }
}
