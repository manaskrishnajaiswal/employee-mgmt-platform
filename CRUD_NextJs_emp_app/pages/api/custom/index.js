import { postCustom } from "../../../controllers/customController";
import connectMongo from "../../../database/conn";

export default async function handler(req, res) {
  connectMongo().catch(() =>
    res.status(405).json({ error: "Error in the Connection" })
  );

  // type of request
  const { method } = req;

  switch (method) {
    case "GET":
      // res.status(200).json({ method, name: "GET Request" });
      // await postCustom(req, res);
      break;
    case "POST":
      // res.status(200).json({ method, name: "POST Request" });
      await postCustom(req, res);
      break;
    // case "PUT":
    //   // res.status(200).json({ method, name: "PUT Request" });
    //   await putUser(req, res);
    //   break;
    // case "DELETE":
    //   // res.status(200).json({ method, name: "DELETE Request" });
    //   await deleteUser(req, res);
    //   break;
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowd`);
      break;
  }
}
