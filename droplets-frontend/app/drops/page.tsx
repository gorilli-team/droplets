"use client";
import { Layout } from "@/components/Layout";
import DropsList from "@/components/Drops/DropsList";
import { mockedDrops } from "@/mockedData/mockedDrops";

const handleNext = () => {};

const handlePrev = () => {};

export default function Drops() {
  const data = mockedDrops;

  return (
    <Layout>
      <div className="w-full mt-4 p-4">
        <h1 className="text-2xl font-bold">Drops</h1>
        <div className="mt-4">
          <DropsList data={data} />
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
