import Head from "next/head";
import moment from "moment";
import Loader from "../components/Loader";
import { BiUserPlus, BiX, BiCheck } from "react-icons/bi";
import { BiEdit, BiTrashAlt } from "react-icons/bi";
import Table from "../components/table";
import UserForm from "../components/form";
import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleChangeAction, deleteAction } from "../redux/reducer";
import { deleteUser, getUsers } from "../lib/helper";
import { useQueryClient } from "react-query";
import Dropdown from "../components/Dropdown";
import styles from "../styles/Home.module.css";
import { BiPlus } from "react-icons/bi";
import {
  deletecustomdatadelete,
  getcustomdataget,
  getcustomsingledataget,
  postcustomdatacreate,
  putcustomsingledataupdate,
} from "../actions/customActions";
import { CUSTOM_SINGLE_DATA_GET_RESET } from "../constants/customConstants";
import UserTable from "../components/usertable";
import { deleteuserdatadelete } from "../actions/userActions";

export default function Home() {
  const [customUpdateId, setCustomUpdateId] = useState("");
  const [customDeleteId, setCustomDeleteId] = useState("");
  const [columnName, setColumnName] = useState("");
  const [columnData, setColumnData] = useState("");
  // console.log(columnData);
  const [outputForm, setOutputForm] = useState([]);

  const column_type_options = {
    Option1_number: "Number",
    Option2_string: "Text",
    Option3_textarea: "Textarea",
    Option4_date: "Date",
    Option5_dropdown: "Dropdown",
  };
  const columnType = useSelector((state) => state.app.client.columnType);
  // console.log(columnType);
  const visible = useSelector((state) => state.app.client.toggleForm);
  const deleteId = useSelector((state) => state.app.client.deleteId);

  const customDataCreate = useSelector(
    (state) => state.otherapp.customDataCreate
  );
  const {
    loading: loadingcustomdatacreate,
    error: errorcustomdatacreate,
    customdatacreate,
  } = customDataCreate;

  const customDataGet = useSelector((state) => state.otherapp.customDataGet);
  const {
    loading: loadingcustomdataget,
    error: errorcustomdataget,
    customdataget,
  } = customDataGet;

  const customSingleDataGet = useSelector(
    (state) => state.otherapp.customSingleDataGet
  );
  const {
    loading: loadingcustomsingledataget,
    error: errorcustomsingledataget,
    customsingledataget,
  } = customSingleDataGet;
  const [customDataUpdate, setCustomDataUpdate] = useState({
    ...customsingledataget,
  });

  const customDataDelete = useSelector(
    (state) => state.otherapp.customDataDelete
  );
  const {
    loading: loadingcustomdatadelete,
    error: errorcustomdatadelete,
    customdatadelete,
  } = customDataDelete;

  const customSingleDataUpdate = useSelector(
    (state) => state.otherapp.customSingleDataUpdate
  );
  const {
    loading: loadingcustomsingledataupdate,
    error: errorcustomsingledataupdate,
    customsingledataupdate,
  } = customSingleDataUpdate;

  const queryclient = useQueryClient();

  const dispatch = useDispatch();

  useEffect(() => {
    if (
      !customdataget ||
      loadingcustomdatacreate ||
      loadingcustomdatadelete ||
      loadingcustomsingledataupdate
    ) {
      dispatch(getcustomdataget());
    }
    setCustomDataUpdate(customsingledataget);
    // if (customsingledataget) {
    //   setCustomDataUpdate(customsingledataget);
    // }
    // if (customDataUpdate) {
    //   delete customDataUpdate._id;
    //   delete customDataUpdate.createdAt;
    //   delete customDataUpdate.__v;
    //   setCustomDataUpdate(customDataUpdate);
    // }
  }, [
    dispatch,
    customdataget,
    loadingcustomdatacreate,
    loadingcustomdatadelete,
    loadingcustomsingledataget,
    customsingledataget,
    loadingcustomsingledataupdate,
    // customDataUpdate,
  ]);

  const handler = () => {
    dispatch(toggleChangeAction());
  };

  const deletehandler = async () => {
    if (deleteId) {
      // await deleteUser(deleteId);
      // await queryclient.prefetchQuery("users", getUsers);
      await dispatch(deleteuserdatadelete(deleteId));
      await dispatch(deleteAction(null));
    }
    if (customDeleteId) {
      console.log("deleted!");
      dispatch(deletecustomdatadelete(customDeleteId));
      setCustomDeleteId("");
    }
  };

  const cancelhandler = async () => {
    console.log("cancel");
    await dispatch(deleteAction(null));
    setCustomDeleteId("");
  };

  const columnDatahandler = async () => {
    if (columnType === "Number") {
      outputForm.push({
        colName: columnName,
        colData: Number(columnData),
        colType: columnType,
      });
    } else if (columnType === "Text" || columnType === "Textarea") {
      outputForm.push({
        colName: columnName,
        colData: columnData,
        colType: columnType,
      });
    } else if (columnType === "Date") {
      outputForm.push({
        colName: columnName,
        colData: columnData,
        colType: columnType,
      });
    } else {
      outputForm.push({
        colName: columnName,
        colData: columnData,
        colType: columnType,
      });
    }
    setOutputForm(outputForm);
    setColumnName("");
    setColumnData("");
  };

  const handleDataChange = (index, event) => {
    const newItems = [...outputForm];
    newItems[index].colData = event.target.value;
    setOutputForm(newItems);
  };
  const handleUpdateDataChange = (key, value) => {
    const updatedOutputForm = { ...customDataUpdate }; // create a shallow copy of the original object
    // delete updatedOutputForm._id;
    // delete updatedOutputForm.createdAt;
    // delete updatedOutputForm.__v;
    setCustomDataUpdate({ ...updatedOutputForm, [key]: value }); // set the updated object as the new state
  };

  const outputFormSubmitHandler = (e) => {
    e.preventDefault();
    const formObject = {};
    outputForm.forEach((item) => {
      formObject[item.colName] = item.colData;
    });
    dispatch(postcustomdatacreate(formObject));
    setOutputForm([]);
  };

  const onCustomDataUpdate = (customeditid) => {
    setCustomUpdateId(customeditid);
    dispatch(getcustomsingledataget(customeditid));
  };
  const onCustomDataDelete = (customdeleteid) => {
    setCustomDeleteId(customdeleteid);
  };
  const outputFormUpdateHandler = (e) => {
    e.preventDefault();
    dispatch(putcustomsingledataupdate(customUpdateId, customDataUpdate));
    dispatch({ type: CUSTOM_SINGLE_DATA_GET_RESET });
    setCustomUpdateId("");
  };
  console.log(customDataUpdate);
  // console.log(outputForm);
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

        {/* table
        <div className="container mx-auto">
          <Table></Table>
        </div> */}
        <br />
        {/* table */}
        <div className="container mx-auto">
          <UserTable></UserTable>
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
        {customDataUpdate && (
          <>
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
                  <tr>
                    <td>
                      <Form
                        className="grid lg:grid-cols-4 w-4/8 gap-4"
                        onSubmit={outputFormUpdateHandler}
                      >
                        {Object.keys(customDataUpdate).map((key, index) => (
                          <div className="mx-auto my-4" key={index}>
                            {key !== "_id" &&
                              key !== "__v" &&
                              key !== "createdAt" &&
                              moment(
                                customDataUpdate[key],
                                "YYYY-MM-DD",
                                true
                              ).isValid() && (
                                <>
                                  <Form.Group>
                                    <Form.Label>
                                      <strong>{key}</strong>
                                    </Form.Label>
                                    <br></br>
                                    <Form.Control
                                      className="px-2 py-2"
                                      type="Date"
                                      placeholder={`Enter ${key}`}
                                      value={customDataUpdate[key]}
                                      onChange={(event) =>
                                        handleUpdateDataChange(
                                          key,
                                          event.target.value
                                        )
                                      }
                                      required
                                      autoComplete="none"
                                    ></Form.Control>
                                  </Form.Group>
                                </>
                              )}
                            {key !== "_id" &&
                              key !== "__v" &&
                              key !== "createdAt" &&
                              typeof customDataUpdate[key] === "number" && (
                                <Form.Group>
                                  <Form.Label>
                                    <strong>{key}</strong>
                                  </Form.Label>
                                  <br></br>
                                  <Form.Control
                                    className="px-2 py-2"
                                    type="Number"
                                    placeholder={`Enter ${key}`}
                                    value={customDataUpdate[key]}
                                    onChange={(event) =>
                                      handleUpdateDataChange(
                                        key,
                                        Number(event.target.value)
                                      )
                                    }
                                    required
                                    autoComplete="none"
                                  ></Form.Control>
                                </Form.Group>
                              )}
                            {key !== "_id" &&
                              key !== "__v" &&
                              key !== "createdAt" &&
                              typeof customDataUpdate[key] === "string" &&
                              customDataUpdate[key].length <= 10 &&
                              !moment(
                                customDataUpdate[key],
                                "YYYY-MM-DD",
                                true
                              ).isValid() && (
                                <Form.Group>
                                  <Form.Label>
                                    <strong>{key}</strong>
                                  </Form.Label>
                                  <br></br>
                                  <Form.Control
                                    className="px-2 py-2"
                                    type="Text"
                                    placeholder={`Enter ${key}`}
                                    value={customDataUpdate[key]}
                                    onChange={(event) =>
                                      handleUpdateDataChange(
                                        key,
                                        event.target.value
                                      )
                                    }
                                    required
                                    autoComplete="none"
                                  ></Form.Control>
                                </Form.Group>
                              )}
                            {key !== "_id" &&
                              key !== "__v" &&
                              key !== "createdAt" &&
                              typeof customDataUpdate[key] === "string" &&
                              customDataUpdate[key].length > 10 &&
                              !moment(
                                customDataUpdate[key],
                                "YYYY-MM-DD",
                                true
                              ).isValid() && (
                                <Form.Group>
                                  <Form.Label>
                                    <strong>{key}</strong>
                                  </Form.Label>
                                  <br></br>
                                  <Form.Control
                                    className="px-2 py-2"
                                    as="textarea"
                                    rows={3}
                                    placeholder={`Enter ${key}`}
                                    value={customDataUpdate[key]}
                                    onChange={(event) =>
                                      handleUpdateDataChange(
                                        key,
                                        event.target.value
                                      )
                                    }
                                    required
                                    autoComplete="none"
                                  ></Form.Control>
                                </Form.Group>
                              )}
                          </div>
                        ))}
                        <br></br>
                        <button
                          type="submit"
                          className="mx-20 my-4 flex justify-center text-md w-2/6 bg-green-500 text-white px-4 py-2 border rounded-md hover:bg-gray-50 hover:border-green-500 hover:text-green-500"
                        >
                          <span className="px-1 my-auto">Update</span>
                          <span className="px-1 my-auto">
                            <BiPlus size={24}></BiPlus>
                          </span>
                        </button>
                      </Form>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </>
        )}
        {outputForm.length !== 0 && (
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
                <tr>
                  <td>
                    <Form
                      className="grid lg:grid-cols-4 w-4/8 gap-4"
                      onSubmit={outputFormSubmitHandler}
                    >
                      {outputForm.map((data, index) => (
                        <div className="mx-auto my-4" key={index}>
                          {(data.colType === "Number" ||
                            data.colType === "Text" ||
                            data.colType === "Date") && (
                            <Form.Group>
                              <Form.Label>
                                <strong>{data.colName}</strong>
                              </Form.Label>
                              <br></br>
                              <Form.Control
                                className="px-2 py-2"
                                type={data.colType}
                                placeholder={`Enter ${data.colType}`}
                                value={data.colData}
                                onChange={(event) =>
                                  handleDataChange(index, event)
                                }
                                required
                                autoComplete="none"
                              ></Form.Control>
                            </Form.Group>
                          )}
                          {data.colType === "Textarea" && (
                            <Form.Group>
                              <Form.Label>
                                <strong>{data.colName}</strong>
                              </Form.Label>
                              <br></br>
                              <Form.Control
                                className="px-2 py-2"
                                as="textarea"
                                rows={3}
                                placeholder={`Enter ${data.colType}`}
                                value={data.colData}
                                onChange={(event) =>
                                  handleDataChange(index, event)
                                }
                                required
                                autoComplete="none"
                              ></Form.Control>
                            </Form.Group>
                          )}
                        </div>
                      ))}
                      <br></br>
                      <button
                        type="submit"
                        className="mx-20 my-4 flex justify-center text-md w-2/6 bg-green-500 text-white px-4 py-2 border rounded-md hover:bg-gray-50 hover:border-green-500 hover:text-green-500"
                      >
                        <span className="px-1 my-auto">Add</span>
                        <span className="px-1 my-auto">
                          <BiPlus size={24}></BiPlus>
                        </span>
                      </button>
                    </Form>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
        <br />
        <div className="container mx-auto">
          {customDeleteId ? (
            DeleteComponent({ deletehandler, cancelhandler })
          ) : (
            <></>
          )}
          {loadingcustomdataget ? (
            <Loader />
          ) : (
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-gray-800">
                  <th className="px-16 py-2">
                    <span className="text-gray-200">Output Data From DB</span>
                  </th>
                  <th className="px-16 py-2">
                    <span className="text-gray-200">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-200">
                {customdataget &&
                  customdataget.map((item) => (
                    <tr
                      key={item._id}
                      className="bg-gray-50 text-center border-b"
                    >
                      <td className="px-16 py-2">
                        {Object.keys(item).map((key) => (
                          <p key={key}>
                            <span>
                              {key !== "_id" &&
                                key !== "__v" &&
                                key !== "createdAt" &&
                                key}
                              {key !== "_id" &&
                                key !== "__v" &&
                                key !== "createdAt" && (
                                  <span>--{item[key]}</span>
                                )}
                            </span>
                          </p>
                        ))}
                      </td>
                      <td className="px-16 py-2 flex justify-around gap-5">
                        <button
                          className="cursor"
                          onClick={() => onCustomDataUpdate(item._id)}
                        >
                          <BiEdit size={25} color={"rgb(34,197,94)"}></BiEdit>
                        </button>
                        <button
                          className="cursor"
                          onClick={() => onCustomDataDelete(item._id)}
                        >
                          <BiTrashAlt
                            size={25}
                            color={"rgb(244,63,94)"}
                          ></BiTrashAlt>
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}
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
