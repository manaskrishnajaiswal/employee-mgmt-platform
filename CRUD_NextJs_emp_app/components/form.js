import UpdateUserForm from "./updateUserForm";
import AddUserForm from "./addUserForm";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useReducer } from "react";
import { formReducer } from "../reducers/userReducers";
import { formAction } from "../redux/reducer";

// const formReducer = (state, event) => {
//   return {
//     ...state,
//     [event.target.name]: event.target.value,
//   };
// };

export default function UserForm() {
  const [formData, setFormData] = useReducer(formReducer, {});
  const formId = useSelector((state) => state.app.client.formId);
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   if (formData) {
  //     dispatch(formAction(formData));
  //   }
  // }, [dispatch, formData]);

  return (
    <div className="container mx-auto py-5">
      {formId
        ? UpdateUserForm({ formId, formData, setFormData })
        : AddUserForm({ formData, setFormData })}
    </div>
  );
}
