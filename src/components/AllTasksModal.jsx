import { Modal, Table, Button } from "react-bootstrap";

const AllTasksModal = ({ show, handleClose, tasks, onDeleteTask }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>All Tasks</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
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
                  <Button
                    variant="danger"
                    onClick={() => onDeleteTask(task.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Modal.Body>
    </Modal>
  );
};

export default AllTasksModal;
