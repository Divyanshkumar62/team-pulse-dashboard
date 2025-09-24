// src/components/tasks/TaskForm.tsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask } from '../../store/tasksSlice';
import { RootState } from '../../store';
import { v4 as uuidv4 } from 'uuid';

const TaskForm: React.FC = () => {
  const dispatch = useDispatch();
  const members = useSelector((state: RootState) => state.members.entities);
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assignedTo, setAssignedTo] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !assignedTo) return; // minimal validation
    
    dispatch(addTask({
      id: uuidv4(),
      title,
      description,
      assignedTo,
      progress: 0,
      status: 'pending',
    }));

    // Reset form
    setTitle('');
    setDescription('');
    setAssignedTo('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-md w-full max-w-md">
      <h2 className="text-xl font-semibold mb-4">Add Task</h2>

      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 mb-3 w-full rounded"
        required
      />

      <textarea
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border p-2 mb-3 w-full rounded"
      />

      <select
        value={assignedTo}
        onChange={(e) => setAssignedTo(e.target.value)}
        className="border p-2 mb-3 w-full rounded"
        required
      >
        <option value="">Assign to member</option>
        {Object.values(members).map(member => (
          <option key={member?.login.uuid} value={member?.login.uuid}>
            {member?.name.first} {member?.name.last}
          </option>
        ))}
      </select>

      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;
