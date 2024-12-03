import React from 'react';
import { Header } from '../Components/Header'; // Adjust the path as necessary
import { Search, Filter, Grid } from 'lucide-react';

export const Products = () => {
  const products = [
    { id: 1, name: 'Product A', vendor: 'Tech Solutions Inc', category: 'Electronics', price: '$999' },
    { id: 2, name: 'Product B', vendor: 'Global Supplies Co', category: 'Office', price: '$299' },
    { id: 3, name: 'Product C', vendor: 'Quality Services Ltd', category: 'Software', price: '$499' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      {/* Add a wrapper with top padding to offset the header */}
      <div className="pt-20"> {/* Adjust pt-20 as needed */}
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Products</h1>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              Add New Product
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">{product.name}</h3>
                    <span className="text-blue-600 font-bold">{product.price}</span>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">Vendor: {product.vendor}</p>
                    <p className="text-sm text-gray-600">Category: {product.category}</p>
                  </div>
                </div>
                <div className="border-t px-4 py-3 bg-gray-50">
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
