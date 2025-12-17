import { ContentType } from "@/types/content.types";
import axios from "axios";
import { FormEvent, useState } from "react";
import { IoClose } from "react-icons/io5";
import { toast } from "sonner";

const AddContentModal = ({
  modalOpen,
  setModalOpen,
  onSuccess,
}: {
  modalOpen: boolean;
  setModalOpen: (val: boolean) => void;
  onSuccess: () => void;
}) => {
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
    setModalOpen(false);
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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const contentData = { title, url, type, tags };
      const token = localStorage.getItem("token");

      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/content`,
        contentData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
      );

      if (data.success) {
        toast.success("Content added successfully");
        onSuccess();
        handleCloseModal();
      }
    } catch (err) {
      toast.error("Error in adding content");
      return;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50"
        onClick={handleCloseModal}
      />

      <div className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
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
            className="w-full rounded-md border border-black/10 px-3 py-2"
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
            className="w-full rounded-md border border-black/10 px-3 py-2"
            required
          />

          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="URL (optional)"
            className="w-full rounded-md border border-black/10 px-3 py-2"
          />

          <input
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleTagKeyDown}
            placeholder="Press Enter to add tags"
            className="w-full rounded-md border border-black/10 px-3 py-2"
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
              className="rounded-sm border border-black/10 bg-gray-50 px-4 py-2 text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-sm bg-blue-600 px-5 py-2 text-sm text-white"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddContentModal;
