import { Modal, Button } from "react-bootstrap";
import TaskList from "./TaskList";

const TaskListModal = ({ show, handleClose, tasksForSelectedDate, selectedDate, onDeleteTask }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Tasks for {selectedDate}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <TaskList tasks={tasksForSelectedDate} onDeleteTask={onDeleteTask} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TaskListModal;
