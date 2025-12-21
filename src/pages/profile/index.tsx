import Sidebar from "@/components/Sidebar";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiCamera,
  FiEdit3,
  FiSave,
  FiX,
} from "react-icons/fi";
import { toast } from "sonner";

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  avatarUrl?: string;
}

const ProfileSection = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [formData, setFormData] = useState<UserProfile | null>(null);

  const getProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/profile`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const userData = data.data;
      setProfile(userData);
      setFormData(userData);
    } catch (err) {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
         try {
           const parsed = JSON.parse(storedUser);
           setProfile(parsed);
           setFormData(parsed);
         } catch(e) {}
      } else {
        toast.error("Failed to load profile");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  const handleUpdateProfile = async () => {
    if (!formData) return;
    setIsSaving(true);
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/profile`,
        {
          name: formData.name,
          phone: formData.phone,
          avatarUrl: formData.avatarUrl
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

        toast.success("Profile updated");
        setProfile(formData); 
        setIsEditing(false);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Update failed");
    } finally {
      setIsSaving(false);
    }
  };

  const cancelEdit = () => {
    if (profile) {
        setFormData({ ...profile });
    }
    setIsEditing(false);
  };

  const getInitials = (name?: string) => {
      if (!name) return "U";
      const parts = name.trim().split(" ");
      if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
      return (parts[0].charAt(0) + parts[1].charAt(0)).toUpperCase();
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <main className="flex-1 flex items-center justify-center">
          <div className="h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </main>
      </div>
    );
  }

  if (!profile || !formData) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-gray-500">Profile not available</p>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        {/* HEADER */}
        <div className="relative h-40 bg-linear-to-r from-blue-500 to-blue-600">
          <div className="absolute -bottom-16 left-20 flex items-end gap-6">
            {/* Avatar */}
            <div className="relative group">
              <div className="h-32 w-32 rounded-full bg-white ring-4 ring-white shadow-md overflow-hidden flex items-center justify-center">
                {profile.avatarUrl ? (
                  <img
                    src={profile.avatarUrl}
                    alt={profile.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-4xl font-bold text-blue-500 select-none">
                    {getInitials(profile.name)}
                  </span>
                )}
              </div>
              <button className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition cursor-pointer">
                <FiCamera className="text-white text-xl" />
              </button>
            </div>

            {/* Name Display (Header) */}
            <div className="mb-4 text-black hidden sm:block">
              <h1 className="text-2xl font-bold text-gray-800">
                {profile.name || "Unknown User"}
              </h1>
              <p className="text-blue-600 font-medium">{profile.email}</p>
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="mt-20 px-20 pb-12">
           {/* Mobile Name Display */}
           <div className="block sm:hidden mb-6">
                 <h1 className="text-2xl font-bold text-gray-900">{profile.name || "User"}</h1>
                 <p className="text-gray-500">{profile.email}</p>
            </div>

          {/* {isEditing && (
            <div className="mb-6 rounded-md bg-blue-50 p-3 text-blue-700 text-sm border border-blue-200 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
              You are editing your profile. Save to apply changes.
            </div>
          )} */}

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 space-y-8">
            {/* SECTION HEADER */}
            <div className="flex justify-between items-center border-b border-gray-100 pb-4">
              <h2 className="text-lg font-semibold text-gray-800">
                Personal Information
              </h2>

              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-blue-600 text-sm font-medium flex items-center gap-2 hover:bg-blue-50 px-3 py-1.5 rounded-md transition"
                >
                  <FiEdit3 /> Edit Profile
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={cancelEdit}
                    className="flex gap-1 items-center border border-gray-300 bg-white rounded-md px-3 py-1.5 text-gray-600 text-sm font-medium hover:bg-gray-50 transition"
                  >
                    <FiX /> Cancel
                  </button>
                  <button
                    onClick={handleUpdateProfile}
                    disabled={isSaving}
                    className="flex gap-1 items-center px-4 py-1.5 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition shadow-sm"
                  >
                    {isSaving ? "Saving..." : <><FiSave /> Save Changes</>}
                  </button>
                </div>
              )}
            </div>

            {/* FORM FIELDS */}
            <div className="grid grid-cols-1 gap-6">
              {/* Name */}
              <div className="group">
                <label className="text-xs uppercase tracking-wider text-gray-500 font-semibold mb-1.5 block">
                  Full Name
                </label>
                <div className={`flex items-center gap-3 px-3 py-2.5 rounded-lg border transition-colors ${isEditing ? 'bg-white border-blue-300 ring-2 ring-blue-50' : 'bg-gray-50 border-transparent'}`}>
                    <FiUser className="text-gray-400 text-lg shrink-0" /> 
                    {isEditing ? (
                       <input
                        className="w-full bg-transparent focus:outline-none text-gray-800 placeholder-gray-400"
                        value={formData.name}
                        placeholder="Enter full name"
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                      />
                    ) : (
                      <span className="text-gray-800 font-medium truncate">{profile.name || "Not provided"}</span>
                    )}
                </div>
              </div>

              {/* Email (Read Only) */}
              <div>
                <label className="text-xs uppercase tracking-wider text-gray-500 font-semibold mb-1.5 block">
                  Email Address
                </label>
                <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg border border-transparent bg-gray-50/80 cursor-not-allowed">
                    <FiMail className="text-gray-400 text-lg shrink-0" /> 
                    <span className="text-gray-600 font-medium truncate w-full">{profile.email}</span>
                    {isEditing && <span className="text-xs text-gray-400 italic shrink-0">Read-only</span>}
                </div>
              </div>

              {/* Phone */}
              <div className="group">
                <label className="text-xs uppercase tracking-wider text-gray-500 font-semibold mb-1.5 block">
                  Phone Number
                </label>
                 <div className={`flex items-center gap-3 px-3 py-2.5 rounded-lg border transition-colors ${isEditing ? 'bg-white border-blue-300 ring-2 ring-blue-50' : 'bg-gray-50 border-transparent'}`}>
                    <FiPhone className="text-gray-400 text-lg shrink-0" />
                    {isEditing ? (
                       <input
                        type="tel"
                        className="w-full bg-transparent focus:outline-none text-gray-800 placeholder-gray-400"
                        value={formData.phone}
                        placeholder="Enter phone number"
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                      />
                    ) : (
                      <span className="text-gray-800 font-medium truncate">{profile.phone || "Not provided"}</span>
                    )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfileSection;