import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios for making HTTP requests
import "./style.css"; // Import the CSS file

const SignUp = ({ setCurrentUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [image, setProfileImage] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // React Router's navigate to redirect after signup

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      // Prepare form data for the API request
      const filename = encodeURIComponent(image.name); // Assuming profileImage is the selected file
      const contentType = image.type;

      // Send POST request to API Gateway to get a pre-signed URL
      const response = await axios.post(
        "https://9q7h11pvif.execute-api.us-east-1.amazonaws.com/dev/signup", // Replace with your API Gateway URL
        {
          email,
          password,
          name,
          image,
        }
      );

      // Extract the pre-signed URL from the response
      const { uploadURL } = response.data;
      console.log("Pre-signed URL:", uploadURL, response.data);

      // Upload the file to S3 using the pre-signed URL
      await axios.put(uploadURL, image, {
        headers: { "Content-Type": image.type }, // Set the correct content type for the file
      });

      setMessage("Upload successful!");

      navigate("/login");
    } catch (error) {
      console.error("Error during signup:", error);
      alert("Signup failed. Please try again.");
    }
  };

  return (
    <div className="form-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSignUp}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
        />
        <input
          type="file"
          onChange={(e) => setProfileImage(e.target.files[0])}
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
