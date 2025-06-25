import React, { useEffect, useState } from "react";
import { uploadPic } from "../../utils/ApiRoutes";
import toast from "react-hot-toast";
import { getProfilePic } from "../../utils/ApiRoutes";
const ProfilePic = () => {
  const [pic, setPic] = useState("");
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const userId = userInfo?.id;

  const convertToBase64 = async (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setPic(base64);

    if (base64) {
      try {
        const response = await uploadPic(userId, pic);
        if (response) {
          toast.success("Profile picture uploaded successfully.");
        } else {
          toast.error("Failed to upload profile picture.");
        }
      } catch (error) {
        toast.error("An error occurred while uploading the profile picture.");
      }
    }
  };

  useEffect(() => {
    const getPic = async () => {
      const response = await getProfilePic(userId);
      if (response) {
        setPic(response.profilePic);
      } else {
        toast.error(response.message);
      }
    };

    getPic();
  }, []);

  return (
    <div>
      <form className="mb-5 flex items-center justify-center">
        <label
          htmlFor="file-upload"
          className="mx-auto inline-block w-24 h-24 rounded-full cursor-pointer overflow-hidden"
        >
          <img
            src={pic || "/Images/ProfilePic.png"} // Display uploaded image or default image
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </label>

        <input
          type="file"
          label="Image"
          name="myFile"
          id="file-upload"
          accept=".jpeg, .png, .jpg"
          onChange={handleFileUpload}
          className="hidden"
        />
      </form>
    </div>
  );
};

export default ProfilePic;
