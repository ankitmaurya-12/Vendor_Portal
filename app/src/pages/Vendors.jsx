import React from 'react';
import { Header } from '../Components/Header'; // Adjust the path as necessary
import { Search, Filter } from 'lucide-react';

export const Vendors = () => {
  const vendors = [
    { id: 1, name: 'Tech Solutions Inc', status: 'Active', type: 'Technology', rating: 4.5 },
    { id: 2, name: 'Global Supplies Co', status: 'Pending', type: 'Supplies', rating: 4.0 },
    { id: 3, name: 'Quality Services Ltd', status: 'Active', type: 'Services', rating: 4.8 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      {/* Add a wrapper with top padding to offset the header */}
      <div className="pt-20"> {/* Adjust pt-20 as needed */}
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Vendors</h1>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              Add New Vendor
            </button>
          </div>

          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-4 border-b flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Search className="text-gray-400" />
                <input
                  type="text"
                  placeholder="Search vendors..."
                  className="border-none focus:ring-0"
                />
              </div>
              <button className="flex items-center gap-2 text-gray-600">
                <Filter size={20} />
                Filter
              </button>
            </div>

            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rating
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {vendors.map((vendor) => (
                  <tr key={vendor.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{vendor.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        vendor.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {vendor.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      {vendor.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      {vendor.rating}/5
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
