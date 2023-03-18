import { employeesGetAction } from "@/frontend/redux/actions/employeeActions";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BiUserPlus, BiX, BiCheck } from "react-icons/bi";
import AddUserForm from "@/frontend/components/AddUserForm";

export default function Home() {
  const [deleteId, setDeleteId] = useState("");
  const [visible, setVisible] = useState(false);

  const dispatch = useDispatch();
  const employeesGet = useSelector((state) => state.employeesGet);
  const {
    loading: loadingemployeesget,
    error: erroremployeesget,
    employeesget,
  } = employeesGet;
  useEffect(() => {
    if (!employeesget) {
      dispatch(employeesGetAction());
    }
  }, [dispatch, employeesget]);
  const addEmployeehandler = () => {
    setVisible(!visible);
  };
  console.log(visible);
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
          <h1 className="text-xl md:text-5xl text-center font-bold py-10">
            Employee Management
          </h1>
          <div className="container mx-auto flex justify-between py-5 border-b">
            <div className="left flex gap-3">
              <button
                onClick={addEmployeehandler}
                className="flex bg-indigo-500 text-white px-4 py-2 border rounded-md hover:bg-grary-50 hover:border-indigo-500 hover:text-gray-800"
              >
                Add Employee{" "}
                <span className="px-1">
                  <BiUserPlus size={23}></BiUserPlus>
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
          <div className="container mx-auto py-5">
            {visible ? (
              <AddUserForm visible={visible} setVisiblehandler={setVisible} />
            ) : (
              <></>
            )}
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
