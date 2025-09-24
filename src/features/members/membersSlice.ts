import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';

// 1. Define TypeScript types
export interface Member {
  id: string;
  name: string;
  email: string;
  avatar: string;
  status: 'online' | 'offline' | 'busy';
}

interface MembersState {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// 2. Entity adapter for normalized state
const membersAdapter = createEntityAdapter<Member>();

// 3. Async thunk for fetching random users
export const fetchMembers = createAsyncThunk<Member[]>(
  'members/fetchMembers',
  async () => {
    const res = await fetch('https://randomuser.me/api/?results=5&nat=us');
    const data = await res.json();

    // Map API response → Member[]
    return data.results.map((user: any) => ({
      id: user.login.uuid,
      name: `${user.name.first} ${user.name.last}`,
      email: user.email,
      avatar: user.picture.thumbnail,
      status: 'offline' as const, // default initial status
    }));
  }
);

// 4. Initial state using adapter
const initialState = membersAdapter.getInitialState<MembersState>({
  status: 'idle',
  error: null,
});

// 5. Slice
const membersSlice = createSlice({
  name: 'members',
  initialState,
  reducers: {
    updateStatus: (state, action) => {
      const { id, status } = action.payload as { id: string; status: Member['status'] };
      membersAdapter.updateOne(state, { id, changes: { status } });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMembers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMembers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        membersAdapter.setAll(state, action.payload);
      })
      .addCase(fetchMembers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Failed to fetch members';
      });
  },
});

// 6. Export actions + selectors
export const { updateStatus } = membersSlice.actions;

export const {
  selectAll: selectAllMembers,
  selectById: selectMemberById,
} = membersAdapter.getSelectors<RootState>((state) => state.members);

export const selectMembersStatus = (state: RootState) => state.members.status;
export const selectMembersError = (state: RootState) => state.members.error;

export default membersSlice.reducer;
