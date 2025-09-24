// src/components/dashboard/Dashboard.tsx
import React from 'react';
import TaskForm from '../tasks/TaskForm';
import TaskList from '../tasks/TaskList';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const Dashboard: React.FC = () => {
  const role = useSelector((state: RootState) => state.role.currentRole);
  const memberId = useSelector((state: RootState) => state.members.currentMemberId); // optional for member view

  return (
    <div className="p-6 space-y-6">
      {role === 'TeamLead' && <TaskForm />}
      <TaskList role={role} memberId={memberId} />
    </div>
  );
};

export default Dashboard;
