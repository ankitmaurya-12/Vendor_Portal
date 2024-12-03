import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { UserIcon, MailIcon, LockIcon, BuildingIcon, EyeIcon, EyeOffIcon } from "lucide-react";

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    company: "",
    email: "",
    password: "",
    conPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [conPasswordVisible, setConPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};

    if (!formData.fname) newErrors.fname = "First name is required.";
    if (!formData.lname) newErrors.lname = "Last name is required.";
    if (!formData.company) newErrors.company = "Company name is required.";
    if (!formData.email) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email address.";
    }
    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (
      !/(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}/.test(
        formData.password
      )
    ) {
      newErrors.password =
        "Password must be at least 10 characters long, contain 1 alphabet, 1 number, and 1 special character.";
    }
    if (formData.conPassword !== formData.password) {
      newErrors.conPassword = "Passwords do not match.";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSuccessMessage("");
      setErrorMessage("");
    } else {
      setErrors({});
      setSuccessMessage("");
      setErrorMessage("");

      try {
        const response = await axios.post("http://localhost:5000/signup", formData);
        setSuccessMessage("Sign up successful!");
        navigate("/login");
      } catch (error) {
        setErrorMessage(
          error.response?.data?.message || "An error occurred during signup."
        );
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Section - Signup Form */}
      <div className="w-1/2 bg-gradient-to-br from-purple-600 to-indigo-500 flex justify-center items-center">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-purple-600 mb-4">Create Your Account</h2>
            <p className="text-gray-600">Join VendorHub and transform your vendor management</p>
          </div>

          <form onSubmit={handleSubmit} noValidate className="space-y-6">
            {/* Input Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="fname"
                  placeholder="First Name"
                  value={formData.fname}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                {errors.fname && (
                  <p className="text-red-500 text-sm mt-1">{errors.fname}</p>
                )}
              </div>
              <div className="relative">
                <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="lname"
                  placeholder="Last Name"
                  value={formData.lname}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                {errors.lname && (
                  <p className="text-red-500 text-sm mt-1">{errors.lname}</p>
                )}
              </div>
            </div>

            <div className="relative">
              <BuildingIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="company"
                placeholder="Company Name"
                value={formData.company}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              {errors.company && (
                <p className="text-red-500 text-sm mt-1">{errors.company}</p>
              )}
            </div>

            <div className="relative">
              <MailIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div className="relative">
              <LockIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type={passwordVisible ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                onClick={() => setPasswordVisible(!passwordVisible)}
              >
                {passwordVisible ? <EyeOffIcon /> : <EyeIcon />}
              </button>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            <div className="relative">
              <LockIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type={conPasswordVisible ? "text" : "password"}
                name="conPassword"
                placeholder="Confirm Password"
                value={formData.conPassword}
                onChange={handleChange}
                className="w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                onClick={() => setConPasswordVisible(!conPasswordVisible)}
              >
                {conPasswordVisible ? <EyeOffIcon /> : <EyeIcon />}
              </button>
              {errors.conPassword && (
                <p className="text-red-500 text-sm mt-1">{errors.conPassword}</p>
              )}
            </div>

            {successMessage && (
              <p className="text-green-500 text-sm text-center">{successMessage}</p>
            )}
            {errorMessage && (
              <p className="text-red-500 text-sm text-center">{errorMessage}</p>
            )}

            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition transform hover:scale-105"
            >
              Sign Up
            </button>
          </form>

          <div className="text-center mt-6">
            <p>
              Already have an account?{" "}
              <Link to="/login" className="text-purple-600 font-bold hover:underline">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Section - Illustration & Fact */}
      <div className="w-1/2 bg-gradient-to-br from-indigo-500 to-purple-600 flex flex-col justify-center items-center text-white">
        <img
          src="./Sign up-rafiki.svg"
          alt="Sign Up Illustration"
          className="w-3/4 mb-8 "
        />
        <p className="text-center text-lg font-semibold">
          "Empower your vendor management with VendorHub - Streamlined, Secure, Smart!"
        </p>
      </div>
    </div>
  );
};

export default SignUpForm;
