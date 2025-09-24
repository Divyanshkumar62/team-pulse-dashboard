import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hook';
import {
  fetchMembers,
  selectAllMembers,
  selectMembersStatus,
  selectMembersError,
} from '../features/members/membersSlice';

export default function MembersList() {
  const dispatch = useAppDispatch();
  const members = useAppSelector(selectAllMembers);
  const status = useAppSelector(selectMembersStatus);
  const error = useAppSelector(selectMembersError);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchMembers());
    }
  }, [status, dispatch]);

  if (status === 'loading') return <p>Loading members...</p>;
  if (status === 'failed') return <p>Error: {error}</p>;

  return (
    <ul className="space-y-3">
      {members.map((m) => (
        <li
          key={m.id}
          className="flex items-center gap-3 p-3 rounded-lg shadow bg-white dark:bg-gray-800"
        >
          <img src={m.avatar} alt={m.name} className="w-10 h-10 rounded-full" />
          <div>
            <p className="font-medium">{m.name}</p>
            <p className="text-sm text-gray-500">{m.email}</p>
          </div>
          <span className="ml-auto text-xs px-2 py-1 rounded bg-gray-200 dark:bg-gray-700">
            {m.status}
          </span>
        </li>
      ))}
    </ul>
  );
}
