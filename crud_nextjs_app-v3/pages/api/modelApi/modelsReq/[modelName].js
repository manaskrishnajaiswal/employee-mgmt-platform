import connectMongo from "@/backend/config/database/conn";
import { getModel } from "@/backend/controllers/modelsReqController";

export default async function handler(req, res) {
  connectMongo().catch(() =>
    res.status(405).json({ error: "Error in the Connection" })
  );
  // type of request
  const { method } = req;
  switch (method) {
    case "GET":
      // GET /api/employee/EmpId -> get data of a employee
      await getModel(req, res);
      break;
    // case "PUT":
    //   // PUT /api/employee/EmpId -> update data of a employee
    //   await putEmployeeData(req, res);
    //   break;
    // case "DELETE":
    //   // DEL /api/employee/EmpId -> delete employee data
    //   await deleteEmployeeData(req, res);
    //   break;
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowd`);
      break;
  }
}
