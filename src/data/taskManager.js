const API_URL = "http://localhost:5000/tasks";

export const getTasks = async () => {
  const response = await fetch(API_URL);
  return response.json();
};

export const addTask = async (task) => {
  await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });
};

export const deleteTask = async (taskId) => {
  await fetch(`${API_URL}/${taskId}`, {
    method: "DELETE",
  });
};
