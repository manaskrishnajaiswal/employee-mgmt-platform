import Customs from "../models/customModel";

// post : http://localhost:3000/api/custom
export async function postCustomData(req, res) {
  try {
    const customData = req.body;
    // console.log(customData);
    if (!customData)
      return res.status(404).json({ error: "Form Data Not Provided...!" });
    const customDataRes = await Customs.create(customData);
    return res.status(200).json(customDataRes);
  } catch (error) {
    return res.status(404).json({ error });
  }
}

// get : http://localhost:3000/api/custom
export async function getCustomData(req, res) {
  try {
    const customData = await Customs.find({});
    if (!customData) return res.status(404).json({ error: "Data not Found" });
    res.status(200).json(customData);
  } catch (error) {
    res.status(404).json({ error: "Error While Fetching Data" });
  }
}
