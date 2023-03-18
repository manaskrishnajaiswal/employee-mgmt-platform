import { BiEdit, BiTrashAlt, BiUserCircle } from "react-icons/bi";
import { useRouter } from "next/router";
import { getUsers } from "../lib/helper";
import { useQuery } from "react-query";
import {
  toggleChangeAction,
  updateAction,
  deleteAction,
} from "../redux/reducer";
import Loader from "./Loader";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getuserdataget } from "../actions/userActions";
import { SINGLE_USER_GET_RESET } from "../constants/userConstants";

export default function UserTable() {
  // const { isLoading, isError, data, error } = useQuery("users", getUsers);
  const dispatch = useDispatch();
  const userDataGet = useSelector((state) => state.otherapp.userDataGet);
  const {
    loading: loadinguserDataGet,
    error: erroruserDataGet,
    userdataget,
  } = userDataGet;

  useEffect(() => {
    if (!userdataget) {
      dispatch(getuserdataget());
    }
  }, [dispatch, userdataget]);

  if (loadinguserDataGet) return <Loader></Loader>;
  if (erroruserDataGet) return <div>Got Error {error}</div>;

  return (
    <table className="min-w-full table-auto">
      <thead>
        <tr className="bg-gray-800">
          <th className="px-16 py-2">
            <span className="text-gray-200">Name</span>
          </th>
          <th className="px-16 py-2">
            <span className="text-gray-200">Email</span>
          </th>
          <th className="px-16 py-2">
            <span className="text-gray-200">Salary</span>
          </th>
          <th className="px-16 py-2">
            <span className="text-gray-200">Birthday</span>
          </th>
          <th className="px-16 py-2">
            <span className="text-gray-200">Status</span>
          </th>
          <th className="px-16 py-2">
            <span className="text-gray-200">Employee Info</span>
          </th>
          <th className="px-16 py-2">
            <span className="text-gray-200">Actions</span>
          </th>
        </tr>
      </thead>
      {userdataget ? (
        <tbody className="bg-gray-200">
          {userdataget.map((obj, i) => (
            <Tr {...obj} key={i} />
          ))}
        </tbody>
      ) : null}
    </table>
  );
}

function Tr({ _id, name, avatar, email, salary, date, status }) {
  const visible = useSelector((state) => state.app.client.toggleForm);
  const dispatch = useDispatch();
  const router = useRouter();
  const onUpdate = () => {
    dispatch(toggleChangeAction(_id));
    if (visible) {
      dispatch(updateAction(_id));
      dispatch({ type: SINGLE_USER_GET_RESET });
    }
  };

  const onDelete = () => {
    if (!visible) {
      dispatch(deleteAction(_id));
    }
  };

  const empInfoHandler = () => {
    dispatch(updateAction(_id));
    router.push(`/employee/${_id}`);
  };

  return (
    <tr className="bg-gray-50 text-center">
      <td className="px-16 py-2 flex flex-row items-center">
        <img
          src={avatar || "#"}
          alt=""
          className="h-8 w-8 rounded-full object-cover"
        />
        <span className="text-center ml-2 font-semibold">
          {name || "Unknown"}
        </span>
      </td>
      <td className="px-16 py-2">
        <span>{email || "Unknown"}</span>
      </td>
      <td className="px-16 py-2">
        <span>{salary || "Unknown"}</span>
      </td>
      <td className="px-16 py-2">
        <span>{date || "Unknown"}</span>
      </td>
      <td className="px-16 py-2">
        <span
          className={`${
            status == "Active" ? "bg-green-500" : "bg-rose-500"
          } text-white px-5 py-1 rounded-full`}
        >
          {status || "Unknown"}
        </span>
      </td>
      <td className="px-16 py-2">
        <button className="cursor" onClick={empInfoHandler}>
          <BiUserCircle size={40} color={"rgb(34,197,94)"}></BiUserCircle>
        </button>
      </td>
      <td className="px-16 py-2 flex justify-around gap-5">
        <button className="cursor" onClick={onUpdate}>
          <BiEdit size={25} color={"rgb(34,197,94)"}></BiEdit>
        </button>
        <button className="cursor" onClick={onDelete}>
          <BiTrashAlt size={25} color={"rgb(244,63,94)"}></BiTrashAlt>
        </button>
      </td>
    </tr>
  );
}
