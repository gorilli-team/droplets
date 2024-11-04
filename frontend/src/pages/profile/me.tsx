import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { useAccount } from "wagmi";

import {
  GET_PROFILE_BY_HANDLE,
  GET_PUBLICATIONS_BY_PROFILE_ID,
} from "../../lib/queries";
import { Layout } from "../../components/Layout";
import Spinner from "../../components/Spinner";
import ProfileSection from "../../components/Profile/ProfileSection";
import { convertIpfsToHttp } from "../../utils";
import { Profile } from "../../types/Profile";

const formattedDate = (thisDate: string) => {
  return new Date(thisDate).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export default function ProfileDetails() {
  const router = useRouter();
  const { handle } = router.query;

  // Fetch the profile details using the handle from the URL
  const {
    loading: profileLoading,
    error: profileError,
    data: profileData,
  } = useQuery(GET_PROFILE_BY_HANDLE, {
    variables: { handle: `lens/${handle}` },
    skip: !handle, // Skip the query if handle is missing
  });

  const profileId = profileData?.profile?.id;

  // Fetch publications using the profileId
  const {
    loading: publicationsLoading,
    error: publicationsError,
    data: publicationsData,
  } = useQuery(GET_PUBLICATIONS_BY_PROFILE_ID, {
    variables: { profileId: [profileId] },
    skip: !profileId, // Skip the query if profileId is missing
  });

  const publications = publicationsData?.publications;

  if (profileLoading || publicationsLoading) {
    return (
      <Layout>
        <div className="flex justify-center items-center w-full h-96">
          <Spinner />
        </div>
      </Layout>
    );
  }

  if (profileError || publicationsError) {
    return (
      <Layout>
        <div className="flex justify-center items-center w-full h-96">
          <p>Error: {profileError?.message || publicationsError?.message}</p>
        </div>
      </Layout>
    );
  }

  const profile: Profile = profileData?.profile;

  // Extract cover picture URI
  const coverPictureUri = convertIpfsToHttp(
    profile?.metadata?.coverPicture?.optimized?.uri || ""
  );

  // Extract profile picture URI
  const profilePictureUri = convertIpfsToHttp(
    profile?.metadata?.picture?.optimized?.uri || ""
  );

  return (
    <Layout>
      <div className="w-full p-4 bg-gray-100">
        {/* CREATE A PLACEHOLDER PAGE */}
        <div className="flex justify-center items-center w-full h-96">
          <p>Profile Details for {handle}</p>
          yoyoyo
        </div>
      </div>
    </Layout>
  );
}
