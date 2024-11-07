import { Layout } from '@/components/Layout';
import ProfileDetailsClient from '@/components/Profile/ProfileDetailsClient';
import UserProfile from '@/components/Profile/UserProfile';

interface ProfileDetailsProps {
  params: {
    handle: string;
  };
}

export default function ProfileDetails({ params }: ProfileDetailsProps) {
  const { handle } = params;

  return (
    <Layout>
      <div className="w-full p-4 bg-gray-100">
        <UserProfile />
      </div>
    </Layout>
  );
}
