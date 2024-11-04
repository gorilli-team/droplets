// pages/profiles.tsx
import { useQuery } from "@apollo/client";
import { GET_ALL_PROFILES } from "../lib/queries";
import { Layout } from "../components/Layout";
import Spinner from "../components/Spinner";
import ProfilesList from "../components/Profiles/ProfilesList";

type ProfilePicture = {
  raw: {
    uri: string;
  };
};

type Profile = {
  id: string;
  handle: {
    localName: string;
  };
  metadata: {
    bio: string;
    picture?: ProfilePicture;
  };
};

const handleNext = () => {};

const handlePrev = () => {};

export default function Profiles() {
  const { loading, error, data } = useQuery(GET_ALL_PROFILES);
  console.log(data);

  if (loading)
    return (
      <Layout>
        <div className="flex justify-center items-center w-full h-96">
          <Spinner />
        </div>
      </Layout>
    );
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Layout>
      <div className="mt-4 p-4">
        <h1 className="text-2xl font-bold">Profiles</h1>
        <div className="mt-4">
          <ProfilesList data={data} />
        </div>
        <div className="mt-4 flex space-x-4">
          <button
            onClick={handlePrev}
            // disabled={currentPage === 1}
            className="bg-gray-200 text-black py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Prev
          </button>
          <button
            onClick={handleNext}
            // disabled={indexOfLastProfile >= data.length}
            className="bg-gray-200 text-black py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    </Layout>
  );
}
