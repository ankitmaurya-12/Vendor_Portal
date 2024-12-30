import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import emailjs from '@emailjs/browser';
import { 
  UserIcon, 
  MailIcon, 
  LockIcon, 
  BuildingIcon, 
  EyeIcon, 
  EyeOffIcon,
  BriefcaseIcon,
  ShieldIcon 
} from "lucide-react";
import { theme } from '../assets/theme';


const SignUpForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    email: "",
    password: "",
    conPassword: "",
    phoneNumber: "",
    role: "vendor", // Default role
    status: "active",
    department: "", // For admin and approver
    permissions: [], // For admin
    approvalLimit: "", // For approver
    businessType: "", // For vendor
    taxIdentificationNumber: "" // For vendor
  });


  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [conPasswordVisible, setConPasswordVisible] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false); // Popup state
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

    // Role-specific validation
    if (formData.role === 'vendor') {
      if (!formData.company) newErrors.company = "Company name is required.";
      if (!formData.businessType) newErrors.businessType = "Business type is required.";
    }
    if (['admin', 'approver'].includes(formData.role)) {
      if (!formData.department) newErrors.department = "Department is required.";
    }
    if (formData.role === 'approver' && !formData.approvalLimit) {
      newErrors.approvalLimit = "Approval limit is required.";
    }

    return newErrors;
  };

  const sendEmail = (email) => {
    emailjs
      .send(
        "service_7ha2lxv", // Replace with your service ID
        "template_l3lt9li", // Replace with your template ID
        {
          to_email: email, // Dynamic email passed here
        },
        "uFsrxfyrzbTFrm6Pw" // Public key
      )
      .then(
        (response) => {
          console.log("Email sent successfully!", response.status, response.text);
        },
        (err) => {
          console.error("Failed to send email:", err);
        }
      );
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
        // const response = await axios.post("http://localhost:5000/signup", formData);
        const response = await axios.post("http://localhost:5004/api/users/signup", formData);
        setSuccessMessage("Sign up successful!");
        sendEmail(formData.email);
        setIsPopupVisible(true); // Show popup after successful signup

        //set some delay before redirecting to login page so that user can see the popup
        setTimeout(() => {
          navigate("/login");
        }, 5000); // 5 seconds delay

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

  // Role-specific form fields
  const renderRoleSpecificFields = () => {
    switch(formData.role) {
      case 'vendor':
        return (
          <>
            <div className="relative">
              <BuildingIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="company"
                placeholder="Company Name"
                value={formData.companyName}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2"
                style={{ 
                  borderColor: theme.colors.border,
                  '--tw-ring-color': theme.colors.primary 
                }}
              />
              {errors.company && (
                <p className="text-red-500 text-sm mt-1">{errors.company}</p>
              )}
            </div>
            <div className="relative">
              <BriefcaseIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="businessType"
                placeholder="Business Type"
                value={formData.businessType}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2"
                style={{ 
                  borderColor: theme.colors.border,
                  '--tw-ring-color': theme.colors.primary 
                }}
              />
            </div>
          </>
        );
      case 'admin':
      case 'approver':
        return (
          <div className="relative">
            <ShieldIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              name="department"
              placeholder="Department"
              value={formData.department}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2"
              style={{ 
                borderColor: theme.colors.border,
                '--tw-ring-color': theme.colors.primary 
              }}
            />
            {errors.department && (
              <p className="text-red-500 text-sm mt-1">{errors.department}</p>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center"
         style={{ background: theme.colors.background }}>
      <div className="max-w-md w-full space-y-8 rounded-xl shadow-lg p-8"
           style={{ background: theme.colors.cardBg }}>
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4" style={{ color: theme.colors.primary }}>
            Create Your Account
          </h2>
          <p style={{ color: theme.colors.textLight }}>
            Join us to streamline your business operations
          </p>
        </div>

        <form onSubmit={handleSubmit} noValidate className="space-y-6">
          {/* Input Fields */}
          <div className="mb-4">
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full pl-4 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2"
              style={{ 
                borderColor: theme.colors.border,
                '--tw-ring-color': theme.colors.primary 
              }}
            >
              <option value="vendor">Vendor</option>
              <option value="admin">Admin</option>
              <option value="approver">Approver</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="relative">
              <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="fname"
                placeholder="First Name"
                value={formData.fname}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
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
                className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              {errors.lname && (
                <p className="text-red-500 text-sm mt-1">{errors.lname}</p>
              )}
            </div>
          </div>

          {/* <div className="relative">
            <BuildingIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              name="company"
              placeholder="Company Name"
              value={formData.company}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            {errors.company && (
              <p className="text-red-500 text-sm mt-1">{errors.company}</p>
            )}
          </div> */}

          <div className="relative">
            <MailIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
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
              className="w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
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
              className="w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
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

          {/* Role-specific fields */}
          {renderRoleSpecificFields()}

          {successMessage && (
            <p className="text-green-500 text-sm text-center">{successMessage}</p>
          )}
          {errorMessage && (
            <p className="text-red-500 text-sm text-center">{errorMessage}</p>
          )}

          <button
            type="submit"
            className="w-full py-3 rounded-lg transition transform hover:scale-105"
            style={{ 
              background: theme.colors.primary,
              color: theme.colors.cardBg,
              transition: theme.transition.default
            }}
          >
            Sign Up
          </button>
        </form>

        <div className="text-center mt-4">
          <p className="text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-sm font-medium text-blue-600 hover:text-blue-500">
              Login here
            </Link>
          </p>
        </div>
      </div>

      {/* Popup */}
      {isPopupVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <h3 className="text-lg font-bold text-blue-600 mb-4">Check Your Email!</h3>
            <p className="text-gray-600">
              A confirmation email has been sent to <strong>{formData.email}</strong>. Please
              check your inbox to complete the registration.
            </p>
            <button
              onClick={() => setIsPopupVisible(false)}
              className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default SignUpForm;
