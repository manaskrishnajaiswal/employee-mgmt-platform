import UpdateUserForm from "./updateUserForm";
import AddUserForm from "./addUserForm";
import { useSelector, useDispatch } from "react-redux";

export default function Form() {
  const formId = useSelector((state) => state.app.client.formId);

  return (
    <div className="container mx-auto py-5">
      {formId ? <UpdateUserForm /> : <AddUserForm />}
    </div>
  );
}
