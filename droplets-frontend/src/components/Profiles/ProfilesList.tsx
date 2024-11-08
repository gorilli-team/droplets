import Link from "next/link";

// Profile Interface
interface Profile {
  id: string;
  handle: {
    localName: string;
    namespace?: string;
  };
  metadata: {
    bio?: string;
    picture?: {
      raw?: {
        uri?: string;
      };
    };
  };
  stats: {
    followers: number;
    following: number;
    posts: number;
  };
}

const convertIpfsToHttp = (ipfsUrl: string) => {
  if (!ipfsUrl) return "";
  let result = ipfsUrl.replace("ipfs://", "https://gw.ipfs-lens.dev/ipfs/");
  return result;
};

export default function ProfilesList({ data }: { data: any }) {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {data?.exploreProfiles?.items.map((profile: Profile) => (
        <Link href={`/profile/${profile.handle?.localName}`} key={profile.id}>
          <li className="p-4 border rounded shadow-sm hover:shadow-lg transition-shadow duration-300">
            <div className="flex justify-between items-center mb-2">
              {profile.handle?.localName ? (
                <p className="font-bold text-lg">
                  {profile?.handle?.localName}
                </p>
              ) : (
                <p className="font-bold text-lg">No handle</p>
              )}
            </div>
            <p className="text-xs text-gray-600 h-12 overflow-y-auto mb-4">
              {profile?.metadata?.bio}
            </p>
            {profile?.metadata?.picture?.raw?.uri ? (
              <div className="w-full pt-[100%] relative mb-4">
                <img
                  src={convertIpfsToHttp(profile?.metadata?.picture?.raw?.uri)}
                  alt={profile?.handle?.localName}
                  className="absolute top-0 left-0 w-full h-full rounded object-cover"
                  onError={(e) => (e.currentTarget.style.display = "none")}
                />
              </div>
            ) : (
              <div className="w-full pt-[100%] relative mb-4 bg-gray-200"></div>
            )}
            {/* Stats Section */}
            <div className="flex justify-between items-center text-sm text-gray-700 px-2">
              <div className="flex items-center font-semibold">
                {profile.stats.following} <br /> Following
              </div>
              <div className="flex items-center font-semibold">
                {profile.stats.followers} <br /> Followers
              </div>
            </div>
          </li>
        </Link>
      ))}
    </ul>
  );
}
