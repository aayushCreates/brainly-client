import Navbar from "@/components/Navbar";
import axios from "axios";
import { GetServerSidePropsContext } from "next";
import { useState, FormEvent } from "react";
import { FiExternalLink } from "react-icons/fi";
import { IoClose, IoShareSocial } from "react-icons/io5";

type ContentType = "IMAGE" | "VIDEO" | "ARTICLE" | "AUDIO";

interface Content {
  id: string;
  title: string;
  type: ContentType;
  url?: string;
  tags: string[];
}

async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const url = process.env.NEXT_PUBLIC_BASE_API_URL as string;

    const { data } = await axios.get(url);
    if (!data.success) {
      return {
        data: [],
      };
    }

    return {
      data: data.data,
    };
  } catch (err) {
    return {
      data: [],
    };
  }
}

const dummyData: Content[] = [
  { id: "1", title: "React Basics", type: "ARTICLE", tags: ["React", "JS"] },
  {
    id: "2",
    title: "Node.js Video",
    type: "VIDEO",
    url: "https://www.youtube.com/watch?v=JOqQQlb00Cw",
    tags: ["Node"],
  },
  {
    id: "3",
    title: "Beautiful Image",
    type: "IMAGE",
    url: "https://images.unsplash.com/photo-1765407990623-7c0fcbae38a7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzM3x8fGVufDB8fHx8fA%3D%3D",
    tags: ["Photography"],
  },
  {
    id: "4",
    title: "Music Audio",
    type: "IMAGE",
    url: "https://images.unsplash.com/photo-1765218111706-960690aed429?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw3NXx8fGVufDB8fHx8fA%3D%3D.",
    tags: ["Music"],
  },
  {
    id: "5",
    title: "Advanced TypeScript",
    type: "ARTICLE",
    tags: ["TS", "Programming"],
  },
  {
    id: "2",
    title: "Node.js Video",
    type: "IMAGE",
    url: "https://images.unsplash.com/photo-1765207076336-d4100910fd77?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw4Mnx8fGVufDB8fHx8fA%3D%3D",
    tags: ["Node"],
  },
  {
    id: "3",
    title: "Beautiful Image",
    type: "IMAGE",
    url: "https://plus.unsplash.com/premium_photo-1764536654639-8c69698fabf9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyNzl8fHxlbnwwfHx8fHw%3D",
    tags: ["Photography"],
  },
  {
    id: "4",
    title: "Music Audio",
    type: "AUDIO",
    url: "https://plus.unsplash.com/premium_photo-1764896098514-f4c4cfa6a62e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyNjB8fHxlbnwwfHx8fHw%3D",
    tags: ["Music"],
  },
];

const Hero: React.FC = () => {
  const [search, setSearch] = useState<string>("");
  const [isAddContentOpen, setIsAddContentOpen] = useState<boolean>(false);

  const [title, setTitle] = useState<string>("");
  const [url, setUrl] = useState<string>("");
  const [type, setType] = useState<ContentType>("IMAGE");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState<string>("");


  const handleCloseModal = () => {
    setTitle("");
    setUrl("");
    setType("IMAGE");
    setTagInput("");
    setTags([]);
    setIsAddContentOpen(false);
  };

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput.trim() !== "") {
      e.preventDefault();
      setTags((prev) => [...prev, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (index: number) => {
    setTags((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const contentData = { title, url, type, tags };
    setTitle("");
    setUrl("");
    setType("IMAGE");
    setTags([]);
    setIsAddContentOpen(false);
  };

  const filteredData = dummyData.filter(
    (item) =>
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar />

      {/* Hero / Search Section */}
      {/* Modal */}
      {isAddContentOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={handleCloseModal}
          ></div>

          {/* Modal content */}
          <div className="relative bg-white rounded-lg shadow-lg w-96 p-6 z-10 transform transition-transform duration-300 scale-100">
            {/* Close button */}
            <button
              onClick={handleCloseModal}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 font-bold"
            >
              <IoClose className="h-5 w-5" />
            </button>

            <h2 className="text-xl font-semibold mb-4">Create Card</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <label className="flex flex-col">
                Type
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as ContentType)}
                  className="border p-2 rounded-sm mt-1 border-black/20"
                >
                  <option value="IMAGE">Image</option>
                  <option value="VIDEO">Video</option>
                  <option value="ARTICLE">Article</option>
                  <option value="AUDIO">Audio</option>
                </select>
              </label>

              <label className="flex flex-col">
                Title
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="border p-2 rounded-sm mt-1 border-black/20"
                  placeholder="Enter title"
                  required
                />
              </label>

              <label className="flex flex-col">
                URL
                <input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="border p-2 rounded-sm mt-1 border-black/20"
                  placeholder="Optional URL"
                />
              </label>

              <label className="flex flex-col">
                Tags (Press Enter to add)
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleTagKeyDown}
                  className="border p-2 rounded-sm mt-1 border-black/20"
                  placeholder="Add a tag and press Enter"
                />
              </label>

              {/* Tags display */}
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, i) => (
                  <span
                    key={i}
                    className="bg-gray-100 text-gray-700 px-3 py-0.5 rounded-md border border-gray-500/20 flex items-center gap-1"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(i)}
                      className="text-gray-500 font-bold"
                    >
                      <IoClose className="h-4 w-4" />
                    </button>
                  </span>
                ))}
              </div>

              <div className="flex gap-1 justify-end">
                <button
                  className="bg-gray-500/10 text-gray-500 px-3 py-1 rounded-sm mt-2 hover:bg-gray-600/20 border border-black/20 transition-colors hover:cursor-pointer"
                  onClick={handleCloseModal}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-3 py-1 rounded-sm mt-2 hover:bg-blue-600 transition-colors hover:cursor-pointer"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Cards Section */}
      <div className="px-32 pb-8 mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredData.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg shadow-xs border border-black/10 p-4 flex flex-col"
          >
            {/* Media Preview */}
            {item.type === "IMAGE" && item.url && (
              <div className="mb-3">
                <img
                  src={item.url}
                  alt={item.title}
                  className="w-full h-40 object-cover rounded-md"
                />
              </div>
            )}

            {item.type === "VIDEO" && item.url && (
              <div className="mb-3">
                <iframe
                  width="100%"
                  height="200"
                  src={item.url.replace("watch?v=", "embed/")} // convert YouTube URL to embed
                  title={item.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="rounded-md"
                ></iframe>
              </div>
            )}

            {item.type === "AUDIO" && item.url && (
              <div className="mb-3">
                <audio controls className="w-full">
                  <source src={item.url} />
                  Your browser does not support the audio element.
                </audio>
              </div>
            )}

            {/* Card Info */}
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-lg font-semibold">{item.title}</h1>
              <div className="flex gap-2 items-center">
                <IoShareSocial className="text-blue-500 cursor-pointer hover:scale-105 transition-transform" />
                <FiExternalLink className="text-gray-500 cursor-pointer hover:scale-105 transition-transform" />
              </div>
            </div>
            <p className="text-sm text-gray-500 mb-2">Type: {item.type}</p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-auto">
              {item.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-blue-50 text-blue-500 px-2 py-1 rounded-sm border border-blue-500/50 text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}

        {/* If no content matches search */}
        {filteredData.length === 0 && (
          <p className="col-span-full text-center text-gray-400 mt-10">
            No content found for "{search}"
          </p>
        )}
      </div>
    </div>
  );
};
export default Hero;
