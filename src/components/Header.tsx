// src/components/Header.tsx
import { useAppDispatch, useAppSelector } from '../app/hook';
import { toggleRole, selectCurrentRole } from '../features/role/roleSlice';

export default function Header() {
  const dispatch = useAppDispatch();
  const role = useAppSelector(selectCurrentRole);

  return (
    <header className="flex justify-between items-center px-6 py-4 bg-gray-100 dark:bg-gray-800 shadow">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Team Pulse Dashboard
      </h1>
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
          Role: <strong>{role}</strong>
        </span>
        <button
          onClick={() => dispatch(toggleRole())}
          className="px-3 py-1 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition"
        >
          Switch Role
        </button>
      </div>
    </header>
  );
}
