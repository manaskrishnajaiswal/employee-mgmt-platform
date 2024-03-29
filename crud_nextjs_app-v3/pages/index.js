import { employeeDeleteAction } from "@/frontend/redux/actions/employeeActions";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BiUserPlus, BiX, BiCheck } from "react-icons/bi";
import { BsDatabaseAdd, BsDatabase } from "react-icons/bs";
import AddUserForm from "@/frontend/components/AddUserForm";
import UserTable from "@/frontend/components/usertable";
import {
  EMPLOYEES_GET_RESET,
  EMPLOYEE_CREATE_RESET,
  EMPLOYEE_DELETE_RESET,
  EMPLOYEE_GET_RESET,
} from "@/frontend/redux/constants/employeeConstants";
import AddDBForm from "@/frontend/components/AddDBForm";

export default function Home() {
  const [deleteId, setDeleteId] = useState("");
  const [visible, setVisible] = useState(false);

  const dispatch = useDispatch();

  const employeeDelete = useSelector((state) => state.employeeDelete);
  const {
    loading: loadingemployeedelete,
    success: successemployeedelete,
    error: erroremployeedelete,
    employeedelete,
  } = employeeDelete;
  const employeeCreate = useSelector((state) => state.employeeCreate);
  const {
    loading: loadingemployeecreate,
    success: successemployeecreate,
    error: erroremployeecreate,
    employeecreate,
  } = employeeCreate;

  useEffect(() => {
    if (successemployeedelete || successemployeecreate) {
      dispatch({ type: EMPLOYEES_GET_RESET });
      dispatch({ type: EMPLOYEE_DELETE_RESET });
      dispatch({ type: EMPLOYEE_CREATE_RESET });
    }
    dispatch({ type: EMPLOYEE_GET_RESET });
  }, [dispatch, successemployeedelete, successemployeecreate]);

  const addEmployeehandler = () => {
    setVisible(!visible);
  };

  const deletehandler = () => {
    if (deleteId) {
      dispatch(employeeDeleteAction(deleteId));
      setDeleteId("");
    }
  };

  const cancelhandler = () => {
    setDeleteId("");
  };

  return (
    <>
      <section>
        <Head>
          <title>Emp Mgmt App</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css"
            integrity="sha512-MV7K8+y+gLIBoVD59lQIYicR65iaqukzvf/nwasF0nqhPay5w/9lJmVM2hMDcnK1OnMGCdVK+iQrJ7lzPJQd1w=="
            crossOrigin="anonymous"
            referrerpolicy="no-referrer"
          />
        </Head>
        <main className="py-5">
          <h1 className="text-xl md:text-5xl text-center font-bold py-10 border-b">
            Database Management
          </h1>
          <br />
          <div className="container mx-auto border-t">
            <div className="container mx-auto flex justify-between py-5 border-b">
              <div className="left flex gap-3">
                <button
                  onClick={addEmployeehandler}
                  className="flex bg-indigo-500 text-white px-4 py-2 border rounded-md hover:bg-grary-50 hover:border-indigo-500 hover:text-gray-800"
                >
                  Create Database{" "}
                  <span className="px-1">
                    <BsDatabaseAdd size={23}></BsDatabaseAdd>
                  </span>
                </button>
              </div>
              {deleteId ? (
                DeleteComponent({ deletehandler, cancelhandler })
              ) : (
                <></>
              )}
            </div>
            {/* collapsable form */}
            {visible ? (
              <div className="container mx-auto py-5 border-b">
                <AddDBForm visible={visible} setVisiblehandler={setVisible} />
              </div>
            ) : (
              <></>
            )}
            <div className="py-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-md shadow-md">
                <div className="flex justify-between">
                  <div className="p-2">
                    <h6 className="text-xl  text-center font-bold">
                      Database Name
                    </h6>
                    <span>grid 1</span>
                  </div>
                  <div className="p-2">
                    <button
                      onClick={addEmployeehandler}
                      className="flex bg-indigo-500 text-white px-4 py-2 border rounded-md hover:bg-grary-50 hover:border-indigo-500 hover:text-gray-800"
                    >
                      <span className="px-1">
                        <BsDatabase size={23}></BsDatabase>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </section>
    </>
  );
}

function DeleteComponent({ deletehandler, cancelhandler }) {
  return (
    <div className="flex gap-5">
      <button>Are you sure?</button>
      <button
        onClick={deletehandler}
        className="flex bg-red-500 text-white px-4 py-2 border rounded-md hover:bg-rose-500 hover:border-red-500 hover:text-gray-50"
      >
        Yes{" "}
        <span className="px-1">
          <BiX color="rgb(255 255 255)" size={25} />
        </span>
      </button>
      <button
        onClick={cancelhandler}
        className="flex bg-green-500 text-white px-4 py-2 border rounded-md hover:bg-gree-500 hover:border-green-500 hover:text-gray-50"
      >
        No{" "}
        <span className="px-1">
          <BiCheck color="rgb(255 255 255)" size={25} />
        </span>
      </button>
    </div>
  );
}
