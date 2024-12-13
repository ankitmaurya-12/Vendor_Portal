import { useState, useEffect } from 'react';

export const SAPDataFetcher = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);


  const rowsPerPage = 10; // Number of rows per page

  useEffect(() => {
    const fetchData = async () => {
      try {
        const credentials = btoa('iws_consult:Support@123');
        const response = await fetch(
          '/sap/opu/odata/sap/ZJ_SALES_SRV/zsoheaderSet/',
          {
            headers: {
              "Authorization": `Basic ${credentials}`,
              "Accept": "application/json"
            }
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();

        setData(result.d.results || []); // Adjust based on API structure
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleNext = () => {
    if (page < Math.ceil(data.length / rowsPerPage)) {
      setPage(page + 1);
    }
  };

  const handlePrevious = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const paginatedData = data.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  const discountCalculation = (Netwr, percentage) => {
    return (Netwr / 100) * percentage;
  }
  
  const finalValueCalculation = (Netwr, discount) => {
    return Netwr - discount;
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-100 text-red-700 rounded-lg">
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">SAP Sales Orders</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sales Order
              </th>
              <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order Type
              </th>
              <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Net Value
              </th>
              <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer
              </th>
              <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                How Much Discount
              </th>
              <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Discount
              </th>
              <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Final Value
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {paginatedData.map((item) => (
              <tr key={item.Vbeln} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {item.Vbeln}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.Auart}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {Number(item.Netwr).toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  })}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.Kunnr}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <input type="number" className="border border-gray-300 rounded-md p-1" />

                  <button className="px-2 py-1 bg-blue-500 text-white rounded-md ml-2">
                    Apply
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {discountCalculation(item.Netwr, 10).toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  })}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {finalValueCalculation(item.Netwr, discountCalculation(item.Netwr, 10)).toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div id="pagination" className="flex justify-between items-center mt-6">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50"
          onClick={handlePrevious}
          disabled={page === 1}
        >
          Previous
        </button>
        <span className="px-4 py-2">
          Page {page} / {Math.ceil(data.length / rowsPerPage)}
        </span>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50"
          onClick={handleNext}
          disabled={page === Math.ceil(data.length / rowsPerPage)}
        >
          Next
        </button>
      </div>
    </div>
  );
};
