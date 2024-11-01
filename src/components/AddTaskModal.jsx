import { Modal, Button, Form } from "react-bootstrap";

const AddTaskModal = ({
  show,
  handleClose,
  handleChange,
  handleSaveTask,
  newTask,
  selectedDate,
}) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Task for {selectedDate}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="taskDescription">
            <Form.Label>Task Name</Form.Label>
            <Form.Control
              type="text"
              name="taskDescription"
              placeholder="Enter task name"
              value={newTask.taskDescription}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="hoursWorked">
            <Form.Label>Hours Worked</Form.Label>
            <Form.Control
              type="number"
              name="hoursWorked"
              placeholder="Enter hours worked"
              value={newTask.hoursWorked}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="status">
            <Form.Label>Status</Form.Label>
            <Form.Control
              as="select"
              name="status"
              value={newTask.status}
              onChange={handleChange}
            >
              <option value="Pending">PENDING</option>
              <option value="Done">DONE</option>
              <option value="QA">QA</option>
              <option value="DEV COMPLETE">DEV COMPLETE</option>
              <option value="PRODUCTION">PRODUCTION</option>
            </Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSaveTask}>
          Save Task
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddTaskModal;
