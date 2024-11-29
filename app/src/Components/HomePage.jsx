import React from "react";

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-500 to-teal-400 shadow-lg">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white">Vendor Management Portal</h1>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <a href="#features" className="text-white hover:text-gray-200">
                  Features
                </a>
              </li>
              <li>
                <a href="#about" className="text-white hover:text-gray-200">
                  About
                </a>
              </li>
              <li>
                <a href="#contact" className="text-white hover:text-gray-200">
                  Contact
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Banner Section */}
      <main className="flex-grow bg-gray-100">
        <section className="relative">
          <div className="bg-cover bg-center h-96" style={{ backgroundImage: "url('https://source.unsplash.com/featured/?technology,business')" }}>
            <div className="bg-black bg-opacity-50 h-full flex flex-col justify-center items-center text-center">
              <h2 className="text-4xl font-extrabold text-white mb-4">
                Welcome to Vendor Management Portal
              </h2>
              <p className="text-lg text-gray-200 mb-6">
                Your one-stop solution for managing vendors efficiently.
              </p>
              <div className="flex space-x-4">
                <a
                  href="/login"
                  className="bg-teal-500 text-white px-6 py-3 rounded-lg shadow hover:bg-teal-600"
                >
                  Login
                </a>
                <a
                  href="/signup"
                  className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-600"
                >
                  Sign Up
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-12">
          <div className="container mx-auto px-6">
            <h3 className="text-2xl font-bold text-center mb-8">Our Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white shadow rounded p-6 text-center">
                <h4 className="text-xl font-bold mb-4">Streamlined Login</h4>
                <p>Secure login and account management for vendors.</p>
              </div>
              <div className="bg-white shadow rounded p-6 text-center">
                <h4 className="text-xl font-bold mb-4">Online Vendor Registration</h4>
                <p>Simple and efficient registration process for vendors.</p>
              </div>
              <div className="bg-white shadow rounded p-6 text-center">
                <h4 className="text-xl font-bold mb-4">Real-Time Updates</h4>
                <p>Get instant notifications and updates on vendor activities.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800">
        <div className="container mx-auto px-6 py-4 text-gray-400">
          <div className="flex justify-between items-center">
            <p>© 2024 Vendor Management Portal. All rights reserved.</p>
            <ul className="flex space-x-4">
              <li>
                <a href="#privacy" className="hover:text-gray-200">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#terms" className="hover:text-gray-200">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
