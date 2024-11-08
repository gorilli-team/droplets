import { useState } from "react";

import PostsList from "./PostsList";
import Transactions from "./ProfileTabs/Transactions";
import { mockedDrops } from "../../mockedData/mockedDrops";

const ProfileSection = ({ publications, profileId, profile }) => {
  // State to track which section is currently active
  const [activeTab, setActiveTab] = useState<
    "posts" | "drops" | "transactions"
  >("drops");

  console.log("profileId", profileId);
  console.log("profile", profile);

  const profileAddress = profile?.ownedBy?.address;

  const drops = mockedDrops.filter(
    (item) => item.profile?.handle?.localName === profileId
  );

  return (
    <div className="mt-6">
      {/* Menu with tabs */}
      <div className="flex space-x-6 border-b pb-2">
        <button
          onClick={() => setActiveTab("drops")}
          className={`text-lg font-bold ${
            activeTab === "drops"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-600"
          }`}
        >
          Drops
        </button>
        <button
          onClick={() => setActiveTab("posts")}
          className={`text-lg font-bold ${
            activeTab === "posts"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-600"
          }`}
        >
          Recent Posts
        </button>
        <button
          onClick={() => setActiveTab("transactions")}
          className={`text-lg font-bold ${
            activeTab === "transactions"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-600"
          }`}
        >
          Transactions
        </button>
      </div>

      {/* Content based on active tab */}
      <div className="mt-4">
        {activeTab === "drops" && (
          <div>
            {drops.length === 0 && (
              <div className="border rounded shadow-sm p-4 bg-white">
                <div className="flex justify-between items-center">
                  No drops available for this profile.
                </div>
              </div>
            )}
            <ul className="mt-4 space-y-4">
              {drops.map((item) => (
                <li
                  key={item.id}
                  className="border rounded shadow-sm p-4 bg-white"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-md font-semibold">{item.name}</p>
                      <p className="text-sm text-gray-500">
                        {item.description}
                      </p>
                    </div>
                    <div>
                      <p className="text-md font-semibold">
                        ${item.tvl.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
        {activeTab === "posts" && (
          <div>
            <PostsList
              publications={publications.items}
              profile={profile}
              prev={publications?.pageInfo?.prev}
              next={publications?.pageInfo?.next}
            />
          </div>
        )}

        {activeTab === "transactions" && (
          <Transactions profileAddress={profileAddress} />
        )}
      </div>
    </div>
  );
};

export default ProfileSection;
