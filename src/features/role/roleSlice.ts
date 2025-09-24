// src/features/role/roleSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';

export type Role = 'teamLead' | 'teamMember';

export interface RoleState {
  currentRole: Role;
  currentUserId: string | null;
}

const initialState: RoleState = {
  currentRole: 'teamLead',
  currentUserId: null,
};

const roleSlice = createSlice({
  name: 'role',
  initialState,
  reducers: {
    setRole(state, action: PayloadAction<Role>) {
      state.currentRole = action.payload;
    },
    toggleRole(state) {
      state.currentRole = state.currentRole === 'teamLead' ? 'teamMember' : 'teamLead';
    },
    setCurrentUser(state, action: PayloadAction<string | null>) {
      state.currentUserId = action.payload;
    },
  },
});

export const { setRole, toggleRole, setCurrentUser } = roleSlice.actions;


export const selectCurrentRole = (state: RootState) => state.role.currentRole;
export const selectCurrentUserId = (state: RootState) => state.role.currentUserId;

export default roleSlice.reducer;
