import React from 'react';

const TaskList = (props) => {
  const {
    taskitem,
    id,
    handleInputChange,
    taskName,
    dateFrom,
    status,
    handleDelete,
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
            <span>{taskName}</span>
            <br />
            <span>{dateFrom}</span>
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
