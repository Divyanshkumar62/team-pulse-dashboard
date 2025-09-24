import { configureStore } from '@reduxjs/toolkit';
import roleReducer from '../features/role/roleSlice';
import membersReducer from '../features/members/membersSlice';
import tasksReducer from '../features/tasks/tasksSlice'

export const store = configureStore({
  reducer: {
    role: roleReducer,
    members: membersReducer,
    tasks: tasksReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
