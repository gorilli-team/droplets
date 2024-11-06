import Link from "next/link";

const convertIpfsToHttp = (ipfsUrl: string) => {
  console.log("ipfsUrl", ipfsUrl);
  if (!ipfsUrl) return "";
  let result = ipfsUrl.replace("ipfs://", "https://gw.ipfs-lens.dev/ipfs/");
  console.log("result", result);
  return result;
};

export default function DropsList({ data }: { data: any }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full bg-white shadow-md rounded-lg border-collapse">
        <thead>
          <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Profile</th>
            <th className="py-3 px-6 text-left">Drop Name</th>
            <th className="py-3 px-6 text-left">Description</th>
            <th className="py-3 px-6 text-left">APY</th>
            <th className="py-3 px-6 text-center">Created At</th>
            <th className="py-3 px-6 text-center">TVL</th>
            <th className="py-3 px-6 text-center">Investors</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {data.map((drop, index) => (
            <tr
              key={drop.id}
              className={`border-b border-gray-200 hover:bg-gray-100 ${
                index % 2 === 0 ? "bg-gray-50" : "bg-white"
              }`}
            >
              <td className="py-3 px-6 text-left whitespace-nowrap">
                <Link href={`/profile/${drop.profile.handle.localName}`}>
                  <div className="flex items-center cursor-pointer">
                    {drop.profile.profilePicture && (
                      <div className="w-8 h-8 mr-2 rounded-full overflow-hidden flex items-center justify-center bg-gray-200">
                        <img
                          src={drop.profile.profilePicture.raw.uri}
                          alt={drop.profile.handle.localName}
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>
                    )}
                    <span className="font-medium">
                      {drop.profile.handle.localName}
                    </span>
                  </div>
                </Link>
              </td>
              <td className="py-3 px-6 text-left">
                <span className="font-light text-gray-800">{drop.name}</span>
              </td>
              <td className="py-3 px-6 text-left">
                <span className="font-light text-gray-800">
                  {drop.description}
                </span>
              </td>
              <td className="py-3 px-6 text-left">
                <span className="font-light text-gray-800">{drop.apy}%</span>
              </td>
              <td className="py-3 px-6 text-center">
                <span className="font-medium">{drop.createdAt}</span>
              </td>
              <td className="py-3 px-6 text-center">
                <span className="font-semibold text-green-500">
                  ${drop.tvl.toLocaleString()}
                </span>
              </td>
              <td className="py-3 px-6 text-center">
                {drop.investors ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="font-medium">{drop.investors.number}</div>
                    <div className="flex -space-x-2">
                      {drop.investors.topInvestors &&
                        drop.investors.topInvestors.map((investor, idx) => (
                          <img
                            key={idx}
                            src={investor.profilePicture?.raw.uri}
                            alt={investor.handle?.localName}
                            className="w-6 h-6 rounded-full border-2 border-white"
                          />
                        ))}
                    </div>
                  </div>
                ) : (
                  <span className="text-gray-500 italic">No investors</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
