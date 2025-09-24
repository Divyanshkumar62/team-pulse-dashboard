import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';


export interface Task {
  id: string;
  title: string;
  description?: string;
  assignedTo: string; // member ID
  progress: number; // 0-100
  status: 'pending' | 'in-progress' | 'completed';
}

const tasksAdapter = createEntityAdapter<Task>({
  sortComparer: (a, b) => a.progress - b.progress, // optional, sorted by progress
});

const initialState = tasksAdapter.getInitialState();

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: tasksAdapter.addOne,
    updateTask: tasksAdapter.updateOne, // payload: {id, changes}
    removeTask: tasksAdapter.removeOne,
  },
});

export const { addTask, updateTask, removeTask } = tasksSlice.actions;
export const tasksSelectors = tasksAdapter.getSelectors((state: any) => state.tasks);
export default tasksSlice.reducer;
