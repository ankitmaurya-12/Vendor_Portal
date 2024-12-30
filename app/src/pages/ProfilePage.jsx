import React, { useState, useEffect } from "react";
import {
  User,
  Mail,
  Phone,
  Building,
  Edit2,
  Camera,
  Save,
  MapPin,
  Globe,
  Briefcase,
  Hash,
} from "lucide-react";
import axios from "../config/axios";
import Sidebar from "../Components/SideBar";
import Header from "../Components/Header";
import { useUser } from "../context/userContext";

const ProfilePage = () => {
  const { user: contextUser, token, updateUser } = useUser(); // Get user and token from context
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    fetchUserData();
  }, [contextUser]);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`/api/users/profile/${contextUser.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const userData = {
        fname: response.data.firstName || "",
        lname: response.data.lastName || "",
        email: response.data.email || "",
        PhoneNumber: response.data.phoneNumber  || "",
        company: response.data.companyName || "",
        address: response.data.address || "",
        website: response.data.website || "",
        bio: response.data.bio || "",
        vendorId: response.data.vendorCode  || "Pending Approval",
        profileImage: response.data.profileImage || null,
        role: response.data.role || "vendor",
      };
      setUser(userData);
      setFormData(userData);
      setError(null);
    } catch (error) {
      console.error("Error fetching user data:", error);
      setError("Failed to load profile data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage("");

    try {
      const updateData = {
        phone: formData.PhoneNumber,
        address: formData.address,
        website: formData.website,
        bio: formData.bio,
      };

      const response = await axios.put(
        `/api/users/profile/${contextUser.id}`,
        updateData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const updatedUserData = {
        ...user,
        PhoneNumber: response.data.phoneNumber,
        address: response.data.address,
        website: response.data.website,
        bio: response.data.bio,
      };

      setUser(updatedUserData);
      setFormData(updatedUserData);
      setIsEditing(false);
      setSuccessMessage("Profile updated successfully!");

      // Update the user context if needed
      updateUser({
        ...contextUser,
        phone: response.data.phoneNumber,
        address: response.data.address,
        website: response.data.website,
        bio: response.data.bio,
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      setError(
        error.response?.data?.message ||
          "Failed to update profile. Please try again."
      );
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("profileImage", file);

    try {
      const response = await axios.post(
        `/api/users/profile/${contextUser.id}/image`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setUser((prev) => ({ ...prev, profileImage: response.data.imageUrl }));
      setSuccessMessage("Profile image updated successfully!");

      // Update the user context with new image
      updateUser({
        ...contextUser,
        profileImage: response.data.imageUrl,
      });
    } catch (error) {
      console.error("Error uploading image:", error);
      setError("Failed to upload image. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />

      <div className="flex flex-1 flex-col">
        <Header
          toggleMobileMenu={() => setIsMobileOpen(!isMobileOpen)}
          isCollapsed={isCollapsed}
        />

        <main
          className={`flex-1 overflow-y-auto bg-gray-50 p-4 pt-24 transition-all duration-300 ${
            isCollapsed ? "lg:ml-16" : "lg:ml-64"
          }`}
        >
          <div className="mx-auto max-w-7xl">
            <div className="relative z-10 flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900">
                Vendor Profile
              </h1>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {isEditing ? (
                  <>
                    <Save className="w-4 h-4" />
                    Save Changes
                  </>
                ) : (
                  <>
                    <Edit2 className="w-4 h-4" />
                    Edit Profile
                  </>
                )}
              </button>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {/* Profile Card */}
              <div className="bg-white rounded-lg shadow-sm p-6 md:col-span-1">
                <div className="flex flex-col items-center">
                  <div className="relative">
                    <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-100">
                      {user?.profileImage ? (
                        <img
                          src={user.profileImage}
                          alt={`${user.fname} ${user.lname}`}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <User className="w-full h-full p-6 text-gray-400" />
                      )}
                    </div>
                    {isEditing && (
                      <label className="absolute bottom-0 right-0 p-2 bg-blue-600 rounded-full text-white cursor-pointer hover:bg-blue-700 transition-colors">
                        <Camera className="w-4 h-4" />
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={handleImageUpload}
                        />
                      </label>
                    )}
                  </div>

                  <div className="mt-4 text-center">
                    <h2 className="text-xl font-semibold text-gray-900">
                      {user?.fname} {user?.lname}
                    </h2>
                    <p className="text-gray-500">{user?.company}</p>
                    <div className="mt-2">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                        <Hash className="w-4 h-4 mr-1" />
                        {user?.vendorId || "Pending Approval"}
                      </span>
                    </div>
                  </div>

                  <div className="w-full mt-6 space-y-4">
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        {user?.email}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Briefcase className="w-5 h-5 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        {user?.company}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        {user?.PhoneNumber || "Not provided"}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        {user?.address || "Not provided"}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Globe className="w-5 h-5 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        {user?.website || "Not provided"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Edit Form */}
              <div className="bg-white rounded-lg shadow-sm p-6 md:col-span-2">
                <h3 className="text-lg font-semibold mb-6">
                  Profile Information
                </h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Non-editable fields */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        name="fname"
                        value={formData?.fname || ""}
                        disabled={true}
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-gray-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lname"
                        value={formData?.lname || ""}
                        disabled={true}
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-gray-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData?.email || ""}
                        disabled={true}
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-gray-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Company Name
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData?.company || ""}
                        disabled={true}
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-gray-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Vendor ID
                      </label>
                      <input
                        type="text"
                        name="vendorId"
                        value={formData?.vendorId || "Pending Approval"}
                        disabled={true}
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-gray-500"
                      />
                    </div>

                    {/* Editable fields */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="PhoneNumber"
                        value={formData?.PhoneNumber || ""}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 
                                focus:outline-none focus:ring-2 focus:ring-blue-500/20 
                                focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Website
                      </label>
                      <input
                        type="url"
                        name="website"
                        value={formData?.website || ""}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 
                                focus:outline-none focus:ring-2 focus:ring-blue-500/20 
                                focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Address
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={formData?.address || ""}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 
                                focus:outline-none focus:ring-2 focus:ring-blue-500/20 
                                focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Bio
                      </label>
                      <textarea
                        name="bio"
                        value={formData?.bio || ""}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        rows={4}
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 
                                focus:outline-none focus:ring-2 focus:ring-blue-500/20 
                                focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                      />
                    </div>
                  </div>

                  {isEditing && (
                    <div className="flex justify-end pt-6">
                      <button
                        type="submit"
                        className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 
                                text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <Save className="w-5 h-5" />
                        Save Changes
                      </button>
                    </div>
                  )}

                  {/* // Error and success messages */}
                  {error && (
                    <div className="mb-4 rounded-lg bg-red-50 p-4 text-red-700">
                      {error}
                    </div>
                  )}
                
                  {successMessage && (
                    <div className="mb-4 rounded-lg bg-green-50 p-4 text-green-700">
                      {successMessage}
                    </div>
                  )}

                </form>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProfilePage;
