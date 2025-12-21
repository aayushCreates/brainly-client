import { Content } from "@/types/content.types";
import axios from "axios";
import { useState } from "react";
import { BsShare } from "react-icons/bs";
import { FiCheck, FiCopy, FiExternalLink, FiTrash, FiX, FiUser } from "react-icons/fi";
import { toast } from "sonner";

type ViewContentProps = {
  openModal: boolean;
  setOpenModal: (val: boolean) => void;
  data: Content | null;
  onDelete: () => void;
};

const ShareModal = ({
  onClose,
  shareUrl,
  contentId,
}: {
  onClose: () => void;
  shareUrl: string;
  contentId: string;
}) => {
  const [email, setEmail] = useState("");
  const [permission, setPermission] = useState<"VIEW" | "EDIT">("VIEW");
  const [description, setDescription] = useState("");
  const [isSharing, setIsSharing] = useState(false);
  const [shareResult, setShareResult] = useState<{
    link: string;
    permission: string;
    sharedMail: string;
  } | null>(null);
  const [copied, setCopied] = useState(false);

  const handleShareSubmit = async () => {
    if (!email) {
      toast.error("Please enter an email address");
      return;
    }

    setIsSharing(true);
    
    try {
        const token = localStorage.getItem("token");
        const contentData = {
          contentId,
          email: email,
          permission: permission,
          description: description
        };
    
        const { data } = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_API_URL}/share`,
          contentData, {
              headers: {
                  Authorization: `Bearer ${token}`
              }
          }
        );

        if(data.success) {
            setShareResult(data.data);
            toast.success("Shared Successfully");
        }
    } catch(e) {
        toast.error("Failed to share content");
        console.error(e);
    } finally {
        setIsSharing(false);
    }
  };

  const copyToClipboard = () => {
    if (shareResult?.link) {
      navigator.clipboard.writeText(shareResult.link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast.success("Link copied");
    }
  };

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-2xl animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Share Content</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <FiX size={20} />
          </button>
        </div>

        {shareResult ? (
          <div className="space-y-6">
             <div className="flex items-center gap-3 bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                <div className="bg-blue-100 p-3 rounded-full text-blue-600">
                    <FiUser size={24} />
                </div>
                <div>
                    <p className="text-sm font-semibold text-gray-900">Shared with {shareResult.sharedMail}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                        <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">{shareResult.permission} Access</p>
                    </div>
                </div>
             </div>

             <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Share Link</label>
                <div className="flex gap-2">
                    <div className="relative flex-1">
                        <input 
                            type="text" 
                            readOnly 
                            value={shareResult.link}
                            className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/20 pr-10"
                        />
                    </div>
                    <button
                        onClick={copyToClipboard}
                        className="flex items-center justify-center px-4 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 hover:text-blue-600 transition-all text-gray-500 shadow-sm"
                        title="Copy Link"
                    >
                        {copied ? <FiCheck size={18} /> : <FiCopy size={18} />}
                    </button>
                </div>
             </div>

             <button
                onClick={onClose}
                className="w-full rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-gray-800 transition shadow-lg shadow-gray-200"
             >
                Done
             </button>
          </div>
        ) : (
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email address"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Permission
            </label>
            <select
              value={permission}
              onChange={(e) => setPermission(e.target.value as "VIEW" | "EDIT")}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="view">Can View</option>
              <option value="edit">Can Edit</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description (Optional)
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add a description..."
              rows={3}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleShareSubmit}
              disabled={isSharing}
              className="flex-1 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSharing ? "Sharing..." : "Share"}
            </button>
          </div>
        </div>
        )}
      </div>
    </div>
  );
};

const ViewContentModal = ({
  openModal,
  setOpenModal,
  data,
  onDelete,
}: ViewContentProps) => {
  const [shareModalOpen, setShareModalOpen] = useState(false);

  if (!openModal || !data) return null;

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/content`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: {
            contentId: data.id,
          },
        }
      );

      if (response.data.success) {
        toast.success("Content deleted successfully");
        onDelete();
        setOpenModal(false);
      }
    } catch (err) {
      toast.error("Failed to delete content");
    }
  };

  const handleShare = async () => {
    setShareModalOpen(true);
  };

  const shareUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}/share/${data.id}` 
    : '';

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
        <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl bg-white p-6 shadow-2xl">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">{data.title}</h2>
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
          </div>

          <div className="mb-6">
            <div className="mt-2 flex items-center gap-3 justify-between">
              <p className="rounded-sm shadow-xs bg-blue-50 border border-blue-500/30 px-3 py-1 text-xs font-medium text-blue-600">
                {data.type}
              </p>
              <div className="flex gap-4">
                {data.url && (
                  <a
                    href={data.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-gray-500 hover:text-blue-600 hover:underline text-sm"
                  >
                    <FiExternalLink className="h-3 w-3" />
                    Open Original
                  </a>
                )}
                <button
                  onClick={handleShare}
                  className="flex gap-1 items-center text-gray-500 hover:text-blue-600 hover:underline text-sm hover:cursor-pointer bg-transparent border-none p-0"
                >
                  <BsShare className="h-3 w-3" />
                  Share
                </button>
              </div>
            </div>
          </div>

          <div className="mb-6 overflow-hidden rounded-md bg-gray-50 border border-gray-100">
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
                <p className="text-gray-500 mb-4">
                  This content is an article or external link.
                </p>
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

          {data.tags && data.tags.length > 0 && (
            <div>
              <h3 className="mb-3 text-sm font-medium text-gray-700">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {data.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="rounded-sm bg-gray-100 px-3 py-1 text-sm text-gray-700 border border-gray-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {shareModalOpen && (
        <ShareModal
          onClose={() => setShareModalOpen(false)}
          shareUrl={shareUrl}
          contentId={data.id}
        />
      )}
    </>
  );
};

export default ViewContentModal;