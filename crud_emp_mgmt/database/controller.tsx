import Users from "../model/user";

// get : http://localhost:3000/api/users
export async function getUsers(req, res) {
  try {
    const users = await Users.find({});

    if (!users) return res.status(404).json({ error: "Data not Found" });
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ error: "Error While Fetching Data" });
  }
}

// post : http://localhost:3000/api/users
export async function postUser(req, res) {
  try {
    const formData = req.body;
    if (!formData)
      return res.status(404).json({ error: "Form Data Not Provided...!" });
    const user = await Users.create(formData);
    return res.status(200).json(user);
  } catch (error) {
    return res.status(404).json({ error });
  }
}

// put : http://localhost:3000/api/users/1
export async function putUser(req, res) {
  try {
    const { userId } = req.query;
    const formData = req.body;

    const user = await Users.findById(userId);

    if (user) {
      user.name = formData.name || user.name;
      user.avatar = formData.email || user.avatar;
      user.email = formData.email || user.email;
      user.salary = formData.salary || user.salary;
      user.date = formData.date || user.date;
      user.status = formData.status || user.status;

      const updatedUser = await user.save();
      res.status(200).json({
        message: "User updated successfully",
        _id: updatedUser._id,
        name: updatedUser.name,
        avatar: updatedUser.avatar,
        email: updatedUser.email,
        salary: updatedUser.salary,
        date: updatedUser.date,
        status: updatedUser.status,
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  } catch (error) {
    res.status(404).json({ error: "Error While Updating the Data...!" });
  }
}
