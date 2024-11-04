import ReactMarkdown from "react-markdown";
import YouTubePlayer from "react-player/youtube";
import { useState } from "react";
import { useAccount } from "wagmi";

const formattedDate = (thisDate: string) => {
  return new Date(thisDate).toLocaleString("en-US", {
    weekday: "long", // e.g., "Monday"
    year: "numeric", // e.g., "2024"
    month: "long", // e.g., "August"
    day: "numeric", // e.g., "26"
    hour: "2-digit", // e.g., "04 PM"
    minute: "2-digit", // e.g., "35"
    second: "2-digit", // e.g., "07"
    hour12: true, // 12-hour clock (AM/PM)
  });
};

const getFromContentOnlyYoutubeUrl = (content: string): string | null => {
  const regex =
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/g;
  const found = content.match(regex);
  if (found && found.length > 0) {
    return found[0]; // Return the first found YouTube URL
  }
  return null; // Return null if no URL is found
};

export default function PostsList({ publications, profile, prev, next }) {
  console.log("check publications", publications);
  const [newPostContent, setNewPostContent] = useState("");

  console.log("check prev", prev);
  console.log("check next", next);
  const ownedByAddress = profile?.ownedBy?.address;

  const { address } = useAccount();
  console.log("check address", address);

  const handlePostSubmit = () => {
    console.log("New post content:", newPostContent);
    // Add logic to handle the post submission
  };

  return (
    <div className="mt-4">
      <div>
        {address && (
          <>
            {ownedByAddress === address && (
              <div className="flex border rounded shadow-sm p-4 bg-white space-x-4">
                <textarea
                  className="w-full p-2 border rounded"
                  placeholder="What do you think?"
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                />
                <button
                  onClick={handlePostSubmit}
                  className=" bg-blue-500 text-white py-2 px-4 rounded h-12"
                >
                  Post
                </button>
              </div>
            )}
          </>
        )}
        <ul className="mt-4 space-y-4">
          {publications?.map(
            (post: any) =>
              post?.__typename === "Post" && (
                <li
                  key={post.id}
                  className="border rounded shadow-sm p-4 bg-white"
                >
                  <p className="text-sm text-gray-500">
                    {formattedDate(post.createdAt)}
                  </p>
                  <div className="text-md text-gray-600 mt-2">
                    <ReactMarkdown>{post.metadata?.content}</ReactMarkdown>
                  </div>
                  {/* Stats Section */}
                  <div className="flex items-center space-x-4 text-sm text-gray-700 mt-4 font-semibold">
                    <div>{post.stats.comments} Comments</div>
                    <div>{post.stats.reactions} Likes</div>
                    <div>{post.stats.mirrors} Mirrors</div>
                  </div>
                  {getFromContentOnlyYoutubeUrl(post.metadata?.content) && (
                    <div className="mt-4">
                      <YouTubePlayer
                        url={getFromContentOnlyYoutubeUrl(
                          post.metadata?.content
                        )}
                      />
                    </div>
                  )}
                </li>
              )
          )}
        </ul>

        <div className="mt-4 flex space-x-4">
          <button
            onClick={() => {
              console.log("prev");
            }}
            disabled={!prev}
            className="bg-gray-200 text-black py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Prev
          </button>
          <button
            onClick={() => {
              console.log("next");
            }}
            disabled={!next}
            className="bg-gray-200 text-black py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
