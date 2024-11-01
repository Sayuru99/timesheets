#### Prerequisites

1. **Node.js**: Make sure you have [Node.js](https://nodejs.org/) installed on your machine. This will allow you to run the React application.
2. **Git**: Ensure you have [Git](https://git-scm.com/) installed for version control.

#### Step 1: Clone the Repository

If you haven’t already uploaded your project to GitHub, you can create a new folder and clone the code from a local source:

```bash
git clone https://github.com/yourusername/your-repository-name.git
cd your-repository-name
```

If you haven’t pushed it to GitHub yet, you can create the project folder manually.

#### Step 2: Install Dependencies

Navigate to your project directory and run the following command to install the required dependencies:

```bash
npm install
```

This will install all the packages specified in your `package.json` file.

#### Step 3: Set Up the Backend (Optional)

If you have a backend API for task management, ensure it’s running. You can create a simple JSON server for demonstration purposes:

1. **Install JSON Server**:

   ```bash
   npm install -g json-server
   ```

2. **Create a `db.json` file** in the root of your project with sample tasks:

   ```json
   {
     "tasks": [
       {
         "id": 1,
         "taskDescription": "Sample Task 1",
         "hoursWorked": 2,
         "status": "Pending",
         "date": "2024-11-01"
       },
       {
         "id": 2,
         "taskDescription": "Sample Task 2",
         "hoursWorked": 3,
         "status": "Done",
         "date": "2024-11-02"
       }
     ]
   }
   ```

3. **Run JSON Server**:
   ```bash
   json-server --watch db.json --port 5000
   ```

This will create a RESTful API at `http://localhost:5000/tasks`.

#### Step 4: Start the React Application

Now, you can start the React application:

```bash
npm start
```

This will run the app in development mode and open it in your default web browser at `http://localhost:3000`.

#### Step 5: Demo Features

Once the application is running, you can showcase the following features:

1. **Adding Tasks**:

   - Click the "Add Task" button.
   - Fill in the task name, hours worked, and select a status.
   - Save the task and observe it appearing in the task list.

2. **Viewing Tasks**:

   - Click "View Task List" to see tasks for the selected date.
   - Click "View All Tasks" to see all tasks listed.

3. **Deleting Tasks**:

   - In the task list, you can delete tasks by clicking the "Delete" button next to a task.

4. **Exporting to Excel**:

   - Click the export button to download the tasks as an Excel file.

5. **Calendar Interaction**:
   - Click on dates in the calendar to select them, or double-click to add a task directly for that date.
