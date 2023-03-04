import Head from "next/head";
import { BiUserPlus, BiX, BiCheck } from "react-icons/bi";
import Table from "../components/table";
import UserForm from "../components/form";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleChangeAction, deleteAction } from "../redux/reducer";
import { deleteUser, getUsers } from "../lib/helper";
import { useQueryClient } from "react-query";
import Dropdown from "../components/Dropdown";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [columnName, setColumnName] = useState("");
  const [columnData, setColumnData] = useState("");
  const [outputForm, setOutputForm] = useState([
    { colName: "dsfrt", colData: "3" },
    { colName: "dsfrt", colData: "3" },
  ]);

  const column_type_options = {
    Option1_number: "Number",
    Option2_string: "Text",
    Option3_textarea: "Textarea",
    Option4_date: "Date",
    Option5_dropdown: "Dropdown",
  };
  const columnType = useSelector((state) => state.app.client.columnType);
  console.log(columnType);
  const visible = useSelector((state) => state.app.client.toggleForm);
  const deleteId = useSelector((state) => state.app.client.deleteId);
  const queryclient = useQueryClient();

  const dispatch = useDispatch();

  const handler = () => {
    dispatch(toggleChangeAction());
  };

  const deletehandler = async () => {
    if (deleteId) {
      await deleteUser(deleteId);
      await queryclient.prefetchQuery("users", getUsers);
      await dispatch(deleteAction(null));
    }
  };

  const cancelhandler = async () => {
    console.log("cancel");
    await dispatch(deleteAction(null));
  };

  const columnDatahandler = async () => {
    outputForm.push({ colName: columnName, colData: columnData });
    setOutputForm(outputForm);
    setColumnName("");
    setColumnData("");
  };

  return (
    <section>
      <Head>
        <title>CRUD Application</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css"
          integrity="sha512-MV7K8+y+gLIBoVD59lQIYicR65iaqukzvf/nwasF0nqhPay5w/9lJmVM2hMDcnK1OnMGCdVK+iQrJ7lzPJQd1w=="
          crossorigin="anonymous"
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
              onClick={handler}
              className="flex bg-indigo-500 text-white px-4 py-2 border rounded-md hover:bg-grary-50 hover:border-indigo-500 hover:text-gray-800"
            >
              Add Employee{" "}
              <span className="px-1">
                <BiUserPlus size={23}></BiUserPlus>
              </span>
            </button>
          </div>
          {deleteId ? DeleteComponent({ deletehandler, cancelhandler }) : <></>}
        </div>

        {/* collapsable form */}
        {visible ? <UserForm></UserForm> : <></>}

        {/* table */}
        <div className="container mx-auto">
          <Table></Table>
        </div>
        <br />
        <div className="container mx-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-800">
                <th className="px-16 py-2">
                  <span className="text-gray-200">Column Name</span>
                </th>
                <th className="px-16 py-2">
                  <span className="text-gray-200">Column Type</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-200">
              <tr className="bg-gray-50 text-center">
                <td className="px-16 py-2">
                  <input
                    type="text"
                    onChange={(e) => setColumnName(e.target.value)}
                    value={columnName}
                    name="columnName"
                    className="border px-5 py-3 focus:outline-none rounded-md"
                    placeholder="Enter Column Name"
                    required
                    autoComplete="none"
                  />
                </td>
                <td className="px-16 py-2">
                  <Dropdown column_type_options={column_type_options} />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <br />
        <div className="container mx-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-800">
                <th className="px-16 py-2">
                  <span className="text-gray-200">Column Data</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-200">
              <tr className="bg-gray-50 text-left">
                <td className="mx-64 px-64 py-4 flex flex-row items-center">
                  {/* <Dropdown column_type_options={column_type_options} /> */}
                  {(columnType === "Number" ||
                    columnType === "Text" ||
                    columnType === "Date") && (
                    <Form>
                      <Form.Group controlId="name">
                        <Form.Label>
                          <strong>Enter {columnType}</strong>
                        </Form.Label>
                        <br></br>
                        <Form.Control
                          className="px-2 py-2"
                          type={columnType}
                          placeholder={`Enter ${columnType}`}
                          value={columnData}
                          onChange={(e) => setColumnData(e.target.value)}
                          required
                          autoComplete="none"
                        ></Form.Control>
                      </Form.Group>
                    </Form>
                  )}
                  {columnType === "Textarea" && (
                    <Form>
                      <Form.Group controlId="name">
                        <Form.Label className="my-2">
                          <strong>Enter {columnType}</strong>
                        </Form.Label>
                        <br></br>
                        <Form.Control
                          className="px-2 py-2"
                          as="textarea"
                          rows={3}
                          placeholder={`Enter ${columnType}`}
                          value={columnData}
                          onChange={(e) => setColumnData(e.target.value)}
                          required
                          autoComplete="none"
                        ></Form.Control>
                      </Form.Group>
                    </Form>
                  )}
                  <button
                    onClick={columnDatahandler}
                    className="flex bg-indigo-500 text-white mx-4 px-4 py-2 border rounded-md hover:bg-grary-50 hover:border-indigo-500 hover:text-gray-800"
                  >
                    {" "}
                    <span className="px-1">
                      <BiUserPlus size={23}></BiUserPlus>
                    </span>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <br />
        <div className="container mx-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-800">
                <th className="px-16 py-2">
                  <span className="text-gray-200">Output Form</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-200">
              {outputForm.map((data, index) => (
                <tr key={index}>
                  <td>
                    {data.colName}-{data.colData}
                  </td>
                </tr>
              ))}
              <tr>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </section>
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
