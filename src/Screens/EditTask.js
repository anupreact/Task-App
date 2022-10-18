import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useToastMessage } from "../components/Hooks/useToastMessage";

const EditTask = (props) => {
  let url = "http://localhost:5001/Tasks";
  const notifyMessage = useToastMessage();

  const params = useParams();
  console.log(params.id);
  const [data, setData] = useState({});
  const [redirect, setRedirect] = useState(false);

  const fetch = () => {
    axios.get(`${url}/${params.id}`).then((res) => {
      console.log(res.data);
      setData(res.data);
    });
  };
  useEffect(() => {
    fetch();
  }, []);

  console.log(" data ------- ", data);
  const { taskName, details, dateFrom, timeFrom, dateTo, timeTo, status } =
    data;

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    // console.log(name, value);
    setData({ ...data, [name]: value });
  };

  const updateTask = async () => {
    await axios.put(`${url}/${params.id}`, data).then((res) => {
      console.log(res);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskName !== "" && dateFrom !== "" && dateTo !== "" && status !== "") {
      //   setFormData([...formData, state]);
      updateTask();

      notifyMessage("Task Updated Successfully");

      setTimeout(() => {
        setData({
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
            <span>Update Task</span>
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
                  checked={status === "completed"}
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
                  checked={status === "pending"}
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
                  checked={status === "draft"}
                  onChange={handleInputChange}
                />
                <label htmlFor="draft">Draft</label>
              </span>
            </div>

            <button className="submit-btn">Update-Task</button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default EditTask;
