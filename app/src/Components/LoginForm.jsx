import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { 
  Eye, 
  EyeOff, 
  Check, 
  X, 
  Github, 
  Twitter, 
  Linkedin,
  Facebook,
  Lock,
  Mail,
  AlertCircle
} from 'lucide-react';
import { useUser } from '../context/userContext';
import { theme } from '../assets/theme';

// Validation schema for login form
const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
  role: yup.string().required("Please select your role")
});

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const { login } = useUser(); 


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ 
    resolver: yupResolver(loginSchema),
    defaultValues: {
      role: 'vendor' // Default role
    }
  });

  const navigate = useNavigate();

  // const onSubmit = async (data) => {
  //   setIsLoading(true);
  //   setLoginError("");
  //   setSuccessMessage("");
  //   try {
  //     const response = await axios.post("http://localhost:5003/api/users/login", data);
  //     localStorage.setItem('userId', response.data.id);

  //     // Store the entire user data as received from the API
  //     login({
  //       id: response.data._id,
  //       firstName: response.data.firstName,
  //       lastName: response.data.lastName,
  //       email: response.data.email,
  //       role: response.data.role,
  //       // Role-specific data
  //       ...(response.data.company && { company: response.data.company }),
  //       ...(response.data.department && { department: response.data.department }),
  //       ...(response.data.approvalLimit && { approvalLimit: response.data.approvalLimit })
  //     });

  //     setSuccessMessage("Sign In successful!");
  //     console.log("Login successful:", response.data);

  //     // Role-based navigation
  //     const dashboardRoutes = {
  //       vendor: '/vendor-dashboard',
  //       admin: '/admin-dashboard',
  //       approver: '/approver-dashboard'
  //     };

  //     setTimeout(() => {
  //       navigate(dashboardRoutes[response.data.role] || '/dashboard');
  //     }, 2000);

  //   } catch (error) {
  //     console.error('Error logging in:', error.response ? error.response.data : error.message);
  //     setLoginError(error.response?.data?.message || "Invalid credentials, please try again.");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const onSubmit = async (data) => {
    setIsLoading(true);
    setLoginError("");
    setSuccessMessage("");
    try {
      const response = await axios.post("http://localhost:5004/api/users/login", data);
      
      // Create user object
      const userData = {
        id: response.data.user._id,
        firstName: response.data.user.firstName,
        lastName: response.data.user.lastName,
        email: response.data.user.email,
        role: response.data.user.role,
        // Role-specific data
        ...(response.data.user.company && { company: response.data.user.company }),
        ...(response.data.user.department && { department: response.data.user.department }),
        ...(response.data.user.approvalLimit && { approvalLimit: response.data.user.approvalLimit })
      };
  
      // Login with both user data and token
      login(userData, response.data.token);
  
      setSuccessMessage("Sign In successful!");
      
      // Role-based navigation
      const dashboardRoutes = {
        vendor: '/vendor-dashboard',
        admin: '/admin-dashboard',
        approver: '/approver-dashboard'
      };
  
      // Remove setTimeout and navigate immediately
      navigate(dashboardRoutes[response.data.user.role] || '/dashboard');
  
    } catch (error) {
      console.error('Error logging in:', error.response ? error.response.data : error.message);
      setLoginError(error.response?.data?.message || "Invalid credentials, please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  
  
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center"
    style={{ background: theme.colors.background }}>
 <div className="max-w-md w-full space-y-8 rounded-xl shadow-lg p-8"
      style={{ background: theme.colors.cardBg }}>
   <div>
     <h2 className="text-center text-3xl font-bold mb-4"
         style={{ color: theme.colors.primary }}>
       Welcome Back
     </h2>
     <p className="text-center text-sm"
        style={{ color: theme.colors.textLight }}>
       Sign in to your account
     </p>
   </div>

        {loginError && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm text-red-700">{loginError}</p>
              </div>
            </div>
          </div>
        )}

        {successMessage && (
          <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-4">
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm text-green-700">{successMessage}</p>
              </div>
            </div>
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {/* Role Selection */}
          <div>
            <label className="block text-sm font-medium mb-1"
                   style={{ color: theme.colors.text }}>
              Select Role
            </label>
            <select
              {...register("role")}
              className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2"
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

           {/* Email and Password fields */}
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  {...register("email")}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  {...register("password")}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 px-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </button>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>

            <Link
              to="/reset-password"
              className="text-sm font-medium text-blue-600 hover:text-blue-500"
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-lg transition transform hover:scale-105"
            style={{ 
              background: theme.colors.primary,
              color: theme.colors.cardBg,
              transition: theme.transition.default
            }}
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </button>
          <p className="text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-500">
              Sign up
            </Link>
          </p>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-4 gap-3">
            {[
              { icon: Github, color: 'hover:bg-gray-800 hover:text-white' },
              { icon: Twitter, color: 'hover:bg-blue-400 hover:text-white' },
              { icon: Linkedin, color: 'hover:bg-blue-600 hover:text-white' },
              { icon: Facebook, color: 'hover:bg-blue-800 hover:text-white' }
            ].map(({ icon: Icon, color }, index) => (
              <button
                key={index}
                className={`flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 ${color} transition-all duration-200`}
              >
                <Icon className="h-5 w-5" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;