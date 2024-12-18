import { useState, useEffect } from 'react';

export const SAPDataFetcher = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [discounts, setDiscounts] = useState({});
  const [selectedRows, setSelectedRows] = useState({});
  const [discountStatus, setDiscountStatus] = useState({});

  const rowsPerPage = 10;

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
        setData(result.d.results || []);
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

  const calculateDiscount = (netValue, percentage) => {
    const numericValue = parseFloat(netValue);
    const numericPercentage = parseFloat(percentage);
    
    if (isNaN(numericValue) || isNaN(numericPercentage)) {
      return 0;
    }
    
    return (numericValue * numericPercentage) / 100;
  };

  const calculateFinalValue = (netValue, discountAmount) => {
    const numericValue = parseFloat(netValue);
    return numericValue - discountAmount;
  };

  const handleRowSelect = (salesOrder) => {
    setSelectedRows(prev => ({
      ...prev,
      [salesOrder]: !prev[salesOrder]
    }));
  };

  const handleDiscountChange = (salesOrder) => {
    const inputValue = document.getElementById(`discount-${salesOrder}`).value;
    setDiscounts(prev => ({
      ...prev,
      [salesOrder]: inputValue
    }));
  };

  // const handleApplyDiscount = (salesOrder) => {
  //   // Here you would typically make an API call to submit the discount request
  //   setDiscountStatus(prev => ({
  //     ...prev,
  //     [salesOrder]: 'PENDING_APPROVAL'
  //   }));
  // };

  const handleApplyDiscount = async (salesOrder) => {
    try {
      const discountData = {
        salesOrder: salesOrder,
        originalValue: parseFloat(data.find(item => item.Vbeln === salesOrder).Netwr),
        discountPercentage: parseFloat(discounts[salesOrder]),
        discountAmount: calculateDiscount(
          data.find(item => item.Vbeln === salesOrder).Netwr,
          discounts[salesOrder]
        ),
        finalValue: calculateFinalValue(
          data.find(item => item.Vbeln === salesOrder).Netwr,
          calculateDiscount(
            data.find(item => item.Vbeln === salesOrder).Netwr,
            discounts[salesOrder]
          )
        ),
        requestedBy: "current_user_email", // Replace with actual user email from your auth system
      };

      const response = await fetch('http://localhost:5000/api/discount-requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(discountData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit discount request');
      }

      const result = await response.json();
      
      // Update local state to show pending status
      setDiscountStatus(prev => ({
        ...prev,
        [salesOrder]: 'PENDING_APPROVAL'
      }));

      // Show success message (you'll need to implement this)
      alert('Discount request submitted successfully!');
    } catch (error) {
      console.error('Error submitting discount request:', error);
      alert('Failed to submit discount request. Please try again.');
    }
  };

  const getStatusDisplay = (status) => {
    switch(status) {
      case 'PENDING_APPROVAL':
        return (
          <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">
            Request for Discount
          </span>
        );
      case 'APPROVED':
        return (
          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
            Request Approved
          </span>
        );
      default:
        return null;
    }
  };

  const formatCurrency = (value) => {
    const numericValue = parseFloat(value);
    return isNaN(numericValue) ? '0.00' : numericValue.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

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
                Select
              </th>
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
                Discount %
              </th>
              <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Discount Amount
              </th>
              <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Final Value
              </th>
              <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
              <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {paginatedData.map((item) => {
              const discountAmount = calculateDiscount(item.Netwr, discounts[item.Vbeln] || 0);
              const finalValue = calculateFinalValue(item.Netwr, discountAmount);
              const isSelected = selectedRows[item.Vbeln];
              const status = discountStatus[item.Vbeln];
              
              return (
                <tr key={item.Vbeln} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    <input 
                      type="checkbox" 
                      checked={isSelected}
                      onChange={() => handleRowSelect(item.Vbeln)}
                      className="rounded border-gray-300"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {item.Vbeln}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.Auart}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatCurrency(item.Netwr)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.Kunnr}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center space-x-2">
                      <input
                        id={`discount-${item.Vbeln}`}
                        type="number"
                        min="0"
                        max="100"
                        value={discounts[item.Vbeln] || ''}
                        onChange={() => handleDiscountChange(item.Vbeln)}
                        disabled={!isSelected || status === 'PENDING_APPROVAL'}
                        className="border border-gray-300 rounded-md p-1 w-20 disabled:bg-gray-100 disabled:cursor-not-allowed"
                      />
                      <span>%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatCurrency(discountAmount)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatCurrency(finalValue)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button
                      onClick={() => handleApplyDiscount(item.Vbeln)}
                      disabled={!isSelected || !discounts[item.Vbeln] || status === 'PENDING_APPROVAL'}
                      className="px-3 py-1 bg-blue-500 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600"
                    >
                      Apply
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {getStatusDisplay(status)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-6">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50 hover:bg-blue-600"
          onClick={handlePrevious}
          disabled={page === 1}
        >
          Previous
        </button>
        <span className="px-4 py-2">
          Page {page} of {Math.ceil(data.length / rowsPerPage)}
        </span>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50 hover:bg-blue-600"
          onClick={handleNext}
          disabled={page === Math.ceil(data.length / rowsPerPage)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default SAPDataFetcher;