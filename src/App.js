import React, { useEffect, useState } from "react";
import MyCalendar from "./components/Calendar";
import AddTaskModal from "./components/AddTaskModal";
import TaskListModal from "./components/TaskListModal";
import AllTasksModal from "./components/AllTasksModal";
import "bootstrap/dist/css/bootstrap.min.css";
import { getTasks, addTask, deleteTask } from "./data/taskManager";
import * as XLSX from "xlsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileExcel } from "@fortawesome/free-solid-svg-icons";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [showTaskListModal, setShowTaskListModal] = useState(false);
  const [showAllTasksModal, setShowAllTasksModal] = useState(false);
  const [newTask, setNewTask] = useState({
    taskDescription: "",
    hoursWorked: "",
    status: "Pending",
  });

  useEffect(() => {
    const fetchTasks = async () => {
      const storedTasks = await getTasks();
      setTasks(storedTasks);
    };
    fetchTasks();
  }, []);

  const handleShowAddTask = (date) => {
    setSelectedDate(date);
    setShowAddTaskModal(true);
  };

  const handleCloseAddTask = () => {
    setShowAddTaskModal(false);
    setNewTask({ taskDescription: "", hoursWorked: "", status: "Pending" });
  };

  const handleSaveTask = async () => {
    if (!newTask.taskDescription || !newTask.hoursWorked) {
      alert("Please fill in all fields.");
      return;
    }
    const taskWithDate = { ...newTask, date: selectedDate };
    await addTask(taskWithDate);
    setTasks([...tasks, taskWithDate]);
    handleCloseAddTask();
  };

  const handleShowTaskList = () => {
    setShowTaskListModal(true);
  };

  const handleCloseTaskList = () => {
    setShowTaskListModal(false);
  };

  const handleShowAllTasks = () => {
    setShowAllTasksModal(true);
  };

  const handleCloseAllTasks = () => {
    setShowAllTasksModal(false);
  };

  const onDeleteTask = async (taskId) => {
    await deleteTask(taskId);
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const tasksForSelectedMonth = tasks.filter((task) => {
    const taskDate = new Date(task.date);
    const selectedMonth = new Date(selectedDate).getMonth();
    const selectedYear = new Date(selectedDate).getFullYear();
    return (
      taskDate.getMonth() === selectedMonth &&
      taskDate.getFullYear() === selectedYear
    );
  });

  const getTasksByDate = (day) => {
    return tasksForSelectedMonth.filter((task) => {
      const taskDate = new Date(task.date);
      return taskDate.getDate() === day;
    });
  };

  const exportTasksToExcel = () => {
    const filteredTasks = tasks.filter((task) => {
      const taskDate = new Date(task.date);
      const selectedMonth = new Date(selectedDate).getMonth();
      const selectedYear = new Date(selectedDate).getFullYear();
      return (
        taskDate.getMonth() === selectedMonth &&
        taskDate.getFullYear() === selectedYear
      );
    });

    const worksheet = XLSX.utils.json_to_sheet(filteredTasks);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Tasks");
    XLSX.writeFile(workbook, `Tasks_${selectedDate}.xlsx`);
  };

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const month = new Date(selectedDate).getMonth();
  const year = new Date(selectedDate).getFullYear();
  const daysInMonth = getDaysInMonth(month, year);

  return (
    <div className="app-container">
      <h1>Timesheet Tracker</h1>
      <button className="btn btn-primary m-4" onClick={handleShowTaskList}>
        View Task List
      </button>
      <button className="btn btn-secondary m-4" onClick={handleShowAllTasks}>
        View All Tasks
      </button>
      <button
        className="btn btn-success m-4"
        onClick={() => handleShowAddTask(selectedDate)}
      >
        Add Task
      </button>
      <button className="btn btn-info m-4" onClick={exportTasksToExcel}>
        <FontAwesomeIcon icon={faFileExcel} />
      </button>
      <MyCalendar
        tasks={tasks}
        onDateSelect={setSelectedDate}
        onDateDoubleClick={handleShowAddTask}
      />

      <div className="table-responsive">
        <table className="table table-bordered m-4">
          <thead>
            <tr>
              <th>Id</th>
              <th>Task Name</th>
              {[...Array(daysInMonth)].map((_, index) => (
                <th key={index + 1}>{index + 1}</th>
              ))}
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {tasksForSelectedMonth.map((task, index) => (
              <tr key={task.id}>
                <td>{task.id}</td>
                <td>{task.taskDescription}</td>
                {[...Array(daysInMonth)].map((_, day) => {
                  const tasksForDay = getTasksByDate(day + 1);
                  return (
                    <td key={day + 1}>
                      {tasksForDay.length > 0
                        ? tasksForDay.map(t => (
                            <div key={t.id}>{t.taskDescription}</div>
                          ))
                        : null}
                    </td>
                  );
                })}
                <td>{task.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AddTaskModal
        show={showAddTaskModal}
        handleClose={handleCloseAddTask}
        handleChange={(e) =>
          setNewTask({ ...newTask, [e.target.name]: e.target.value })
        }
        handleSaveTask={handleSaveTask}
        newTask={newTask}
        selectedDate={selectedDate}
      />
      <TaskListModal
        show={showTaskListModal}
        handleClose={handleCloseTaskList}
        tasksForSelectedDate={tasksForSelectedMonth}
        selectedDate={selectedDate}
        onDeleteTask={onDeleteTask}
      />
      <AllTasksModal
        show={showAllTasksModal}
        handleClose={handleCloseAllTasks}
        tasks={tasks}
        onDeleteTask={onDeleteTask}
      />
    </div>
  );
};

export default App;
