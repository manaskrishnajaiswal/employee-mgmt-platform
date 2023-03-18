import connectMongo from "@/backend/config/database/conn";

export default async function handler(req, res) {
  connectMongo().catch(() =>
    res.status(405).json({ error: "Error in the Connection" })
  );
  // type of request
  const { method } = req;
  switch (method) {
    case "GET":
      // GET /api/employee/EmpId
      await getEmployeeData(req, res);
      break;
    case "PUT":
      // PUT /api/employee/EmpId
      await putEmployeeData(req, res);
      break;
    case "DELETE":
      // DEL /api/employee/EmpId
      await deleteDBCustomData(req, res);
      break;
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowd`);
      break;
  }
}
