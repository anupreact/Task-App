import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useToastMessage } from "../components/Hooks/useToastMessage";
import { DatePicker, Space } from "antd";
import TaskList from "../components/TaskList";

const Home = () => {
  const notifyMessage = useToastMessage();
  const [tasks, setTasks] = useState([]);
  const [data, setdata] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const { RangePicker } = DatePicker;

  let url = "http://localhost:5012/tasks";

  const getTasks = async () => {

    const devEnv = process.env.NODE_ENV !== "production"
    const {REACT_APP_DEV_URL , REACT_APP_PROD_URL} = process.env

    axios.get(`${devEnv ? REACT_APP_DEV_URL : REACT_APP_PROD_URL}`).then((res) => {
      console.log(res.data);
      setTasks(res.data);
    });
  };

  useEffect(() => {
    getTasks();
  }, []);

  const handleDelete = (id) => {
    const devEnv = process.env.NODE_ENV !== "production"
    const {REACT_APP_DEV_URL , REACT_APP_PROD_URL} = process.env

    axios.delete(`${devEnv ? REACT_APP_DEV_URL : REACT_APP_PROD_URL}/${id}`).then((res) => {
      console.log(res.data);
    });
    notifyMessage("Task Deleted Successfully");
    setTimeout(() => {
      getTasks();
    }, 1000);
  };

  const handleEdit = (id) => {
    alert(id);
  };

  const handleInputChange = (e, task) => {
    const {
      id,
      taskName,
      details,
      dateFrom,
      timeFrom,
      dateTo,
      timeTo,
      status,
    } = task;

    let { name, value, checked } = e.target;
    console.log(name, value, checked, task.id);

    const devEnv = process.env.NODE_ENV !== "production"
    const {REACT_APP_DEV_URL , REACT_APP_PROD_URL} = process.env

    axios.put(`${devEnv ? REACT_APP_DEV_URL : REACT_APP_PROD_URL}/${task.id}`, {
      taskName,
      details,
      dateFrom,
      timeFrom,
      dateTo,
      timeTo,
      status: checked ? "completed" : "pending",
      id,
    });
    notifyMessage(
      `${
        status === "completed" ? "Marked Incomplete" : "Succesfully Completed"
      }`
    );
    setTimeout(() => {
      getTasks();
    }, 1000);
  };

  //   date

  const onChange = (value, dateString) => {
    setStartDate(dateString[0]);
    setEndDate(dateString[1]);
    console.log(dateString);
  };

  const fitteredResult = tasks.filter((task, index, array) => {
    const { dateFrom, dateTo } = task;

    const newStartDate = new Date(startDate);
    const newEndDate = new Date(endDate);

    const newDateFrom = new Date(dateFrom);
    const newDateTo = new Date(dateTo);

    if (!startDate) {
      return task;
    } else if (
      newDateFrom.getTime() === newStartDate.getTime() ||
      newEndDate.getTime() === newDateFrom.getTime() ||
      (newDateFrom >= newStartDate && newDateTo <= newEndDate)
    ) {
      return task;
    }
  });

  return (
    <main className="home-container">
      <ToastContainer position="top-left" />

      <section className="container">
        <div className="heading">
          <h1>Welcome to Task-Manager App</h1>
        </div>

        <div className="main-content">
          {tasks.length === 0 ? (
            <div className="row-2">
              <span>You currently have no active tasks</span>
              {/* <NavLink to="/addtask">
                <button>Add New Task</button>
              </NavLink> */}
            </div>
          ) : (
            <>
              <div className="row-header">
                {tasks.length !== 0 && (
                  <>
                    <h3>Tasks List</h3>
                    {fitteredResult.length > 0 && (
                      <>
                        <div className="range-picker-container">
                          <span>Filter : </span>
                          <RangePicker
                            className="range-picker"
                            format="YYYY-MM-DD"
                            onChange={onChange}
                            
                            // onOk={onOk}
                          />
                        </div>

                        <NavLink to="/addtask">
                          <button>Add Task</button>
                        </NavLink>
                      </>
                    )}
                  </>
                )}
              </div>

              <div className="row-3">
                {fitteredResult.length > 0 ? (
                  // if filter data is available

                  fitteredResult.map((taskitem, index) => {
                    const {
                      id,
                      taskName,
                      details,
                      dateFrom,
                      timeFrom,
                      dateTo,
                      timeTo,
                      status,
                    } = taskitem;
                    return (
                      <>
                        <TaskList
                          taskitem={taskitem}
                          id={id}
                          handleInputChange={handleInputChange}
                          taskName={taskName}
                          dateFrom={dateFrom}
                          status={status}
                          handleDelete={handleDelete}
                          handleEdit={handleEdit}
                        />
                        
                      </>
                    );
                  })
                ) : (
                  // if filter data is available

                  // if no filter data is available
                  <div className="noFilter">
                    <h1>No Tasks Available for the selected dates</h1>

                    <NavLink to="/addtask">
                      <button>Add Task</button>
                    </NavLink>
                  </div>
                  // if no filter data is available
                )}
              </div>
            </>
          )}
        </div>

        <div className="Add-button">
          <NavLink to = "addtask">

          <button>Add Task</button>
          </NavLink>
        </div>
      </section>
    </main>
  );
};

export default Home;
