import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useToastMessage } from "../components/Hooks/useToastMessage";

const AddTask = (props) => {
  const notifyMessage = useToastMessage();

  const [formData, setFormData] = useState([]);
  const [redirect, setRedirect] = useState(false);
  let url = "http://localhost:5012/Tasks";

  const [state, setState] = useState({
    taskName: "",
    details: "",
    dateFrom: "",
    timeFrom: "",
    dateTo: "",
    timeTo: "",
    status: "",
  });

  const { taskName, details, dateFrom, timeFrom, dateTo, timeTo, status } =
    state;

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    // console.log(name, value);
    setState({ ...state, [name]: value });
  };

  const postTask = async () => {

    const devEnv = process.env.NODE_ENV !== "production"
    const {REACT_APP_DEV_URL , REACT_APP_PROD_URL} = process.env


    await axios.post(`${devEnv ? REACT_APP_DEV_URL : REACT_APP_PROD_URL}`, state).then((res) => {
      console.log(res);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskName !== "" && dateFrom !== "" && dateTo !== "" && status !== "") {
      setFormData([...formData, state]);
      postTask();

      notifyMessage("Task Added Successfully");

      setTimeout(() => {
        setState({
          taskName: "",
          details: "",
          dateFrom: "",
          timeFrom: "",
          dateTo: "",
          timeTo: "",
          status: "",
        });
        // setRegisterRedirect(true);
        setRedirect(true);
      }, 2000);
    } else {
      alert("Mandatory fields required");
    }
  };
  return (
    <main className="addtask-container">
      <ToastContainer position="top-left" />

      {redirect ? <Navigate to="/" /> : ""}
      <section className="container">
        <div className="main-content">
          <div className="heading">
            <span>Add Task</span>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="input">
              <input
                placeholder="Enter Task Name"
                type="text"
                name="taskName"
                onChange={handleInputChange}
                value={taskName}
              />
            </div>

            <div className="input">
              <textarea
                type="text"
                col="12"
                rows="4"
                placeholder="Enter Task description"
                name="details"
                onChange={handleInputChange}
                value={details}
              />
            </div>

            <div className="input input-select">
              <div className="left">
                <span>select date from</span>
                <input
                  type="date"
                  name="dateFrom"
                  onChange={handleInputChange}
                  value={dateFrom}
                />
              </div>
              <div className="right">
                <span>select time from</span>
                <input
                  type="time"
                  name="timeFrom"
                  onChange={handleInputChange}
                  value={timeFrom}
                />{" "}
              </div>
            </div>

            <div className="input input-select">
              <div className="left">
                <span>select date to</span>
                <input
                  type="date"
                  name="dateTo"
                  onChange={handleInputChange}
                  value={dateTo}
                />
              </div>
              <div className="right">
                <span>select time to</span>
                <input
                  type="time"
                  name="timeTo"
                  onChange={handleInputChange}
                  value={timeTo}
                />
              </div>
            </div>

            <div className="radio-buttons">
              <span> Status : </span>
              <span>
                <input
                  type="radio"
                  id="completed"
                  name="status"
                  value="completed"
                  onChange={handleInputChange}
                />
                <label htmlFor="completed">Completed</label>
              </span>
              <span>
                <input
                  type="radio"
                  id="pending"
                  name="status"
                  value="pending"
                  onChange={handleInputChange}
                />
                <label htmlFor="css">Pending</label>
              </span>
              <span>
                <input
                  type="radio"
                  id="draft"
                  name="status"
                  value="draft"
                  onChange={handleInputChange}
                />
                <label htmlFor="draft">Draft</label>
              </span>
            </div>

            <button className="submit-btn">Add-Task</button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default AddTask;
