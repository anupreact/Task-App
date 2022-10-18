import React from 'react';
import { NavLink } from 'react-router-dom';

const TaskList = (props) => {
  const {
    taskitem,
    id,
    handleInputChange,
    taskName,
    dateFrom,
    status,
    handleDelete,
    handleEdit,
  } = props;

  return (
    <>
      <div className="list" key={id}>
        <div className="col-1">
          <label className="main">
            <input
              type="checkbox"
              name="status"
              value={status}
              checked={status == 'completed'}
              onChange={(e) => handleInputChange(e, taskitem)}
            />
            <span className="geekmark"></span>
          </label>
          <div className="details">
            <div>{taskName}</div>
            
            <div>{dateFrom}</div>
          </div>
        </div>
        <div className="description">{taskitem.details}</div>
        <div className="col-2">
          <button
            className={status === 'completed' ? 'bgcompleted' : 'bgdraft'}
          >
            {status}{' '}
          </button>
        </div>
        <div className="col-3">

          <NavLink to={`/edittask/${id}`} >
          <button 
          >
            Edit
          </button>
          </NavLink>
          <button
            onClick={() => {
              handleDelete(id);
            }}
          >
            Delete
          </button>
        </div>

      </div>
     
    </>
  );
};

export default TaskList;
