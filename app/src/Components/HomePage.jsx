import React from 'react';
// import Dashboard from './venDashboard.jpg'
import { 
  ChartPieIcon, 
  UsersIcon,  
  ShieldCheckIcon, 
  CircleHelp, 
  PhoneIcon,
  FileCheck,
} from 'lucide-react';

import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <ShieldCheckIcon className="w-10 h-10 text-white mr-3" />
            <h1 className="text-3xl font-bold text-white">VendorHub</h1>
          </div>
          <nav>
            <ul className="flex space-x-6">
              <li><Link to="/" className="text-white hover:text-indigo-200 transition">Home</Link></li>
              <li><Link to="#features" className="text-white hover:text-indigo-200 transition">Features</Link></li>
              <li><Link to="#about" className="text-white hover:text-indigo-200 transition">About</Link></li>
              <li><Link to="#faq" className="text-white hover:text-indigo-200 transition">FAQ</Link></li>
              <li><Link to="#contact" className="text-white hover:text-indigo-200 transition">Contact</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-grow">
        <section className="relative bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
          <div className="container mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-5xl font-extrabold mb-6 leading-tight">
                Streamline Your Vendor Management Process
              </h2>
              <p className="text-xl mb-8 text-indigo-100">
                VendorHub helps businesses efficiently manage, track, and collaborate with vendors through a comprehensive, user-friendly platform.
              </p>
              <div className="flex space-x-4">
                <Link 
                  to="/signup" 
                  className="bg-white text-indigo-600 px-8 py-3 rounded-full font-semibold hover:bg-indigo-50 transition transform hover:scale-105 shadow-lg"
                >
                  Sign Up
                </Link>
                <Link 
                  to="/login" 
                  className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-indigo-600 transition transform hover:scale-105"
                >
                  Login
                </Link>
              </div>
            </div>
            {/* <div className="hidden md:block"> */}
            <div className="md:block">
              <img 
                src="./venDashboard.jpg" 
                alt="Vendor Management Dashboard" 
                className="rounded-xl shadow-2xl"
              />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-white">
          <div className="container mx-auto px-6 text-center">
            <h3 className="text-3xl font-bold mb-12">Key Features</h3>
            <div className="grid md:grid-cols-3 gap-8">
              {[{
                icon: <UsersIcon className="w-12 h-12 mx-auto text-indigo-600 mb-4" />,
                title: "Vendor Registration",
                description: "Simplified onboarding with admin approval workflow"
              }, {
                icon: <FileCheck className="w-12 h-12 mx-auto text-green-600 mb-4" />,
                title: "Performance Tracking",
                description: "Monitor vendor performance with detailed analytics"
              }, {
                icon: <ChartPieIcon className="w-12 h-12 mx-auto text-purple-600 mb-4" />,
                title: "Comprehensive Reporting",
                description: "Generate insightful reports for strategic decisions"
              }].map((feature, index) => (
                <div key={index} className="bg-gray-100 p-8 rounded-xl hover:shadow-lg transition">
                  {feature.icon}
                  <h4 className="text-xl font-semibold mb-4">{feature.title}</h4>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-20 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="max-w-2xl mx-auto text-center mb-12">
              <h3 className="text-3xl font-bold mb-4">Frequently Asked Questions</h3>
              <p className="text-gray-600">Find answers to common questions about VendorHub</p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {[{
                question: "How does the vendor approval process work?",
                answer: "Vendors submit detailed profiles. Admins review and approve based on predefined criteria."
              }, {
                question: "Is my data secure?",
                answer: "We use state-of-the-art encryption and follow strict security protocols to protect your information."
              }, {
                question: "Can I track vendor performance?",
                answer: "Yes! Our platform provides comprehensive analytics and performance metrics."
              }, {
                question: "What support is available?",
                answer: "24/7 customer support via email, chat, and phone for all our customers."
              }].map((faq, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-md">
                  <CircleHelp className="w-8 h-8 text-indigo-600 mb-4" />
                  <h4 className="text-xl font-semibold mb-3">{faq.question}</h4>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
          <div className="container mx-auto px-6 text-center">
            <h3 className="text-3xl font-bold mb-6">Contact Us</h3>
            <p className="text-xl mb-12">Have questions? We're here to help!</p>
            <div className="max-w-md mx-auto">
              <div className="flex items-center bg-white rounded-full p-2 mb-6">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="flex-grow px-4 text-gray-800 outline-none" 
                />
                <button className="bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700 transition">
                  Send
                </button>
              </div>
              <div className="flex justify-center space-x-6">
                <a href="mailto:support@vendorhub.com" className="hover:text-indigo-200 transition">
                  <PhoneIcon className="w-6 h-6 inline-block mr-2" /> Support
                </a>
                <a href="tel:+1234567890" className="hover:text-indigo-200 transition">
                  Call Us: +1 (234) 567-890
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-6 grid md:grid-cols-4 gap-8">
          <div>
            <h5 className="text-xl font-bold mb-4 text-white">VendorHub</h5>
            <p>Revolutionizing vendor management with smart, efficient solutions.</p>
          </div>
          <div>
            <h6 className="font-semibold mb-4 text-white">Quick Links</h6>
            <ul className="space-y-2">
              <li><a href="#home" className="hover:text-white">Home</a></li>
              <li><a href="#features" className="hover:text-white">Features</a></li>
              <li><a href="#about" className="hover:text-white">About</a></li>
            </ul>
          </div>
          <div>
            <h6 className="font-semibold mb-4 text-white">Legal</h6>
            <ul className="space-y-2">
              <li><a href="#privacy" className="hover:text-white">Privacy Policy</a></li>
              <li><a href="#terms" className="hover:text-white">Terms of Service</a></li>
            </ul>
          </div>
          <div>
            <h6 className="font-semibold mb-4 text-white">Connect</h6>
            <div className="flex space-x-4">
              {/* Social media icons can be added here */}
              <a href="#" className="hover:text-white">Twitter</a>
              <a href="#" className="hover:text-white">LinkedIn</a>
            </div>
          </div>
        </div>
        <div className="text-center mt-8 border-t border-gray-800 pt-6">
          <p>&copy; 2024 VendorHub. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;