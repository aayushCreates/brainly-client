import { Content } from "@/types/content.types";
import axios from "axios";
import { FiExternalLink, FiTrash, FiX } from "react-icons/fi";
import { toast } from "sonner";

type ViewContentProps = {
  openModal: boolean;
  setOpenModal: (val: boolean) => void;
  data: Content | null;
  onDelete: () => void;
};

const ViewContentModal = ({ openModal, setOpenModal, data, onDelete }: ViewContentProps) => {
  if (!openModal || !data) return null;

  const handleDelete = async () => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.delete(
            `${process.env.NEXT_PUBLIC_BASE_API_URL}/content/${data.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        if(response.data.success) {
            toast.success("Content deleted successfully");
            onDelete();
            setOpenModal(false);
        }
    }catch(err) {
        toast.error("Failed to delete content");
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl bg-white p-6 shadow-2xl">
        {/* Actions */}
        <div className="absolute right-4 top-4 flex gap-2">
            <button
            onClick={handleDelete}
            className="rounded-full p-2 text-red-500 hover:bg-red-50 hover:text-red-700 transition-colors"
            title="Delete Content"
            >
            <FiTrash size={20} />
            </button>
            <button
            onClick={() => setOpenModal(false)}
            className="rounded-full p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors"
            >
            <FiX size={24} />
            </button>
        </div>

        {/* Header */}
        <div className="mb-6 pr-20">
          <h2 className="text-2xl font-bold text-gray-900">{data.title}</h2>
          <div className="mt-2 flex items-center gap-3">
            <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800">
              {data.type}
            </span>
            {data.url && (
              <a
                href={data.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-sm text-gray-500 hover:text-blue-600 hover:underline"
              >
                <FiExternalLink />
                Open Original
              </a>
            )}
          </div>
        </div>

        {/* Media Content */}
        <div className="mb-6 overflow-hidden rounded-lg bg-gray-50 border border-gray-100">
          {data.type === "IMAGE" && data.url && (
            <img
              src={data.url}
              alt={data.title}
              className="w-full h-auto max-h-[500px] object-contain"
            />
          )}

          {data.type === "VIDEO" && data.url && (
            <div className="aspect-video w-full">
              <iframe
                className="h-full w-full"
                src={data.url.replace("watch?v=", "embed/")}
                title={data.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}

          {data.type === "AUDIO" && data.url && (
            <div className="flex items-center justify-center p-8">
              <audio controls className="w-full">
                <source src={data.url} />
                Your browser does not support the audio element.
              </audio>
            </div>
          )}
          
          {data.type === "ARTICLE" && data.url && (
             <div className="p-8 text-center">
                <p className="text-gray-500 mb-4">This content is an article or external link.</p>
                <a
                href={data.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition"
              >
                Read Article <FiExternalLink className="ml-2" />
              </a>
             </div>
          )}
        </div>

        {/* Tags */}
        {data.tags && data.tags.length > 0 && (
          <div>
            <h3 className="mb-3 text-sm font-medium text-gray-700">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {data.tags.map((tag, index) => (
                <span
                  key={index}
                  className="rounded-md bg-gray-100 px-3 py-1 text-sm text-gray-700 border border-gray-200"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewContentModal;