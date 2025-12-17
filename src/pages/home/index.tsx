import Sidebar from "@/components/Sidebar";
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
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 px-6 py-6 overflow-y-auto">
        {/* Top Bar */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <input
            type="text"
            placeholder="Search notes, tags..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-80 rounded-md border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={() => setIsAddContentOpen(true)}
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition"
          >
            + Add Content
          </button>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredData.map((item) => (
            <div
              key={item.id}
              className="flex flex-col rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition"
            >
              {/* Media */}
              {item.type === "IMAGE" && item.url && (
                <img
                  src={item.url}
                  alt={item.title}
                  className="h-40 w-full rounded-t-xl object-cover"
                />
              )}

              {item.type === "VIDEO" && item.url && (
                <iframe
                  className="h-40 w-full rounded-t-xl"
                  src={item.url.replace("watch?v=", "embed/")}
                  allowFullScreen
                />
              )}

              {item.type === "AUDIO" && item.url && (
                <div className="p-3">
                  <audio controls className="w-full" />
                </div>
              )}

              {/* Content */}
              <div className="flex flex-1 flex-col p-4">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold text-gray-900">{item.title}</h3>
                  <div className="flex gap-2 text-gray-500">
                    <IoShareSocial className="cursor-pointer hover:text-blue-500" />
                    <FiExternalLink className="cursor-pointer hover:text-gray-800" />
                  </div>
                </div>

                <p className="mt-1 text-xs text-gray-500">{item.type}</p>

                {/* Tags */}
                <div className="mt-auto flex flex-wrap gap-2 pt-3">
                  {item.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="rounded-md bg-blue-50 px-2 py-0.5 text-xs text-blue-600 border border-blue-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {filteredData.length === 0 && (
            <p className="col-span-full text-center text-gray-400">
              No content found for “{search}”
            </p>
          )}
        </div>
      </main>

      {/* Modal */}
      {isAddContentOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={handleCloseModal}
          />

          <div className="relative w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <button
              onClick={handleCloseModal}
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
            >
              <IoClose size={20} />
            </button>

            <h2 className="mb-4 text-lg font-semibold">Create Content</h2>

            <form onSubmit={handleSubmit} className="space-y-3">
              <select
                value={type}
                onChange={(e) => setType(e.target.value as ContentType)}
                className="w-full rounded-md border px-3 py-2"
              >
                <option value="IMAGE">Image</option>
                <option value="VIDEO">Video</option>
                <option value="ARTICLE">Article</option>
                <option value="AUDIO">Audio</option>
              </select>

              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                className="w-full rounded-md border px-3 py-2"
                required
              />

              <input
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="URL (optional)"
                className="w-full rounded-md border px-3 py-2"
              />

              <input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleTagKeyDown}
                placeholder="Press Enter to add tags"
                className="w-full rounded-md border px-3 py-2"
              />

              <div className="flex flex-wrap gap-2">
                {tags.map((tag, i) => (
                  <span
                    key={i}
                    className="flex items-center gap-1 rounded-md bg-gray-100 px-2 py-1 text-xs"
                  >
                    {tag}
                    <button onClick={() => handleRemoveTag(i)}>
                      <IoClose size={14} />
                    </button>
                  </span>
                ))}
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="rounded-md border px-4 py-2 text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
export default Hero;
