import React, { useState } from 'react';

const TaskForm = ({ onAdd }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text);
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center mt-6 w-full">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new task"
        className="px-4 py-2 border border-gray-200 rounded-sm shadow-sm mr-1 w-5/6"
      />
      <button type="submit" className="px-4 py-2 bg-black text-white rounded-sm hover:bg-black-700 w-40">
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;
