import Header from './components/Header';
import MembersList from './components/MembersList';
import { useAppSelector } from './app/hook';
import { selectCurrentRole } from './features/role/roleSlice';

function App() {
  const role = useAppSelector(selectCurrentRole);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Header />
      <main className="p-6 space-y-6">
        <h2 className="text-xl font-semibold">Current Pulse</h2>
        <p>
          You are logged in as: <strong>{role}</strong>
        </p>

        <section>
          <h3 className="text-lg font-semibold mb-3">Team Members</h3>
          <MembersList />
        </section>
      </main>
    </div>
  );
}

export default App;
