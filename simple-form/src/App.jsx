import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setStatus("");
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Frontend Validation
    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      setStatus("Please fill all fields.");
      return;
    }

    if (!validateEmail(formData.email)) {
      setStatus("Invalid email format.");
      return;
    }

    try {
      const response = await axios.post(
        "https://vernanbackend.ezlab.in/api/contact-us/",
        formData
      );

      if (!response.status === 200) {
        setStatus("Something went wrong");
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        setStatus("Form submitted");
      }
    } catch (error) {
      console.error("Error:", error);
      setStatus("Server error. Please try again later.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 p-4">
      <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">
          Contact Us
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-lg"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-lg"
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-lg"
          />
          <textarea
            name="message"
            placeholder="Your Message"
            rows="4"
            value={formData.message}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-lg"
          ></textarea>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Submit
          </button>
        </form>

        {status && (
          <p className="text-center mt-4 font-medium text-gray-700">{status}</p>
        )}
      </div>
    </div>
  );
};

export default App;