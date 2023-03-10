import { useEffect, useReducer, useState } from "react";
import { BiBrush } from "react-icons/bi";
import Success from "./success";
import Bug from "./bug";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { getUser, getUsers, updateUser } from "../lib/helper";
import { useDispatch, useSelector } from "react-redux";
import {
  getusersingledataget,
  putusersingledataupdate,
} from "../actions/userActions";
import { toggleChangeAction } from "../redux/reducer";
import {
  SINGLE_USER_GET_RESET,
  SINGLE_USER_UPDATE_RESET,
} from "../constants/userConstants";

export default function UpdateUserForm({ formId }) {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [salary, setSalary] = useState("");
  const [avatar, setAvatar] = useState("");
  const [date, setDate] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  const dispatch = useDispatch();
  const userSingleDataGet = useSelector(
    (state) => state.otherapp.userSingleDataGet
  );
  const {
    loading: loadingusersingledataget,
    error: errorusersingledataget,
    usersingledataget,
  } = userSingleDataGet;
  // const [firstname, lastname] = usersingledataget
  //   ? usersingledataget.name.split(" ")
  //   : "";
  useEffect(() => {
    if (!usersingledataget) {
      dispatch(getusersingledataget(formId));
    } else {
      setFirstname(usersingledataget.name.split(" ")[0]);
      setLastname(usersingledataget.name.split(" ")[1]);
      setSalary(usersingledataget.salary);
      setAvatar(usersingledataget.avatar);
      setDate(usersingledataget.date);
      setEmail(usersingledataget.email);
      setStatus(usersingledataget.status);
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
  const handleSubmit = (e) => {
    e.preventDefault();
    if (usersingledataget) {
      const updatedEmpData = {
        name: `${firstname} ${lastname}`,
        salary: salary,
        avatar: avatar,
        date: date,
        email: email,
        status: status,
      };
      // console.log(updatedEmpData);
      dispatch(putusersingledataupdate(formId, updatedEmpData));
      dispatch(toggleChangeAction());
      dispatch({ type: SINGLE_USER_GET_RESET });
    }
  };

  if (loadingusersingledataget) return <div>Loading...!</div>;
  if (errorusersingledataget) return <div>Error</div>;
  console.log(usersingledataget);
  return (
    <>
      {usersingledataget && (
        <form
          className="grid lg:grid-cols-2 w-4/6 gap-4"
          onSubmit={handleSubmit}
        >
          <div className="input-type">
            <input
              type="text"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              name="firstname"
              className="border w-full px-5 py-3 focus:outline-none rounded-md"
              placeholder="FirstName"
            />
          </div>
          <div className="input-type">
            <input
              type="text"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              name="lastname"
              className="border w-full px-5 py-3 focus:outline-none rounded-md"
              placeholder="LastName"
            />
          </div>
          <div className="input-type">
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              className="border w-full px-5 py-3 focus:outline-none rounded-md"
              placeholder="Email"
            />
          </div>
          <div className="input-type">
            <input
              type="number"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              name="salary"
              className="border w-full px-5 py-3 focus:outline-none rounded-md"
              placeholder="Salary"
            />
          </div>
          <div className="input-type">
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              name="date"
              className="border px-5 py-3 focus:outline-none rounded-md"
              placeholder="Salary"
            />
          </div>

          <div className="flex gap-10 items-center">
            <div className="form-check">
              <input
                type="radio"
                defaultChecked={usersingledataget.status == "Active"}
                value="Active"
                onChange={(e) => setStatus(e.target.value)}
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
                defaultChecked={usersingledataget.status !== "Active"}
                value="Inactive"
                onChange={(e) => setStatus(e.target.value)}
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
        </form>
      )}
    </>
  );
}
