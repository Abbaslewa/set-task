import { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import moment from 'moment';

const SaveTask = () => {
  const { index } = useParams(); 
  const navigate = useNavigate();
  const { state } = useLocation();
  const { tasks, taskToEdit } = state; 

  const [editedTask, setEditedTask] = useState(taskToEdit.task);

  const handleSave = () => {
  
    tasks[index] = { task: editedTask, date: moment().format("MMMM Do YYYY, h:mm:ss a") };

   
    navigate("/", { state: { updatedTasks: tasks } });
  };

  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <h1 className="text-2xl font-bold mb-4">Edit Task</h1>
      <input
        type="text"
        value={editedTask}
        onChange={(e) => setEditedTask(e.target.value)}
        className="w-[40vw] p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500 mb-4"
      />
      <button
        onClick={handleSave}
        className="bg-blue-600 text-white w-[40vw] p-3 rounded-md hover:bg-blue-700"
      >
        Save Change
      </button>
    </div>
  );
};

export default SaveTask;
