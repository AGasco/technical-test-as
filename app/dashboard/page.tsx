import { authOptions } from 'app/api/auth';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import DashboardContent from './DashboardContent';

const DashboardPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session) redirect('/login');

  return (
    <div className="min-h-full flex flex-col px-4 w-full">
      <DashboardContent />
    </div>
  );
};

export default DashboardPage;
