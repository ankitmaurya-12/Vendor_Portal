import React from 'react';
import { Header } from '../Components/Header'; // Adjust the path as necessary
import { User, Mail, Phone, Building } from 'lucide-react';

export const Profile = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      {/* Add a wrapper with top padding to offset the header */}
      <div className="pt-20"> {/* Adjust pt-20 as needed */}
        <div className="p-6 max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Profile Settings</h1>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-start gap-6">
              <img
                src="/api/placeholder/120/120"
                alt="Profile"
                className="rounded-full"
              />
              <div className="flex-1">
                <h2 className="text-xl font-semibold mb-4">John Doe</h2>
                <div className="grid gap-4">
                  <div className="flex items-center gap-3">
                    <User className="text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Full Name</p>
                      <p className="font-medium">John Doe</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium">john.doe@example.com</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="font-medium">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Building className="text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Department</p>
                      <p className="font-medium">Vendor Management</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
