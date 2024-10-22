import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const { email } = useParams(); // Get email from URL
  const [profile, setProfile] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false); // New state to track upload success

  // Fetch the profile on component load
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          `https://9q7h11pvif.execute-api.us-east-1.amazonaws.com/dev/getImage?email=${email}`
        );
        setProfile(response.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    fetchProfile();
  }, [email]);

  // Handle file selection
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setUploadSuccess(false); // Reset success message when a new file is selected
  };

  // Handle image upload
  const handleImageUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file to upload1234");
      return;
    }

    try {
      // Request a pre-signed URL to upload the file
      const response = await axios.post(
        "https://9q7h11pvif.execute-api.us-east-1.amazonaws.com/dev/uploadImage",
        {
          filename: selectedFile.name,
          contentType: selectedFile.type,
          email, // Use email from URL params
        }
      );

      const { uploadURL, imageUrl } = response.data;

      // Upload the file to S3 using the pre-signed URL
      await axios.put(uploadURL, selectedFile, {
        headers: { "Content-Type": selectedFile.type },
      });

      // Update the profile with the new image URL
      setProfile({ ...profile, profileImage: imageUrl });

      // Show success message
      setUploadSuccess(true);
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Error uploading image. Please try again.");
    }
  };

  return (
    <div>
      {profile ? (
        <>
          <h2>Welcome, {profile.name}</h2>
          {profile.profileImage ? (
            <img
              src={profile.profileImage} // Use the real profile image URL
              alt="Profile"
              width={100}
              height={100}
              onError={(e) => {
                e.target.src = ""; // Provide fallback image or leave blank if there's no fallback
                console.error("Failed to load image:", profile.profileImage); // Log error
              }}
            />
          ) : (
            <p>No profile image uploaded.</p>
          )}
          <input type="file" onChange={handleFileChange} />
          <button onClick={handleImageUpload}>Upload Image</button>
          {uploadSuccess && <p>Upload profile successful!</p>}{" "}
          {/* Show success message */}
        </>
      ) : (
        <p>Loading profiles....123.</p>
      )}
    </div>
  );
};

export default Profile;
