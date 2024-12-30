import { Layout } from "../../src/components/Layout";
import ProfileDetailsClient from "../../src/components/Profile/ProfileDetailsClient";
import UserProfile from "../../src/components/Profile/UserProfile";

interface ProfileDetailsProps {
  params: {
    handle: string;
  };
}

export default function ProfileDetails({ params }: ProfileDetailsProps) {
  const { handle } = params;

  return (
    <Layout>
      <div className="w-full p-4 bg-gray-900">
        <UserProfile />
      </div>
    </Layout>
  );
}
