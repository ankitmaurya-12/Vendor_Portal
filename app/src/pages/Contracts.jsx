import { Header } from '../Components/Header'; // Adjust the path as necessary
import { FileText } from 'lucide-react';

export const Contracts = () => {
  const contracts = [
    { 
      id: 1, 
      vendor: 'Tech Solutions Inc',
      type: 'Service Agreement',
      status: 'Active',
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      value: '$50,000'
    },
    { 
      id: 2, 
      vendor: 'Global Supplies Co',
      type: 'Purchase Agreement',
      status: 'Pending Review',
      startDate: '2024-02-01',
      endDate: '2025-01-31',
      value: '$75,000'
    },
    { 
      id: 3, 
      vendor: 'Quality Services Ltd',
      type: 'Partnership Agreement',
      status: 'Expired',
      startDate: '2023-01-01',
      endDate: '2023-12-31',
      value: '$100,000'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      {/* Add a wrapper with top padding to offset the header */}
      <div className="pt-20"> {/* Adjust pt-20 as needed */}
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Contracts</h1>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              New Contract
            </button>
          </div>

          <div className="grid gap-6">
            {contracts.map((contract) => (
              <div key={contract.id} className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <FileText className="text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{contract.vendor}</h3>
                      <p className="text-sm text-gray-600">{contract.type}</p>
                      <div className="mt-2 flex items-center gap-4">
                        <span className="text-sm text-gray-600">Start: {contract.startDate}</span>
                        <span className="text-sm text-gray-600">End: {contract.endDate}</span>
                        <span className="font-medium text-blue-600">{contract.value}</span>
                      </div>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    contract.status === 'Active' ? 'bg-green-100 text-green-800' :
                    contract.status === 'Pending Review' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {contract.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
