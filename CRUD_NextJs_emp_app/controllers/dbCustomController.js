import DBCustoms from "../models/dbCustomModel";

// post : http://localhost:3000/api/custom
export async function postDBCustomData(req, res) {
  try {
    const formData = req.body;
    console.log(formData);
    // const newFormData = await new DBCustoms(newFormData);
    // console.log(newFormData);
    // const result = await newFormData.save();
    return res.status(200).json(formData);
  } catch (error) {
    return res.status(404).json({ error });
  }
}
