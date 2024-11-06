"use client";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { useAccount } from "@particle-network/connectkit";

import {
  GET_PROFILE_BY_HANDLE,
  GET_PUBLICATIONS_BY_PROFILE_ID,
} from "@/lib/queries";
import { Layout } from "@/components/Layout";
import Spinner from "@/components/Spinner";
import ProfileSection from "@/components/Profile/ProfileSection";
import { convertIpfsToHttp } from "@/utils";
import { Profile } from "@/types/Profile";

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
        {/* Render ProfileSection only if profileId exists */}
        {profileId ? (
          <div>
            <div className="border rounded shadow-sm bg-white">
              {/* Cover Picture */}
              {coverPictureUri ? (
                <div className="max-h-36 overflow-hidden">
                  <img
                    src={coverPictureUri}
                    alt={`${profile?.handle?.localName} Cover Picture`}
                    className="w-full h-auto object-cover rounded-t"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                </div>
              ) : (
                <div className="max-h-36 bg-gray-200 rounded-t"></div>
              )}

              <div className="flex">
                <div className="w-24 h-24 m-4">
                  {profilePictureUri ? (
                    <div className="w-24 h-24 mb-4 mx-auto">
                      <img
                        src={profilePictureUri}
                        alt={`${profile?.handle?.localName} Profile Picture`}
                        className="w-full h-full object-cover rounded-full"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    </div>
                  ) : (
                    <div className="w-24 h-24 mb-4 mx-auto bg-gray-200 rounded-full"></div>
                  )}
                </div>
                <div className="p-4">
                  <div className="flex items-center space-x-2 mt-4">
                    <h2 className="text-2xl font-bold">
                      {profile?.handle?.localName}
                    </h2>
                    <a
                      href={`https://hey.xyz/u/${profile?.handle?.localName}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-700"
                      aria-label="View on hey.xyz"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        className="w-5 h-5"
                      >
                        <path d="M320 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l82.7 0L201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L448 109.3l0 82.7c0 17.7 14.3 32 32 32s32-14.3 32-32l0-160c0-17.7-14.3-32-32-32L320 0zM80 32C35.8 32 0 67.8 0 112L0 432c0 44.2 35.8 80 80 80l320 0c44.2 0 80-35.8 80-80l0-112c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 112c0 8.8-7.2 16-16 16L80 448c-8.8 0-16-7.2-16-16l0-320c0-8.8 7.2-16 16-16l112 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L80 32z" />
                      </svg>
                    </a>
                  </div>

                  <p className="text-sm text-gray-500">
                    Created at: {formattedDate(profile?.createdAt)}
                  </p>
                  <p className="text-lg text-gray-600 mt-2">
                    {profile?.metadata?.bio}
                  </p>
                </div>
              </div>
            </div>

            <ProfileSection
              publications={publications}
              profileId={profileId}
              profile={profile}
            />
          </div>
        ) : (
          <div>
            <div className="border rounded shadow-sm p-4 bg-white">
              <div className="flex justify-between items-center">
                Profile not found for handle: {handle}
              </div>
              <div className="flex justify-between items-center">
                Create here your lens profile to start investing together with
                the community.
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
