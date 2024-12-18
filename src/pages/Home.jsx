import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import moment from 'moment';
import { Plus, Box, Edit, Trash2 } from 'lucide-react';

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.updatedTasks) {
      setTasks(location.state.updatedTasks);
    }
  }, [location.state]);

  const handleAddTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { task: newTask, date: moment().format("MMMM Do YYYY, h:mm:ss a") }]);
      setNewTask('');
    }
  };

  const handleDeleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const handleEditTask = (index) => {
    navigate(`/save-task/${index}`, {
      state: {
        tasks,
        taskToEdit: tasks[index],
      },
    });
  };

  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <h1 className="text-2xl font-bold mb-4">Task Tracker</h1>

      <div className="flex gap-5">
        <input
          type="text"
          placeholder="Enter task"
          className="w-[37vw] p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button
          className="flex items-center gap-3 bg-blue-700 text-white w-20 p-3 rounded-md hover:bg-blue-600 justify-center"
          onClick={handleAddTask}
        >
          <Plus className="w-4 h-4" />
          Add
        </button>
      </div>

      {tasks.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-10">
          <Box className="w-16 h-16 text-gray-500" />
          <p className="text-gray-500 mt-2">No tasks yet</p>
        </div>
      ) : (
        <div className="mt-7 w-[45vw]">
          {tasks.map((task, index) => (
            <div
              key={index}
              className="border border-gray-300 outline outline-1 outline-gray-200 p-1 flex justify-between items-center bg-white rounded-lg shadow-md mb-3"
            >
              <div className="flex flex-col">
                <span>{task.task}</span>
                <span className="text-sm text-gray-500">{task.date}</span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleEditTask(index)}
                  className=" rounded-md text-blue-700 "
                >
                  <Edit className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleDeleteTask(index)}
                  className="text-red-500  rounded-md "
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
