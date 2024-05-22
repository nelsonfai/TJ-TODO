import React from 'react';
import Task from './Task';

const TaskList = ({ tasks, onToggle, onDelete, onEdit,onMove,dragItem,dragOverItem }) => {
  return (
    <div className="task-list">
      {tasks.map((task,index) => (
        <Task
          key={task.id}
          index = {index}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
          onMove ={onMove}
          dragItem ={dragItem}
          dragOverItem ={dragOverItem}
        />
      ))}
      { tasks.length <= 0 && <p className='mt-6'> No Task in this category.Start by Adding a New task</p>}
    </div>
  );
};

export default TaskList;
