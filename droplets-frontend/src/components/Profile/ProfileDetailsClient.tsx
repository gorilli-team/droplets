// components/Profile/ProfileDetailsClient.tsx
"use client";

import { useQuery } from "@apollo/client";
import Spinner from "../Spinner";
import {
  GET_PROFILE_BY_HANDLE,
  GET_PUBLICATIONS_BY_PROFILE_ID,
} from "../../lib/queries";
import { convertIpfsToHttp } from "../../utils";
import { Profile } from "../../types/Profile";

interface ProfileDetailsClientProps {
  handle: string;
}

const formattedDate = (thisDate: string) => {
  return new Date(thisDate).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export default function ProfileDetailsClient({
  handle,
}: ProfileDetailsClientProps) {
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

  if (profileLoading || publicationsLoading) {
    return (
      <div className="flex justify-center items-center w-full h-96">
        <Spinner />
      </div>
    );
  }

  if (profileError || publicationsError) {
    return (
      <div className="flex justify-center items-center w-full h-96">
        <p>Error: {profileError?.message || publicationsError?.message}</p>
      </div>
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
    <div className="flex flex-col items-center w-full h-96">
      <h1>Profile Details for {handle}</h1>
      <img src={profilePictureUri} alt={`${handle}'s profile`} />
      <p>
        Cover Picture:{" "}
        {coverPictureUri ? (
          <img src={coverPictureUri} alt="Cover" />
        ) : (
          "No cover image"
        )}
      </p>
      <p>Join Date: {profile && formattedDate(profile.createdAt)}</p>
      {/* Render additional profile and publication details as needed */}
    </div>
  );
}
