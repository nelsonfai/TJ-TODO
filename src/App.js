import React, { useState, useEffect ,useRef} from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import DeleteModal from './components/DeleteModal';

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState (null);
  const dragItem = useRef()
  const dragOverItem = useRef()
  const [filter, setFilter] = useState('all');

  const [tasks, setTasks] = useState(() => {
  const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });


  // function returns a list of tasks filtered into all,completed and incomplete
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'completed') return task.completed;
    if (filter === 'incomplete') return !task.completed;
    return true;
  });

  // Updates the task list in Local storage as the Tasks list changes
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // add a new task item 
  const addTask = (text) => {
    setTasks([
      ...tasks,
      { id: Date.now(), text, completed: false }
    ]);
  };

 // delete item after user confirms delete
  const deleteTask = (confirm) => {
    if (confirm){
      setTasks(tasks.filter((task) => task.id !== taskToDelete));
    }
    setIsModalOpen(false)

};

// Shows the  delete confirmation modal 
const initialDelete = (id) => {
    setIsModalOpen(true)
    setTaskToDelete(id)
  }

// updates a task text
  const editTask = (id, newText) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, text: newText } : task
      )
    );
  };

  // toggle task from completed to incomplete text
  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };
   
 // update Sort order in Tasks array
function moveItemInArray(dragItem, dragOverItem) {
  const newArray = [...tasks];
  const draggedItem = newArray[dragItem];
  // remove the task to be moves from the tasks list 
  newArray.splice(dragItem, 1);
  // add task at new position
  newArray.splice(dragOverItem, 0, draggedItem);

  return newArray;
}

  const sortList = () => {
 
    console.log(dragItem,dragOverItem)
      // reorder and create new list
        const sortedlist= moveItemInArray(dragItem.current,dragOverItem.current)
      // update list in local storage
      setTasks(sortedlist)
     
    }
  
  

  return (
<div className="max-w-[600px] mt-6 mx-auto px-2 ">
    
      <h1 className="text-3xl font-bold underline">To-Do List</h1>
      <TaskForm onAdd={addTask} />
      <div className="mt-3">
        <button  onClick={() => setFilter('all')} type="button" class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">All</button>
        <button onClick={() => setFilter('completed')}type="button" class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Completed</button>
        <button  onClick={() => setFilter('incomplete')}type="button" class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Incomplete</button>
      </div>
      <TaskList
        tasks={filteredTasks}
        onToggle={toggleTask}
        onDelete={initialDelete}
        onEdit={editTask}
        onMove = {sortList}
        dragItem ={dragItem}
        dragOverItem ={dragOverItem}
      />
      <DeleteModal
        isOpen={isModalOpen}
        deleteChoice={deleteTask}
      />
    </div>
  );
};

export default App;
