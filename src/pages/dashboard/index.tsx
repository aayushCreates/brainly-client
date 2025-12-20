import AddContentModal from "@/components/AddContentModal";
import Sidebar from "@/components/Sidebar";
import { Content } from "@/types/content.types";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FiExternalLink } from "react-icons/fi";
import { IoShareSocial } from "react-icons/io5";
import { toast } from "sonner";

const Hero = () => {
  const router = useRouter();
  const [content, setContent] = useState<Content[]>([]);
  const [search, setSearch] = useState<string>("");
  const [isAddContentOpen, setIsAddContentOpen] = useState<boolean>(false);

  const getAllData = async ()=> {
    try {
      const token = localStorage.getItem("token");
      console.log("tokne: ", token);
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/content`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setContent(data.data);
    }catch(err) {
      toast.error("No Content Available");
      return;
    }
  }

  useEffect(()=> {
    getAllData();
  }, []);

  const filteredData =
    Array.isArray(content) &&
    content.filter(
      (item) =>
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.tags.some((tag) =>
          tag.toLowerCase().includes(search.toLowerCase())
        )
    );

  const handleContentAdded = () => {
    router.replace(router.asPath);
  };

  return (
    <div className="flex min-h-screen bg-gray-50 transition-colors duration-300">
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
            className="w-full sm:w-80 rounded-md border border-gray-300 px-4 py-2 text-sm placeholder-neutral-500"
          />

          <button
            onClick={() => setIsAddContentOpen(true)}
            className="rounded-md bg-black text-white hover:bg-black/70 px-4 py-2 text-sm font-medium transition hover:cursor-pointer"
          >
            + Add Content
          </button>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.isArray(filteredData) &&
            filteredData.map((item) => (
              <div
                key={item.id}
                className="flex flex-col rounded-xl border border-gray-200 bg-white shadow-sm transition"
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
                    <h3 className="font-semibold text-gray-900">
                      {item.title}
                    </h3>
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

          {Array.isArray(filteredData) && filteredData.length === 0 && (
            <p className="col-span-full text-center text-gray-400">
              {search
                ? `No content found for “${search}”`
                : "No content available. Add some content to get started."}
            </p>
          )}
        </div>
      </main>

      {/* Modal */}
      {isAddContentOpen && (
        <AddContentModal
          modalOpen={isAddContentOpen}
          setModalOpen={setIsAddContentOpen}
          onSuccess={handleContentAdded}
        />
      )}
    </div>
  );
};
export default Hero;
