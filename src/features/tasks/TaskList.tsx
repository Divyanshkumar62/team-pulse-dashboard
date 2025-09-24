// src/components/tasks/TaskList.tsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { updateTask } from '../../store/tasksSlice';

interface TaskListProps {
  role: 'TeamLead' | 'TeamMember';
  memberId?: string; // For Team Member view
}

const TaskList: React.FC<TaskListProps> = ({ role, memberId }) => {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => Object.values(state.tasks.entities));

  const filteredTasks = tasks.filter(task => {
    if (role === 'TeamLead') return true;
    if (role === 'TeamMember' && memberId) return task?.assignedTo === memberId;
    return false;
  });

  const handleProgressChange = (id: string, progress: number) => {
    if (progress < 0 || progress > 100) return;
    dispatch(updateTask({ id, changes: { progress, status: progress === 100 ? 'completed' : 'in-progress' } }));
  };

  return (
    <div className="space-y-4">
      {filteredTasks.map(task => (
        <div key={task?.id} className="border rounded p-3 flex flex-col md:flex-row md:justify-between items-start md:items-center bg-white shadow-sm">
          <div className="mb-2 md:mb-0">
            <h3 className="font-semibold">{task?.title}</h3>
            <p className="text-sm text-gray-600">{task?.description}</p>
            <p className="text-xs text-gray-500">Assigned to: {task?.assignedTo}</p>
          </div>

          <div className="flex items-center space-x-2 w-full md:w-auto">
            <input
              type="range"
              min={0}
              max={100}
              value={task?.progress || 0}
              onChange={(e) => handleProgressChange(task!.id, Number(e.target.value))}
              className="flex-1"
              disabled={role === 'TeamLead' ? false : memberId !== task?.assignedTo}
            />
            <span className="w-12 text-right">{task?.progress}%</span>
          </div>
        </div>
      ))}
      {filteredTasks.length === 0 && <p className="text-gray-500">No tasks assigned.</p>}
    </div>
  );
};

export default TaskList;
