import { useEffect, useReducer, useState } from "react";
import { BiBrush } from "react-icons/bi";
import Success from "./success";
import Bug from "./bug";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { getUser, getUsers, updateUser } from "../lib/helper";
import { useDispatch, useSelector } from "react-redux";
import { getusersingledataget } from "../actions/userActions";

export default function UpdateUserForm({ formId, formData, setFormData }) {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [avatar, setAvatar] = useState("");
  const [date, setDate] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  const dispatch = useDispatch();
  const userSingleDataGet = useSelector((state) => state.otherapp.userDataGet);
  const {
    loading: loadingusersingledataget,
    error: errorusersingledataget,
    usersingledataget,
  } = userSingleDataGet;

  useEffect(() => {
    if (!usersingledataget) {
      dispatch(getusersingledataget(formId));
    }
  }, [dispatch, usersingledataget]);

  // const queryClient = useQueryClient();
  // const { isLoading, isError, data, error } = useQuery(["users", formId], () =>
  //   getUser(formId)
  // );
  // const UpdateMutation = useMutation((newData) => updateUser(formId, newData), {
  //   onSuccess: async (data) => {
  //     // queryClient.setQueryData('users', (old) => [data])
  //     queryClient.prefetchQuery("users", getUsers);
  //   },
  // });

  // const { name, avatar, salary, date, email, status } = usersingledataget || "";
  // const [firstname, lastname] = name ? name.split(" ") : formData || "";

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   let userName = `${formData.firstname ?? firstname} ${
  //     formData.lastname ?? lastname
  //   }`;
  //   let updated = Object.assign({}, data, formData, {
  //     name: userName,
  //     avatar: avatar,
  //   });
  //   await UpdateMutation.mutate(updated);
  // };
  const handleSubmit = () => {};

  if (loadingusersingledataget) return <div>Loading...!</div>;
  if (errorusersingledataget) return <div>Error</div>;

  return (
    <form className="grid lg:grid-cols-2 w-4/6 gap-4" onSubmit={handleSubmit}>
      {usersingledataget && (
        <>
          <div className="input-type">
            <input
              type="text"
              onChange={setFormData}
              value={usersingledataget.name}
              name="firstname"
              className="border w-full px-5 py-3 focus:outline-none rounded-md"
              placeholder="FirstName"
            />
          </div>
          <div className="input-type">
            <input
              type="text"
              onChange={setFormData}
              value={usersingledataget.name}
              name="lastname"
              className="border w-full px-5 py-3 focus:outline-none rounded-md"
              placeholder="LastName"
            />
          </div>
          <div className="input-type">
            <input
              type="text"
              onChange={setFormData}
              value={usersingledataget.email}
              name="email"
              className="border w-full px-5 py-3 focus:outline-none rounded-md"
              placeholder="Email"
            />
          </div>
          <div className="input-type">
            <input
              type="text"
              onChange={setFormData}
              value={usersingledataget.salary}
              name="salary"
              className="border w-full px-5 py-3 focus:outline-none rounded-md"
              placeholder="Salary"
            />
          </div>
          <div className="input-type">
            <input
              type="date"
              onChange={setFormData}
              value={usersingledataget.date}
              name="date"
              className="border px-5 py-3 focus:outline-none rounded-md"
              placeholder="Salary"
            />
          </div>

          <div className="flex gap-10 items-center">
            <div className="form-check">
              <input
                type="radio"
                defaultChecked={status == "Active"}
                onChange={setFormData}
                value="Active"
                id="radioDefault1"
                name="status"
                className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300  bg-white checked:bg-green-500 checked:border-green-500 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
              />
              <label
                htmlFor="radioDefault1"
                className="inline-block tet-gray-800"
              >
                Active
              </label>
            </div>
            <div className="form-check">
              <input
                type="radio"
                defaultChecked={status !== "Active"}
                onChange={setFormData}
                value="Inactive"
                id="radioDefault2"
                name="status"
                className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300  bg-white checked:bg-green-500 checked:border-green-500 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
              />
              <label
                htmlFor="radioDefault2"
                className="inline-block tet-gray-800"
              >
                Inactive
              </label>
            </div>
          </div>

          <button className="flex justify-center text-md w-2/6 bg-yellow-400 text-white px-4 py-2 border rounded-md hover:bg-gray-50 hover:border-green-500 hover:text-green-500">
            Update{" "}
            <span className="px-1">
              <BiBrush size={24}></BiBrush>
            </span>
          </button>
        </>
      )}
    </form>
  );
}
