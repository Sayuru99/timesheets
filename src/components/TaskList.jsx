import { Button } from "react-bootstrap";

const TaskList = ({ tasks, onDeleteTask }) => {
  return (
    <div>
      {tasks.length > 0 ? (
        <table className="table">
          <thead>
            <tr>
              <th>Task Name</th>
              <th>Hours Worked</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => (
              <tr key={index}>
                <td>{task.taskDescription}</td>
                <td>{task.hoursWorked}</td>
                <td>{task.status}</td>
                <td>
                  <Button variant="danger" onClick={() => onDeleteTask(index)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No tasks for this date.</p>
      )}
    </div>
  );
};

export default TaskList;
