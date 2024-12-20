import { useState, useEffect, useMemo } from 'react';
import { ArrowUpDown, IndianRupee, Calculator, MoveUp, MoveDown  } from 'lucide-react';

export const SAPDataFetcher = () => {
  const [totalItems, setTotalItems] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [discounts, setDiscounts] = useState({});
  const [selectedRows, setSelectedRows] = useState({});
  const [discountStatus, setDiscountStatus] = useState({});
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  // const rowsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const credentials = btoa("iws_consult:Support@123");

        // Modified URL to include pagination and sorting parameters
        const url = new URL("/sap/opu/odata/sap/ZJ_SALES_SRV/zsoheaderSet/", window.location.origin);
        url.searchParams.append("page", page);
        url.searchParams.append("limit", rowsPerPage);
        if (sortConfig.key) {
          url.searchParams.append("sortBy", sortConfig.key);
          url.searchParams.append("sortDirection", sortConfig.direction);
        }

        const response = await fetch(url, {
          headers: {
            Authorization: `Basic ${credentials}`,
            Accept: "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        setData(result.d.results || []);
        setTotalItems(result.d.__count || 0); // Update total items count
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, rowsPerPage, sortConfig]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       setLoading(true);
  
  //       const credentials = btoa("iws_consult:Support@123");
  
  //       // Use relative URL for the proxy to work
  //       const url = new URL('/sap/opu/odata/sap/ZJ_SALES_SRV/zsoheaderSet/', window.location.origin);
  //       url.searchParams.append("page", page);
  //       url.searchParams.append("limit", rowsPerPage);
  
  //       if (sortConfig.key) {
  //         url.searchParams.append("sortBy", sortConfig.key);
  //         url.searchParams.append("sortDirection", sortConfig.direction);
  //       }
  
  //       const response = await fetch(url.toString(), {
  //         headers: {
  //           Authorization: `Basic ${credentials}`,
  //           Accept: "application/json",
  //         },
  //       });
  
  //       if (!response.ok) {
  //         throw new Error(`HTTP error! Status: ${response.status}`);
  //       }
  
  //       const result = await response.json();
  //       setData(result.d.results || []);
  //       setTotalItems(result.d.__count || 0);
  //     } catch (err) {
  //       setError(err.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  
  //   fetchData();
  // }, [page, rowsPerPage, sortConfig]);
  
  

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key) {
      if (sortConfig.direction === 'asc') direction = 'desc';
      else if (sortConfig.direction === 'desc') {
        setSortConfig({ key: null, direction: null });
        return;
      }
    }
    setSortConfig({ key, direction });
    setPage(1); // Reset to first page when sorting changes
  };

  const sortedData = useMemo(() => {
    if (!sortConfig.key) return data;
    
    return [...data].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [data, sortConfig]);

  const getSortIndicator = (key) => {
    if (sortConfig.key !== key) return <ArrowUpDown className="w-4 h-4" />;
    if (sortConfig.direction === 'asc') return <MoveUp className="w-4 h-4" />;
    return <MoveDown className="w-4 h-4" />;
  };

  const calculateDiscount = (netValue, percentage) => {
    const numericValue = parseFloat(netValue);
    const numericPercentage = parseFloat(percentage);
    
    if (isNaN(numericValue) || isNaN(numericPercentage)) {
      return 0;
    }
    
    return (numericValue * numericPercentage) / 100;
  };

  // Calculate summary values
  const totalInvoiceValue = data.reduce((sum, item) => sum + parseFloat(item.Netwr || 0), 0);
  const totalDiscountedValue = data.reduce((sum, item) => {
    const discountAmount = calculateDiscount(item.Netwr, discounts[item.Vbeln] || 0);
    return sum + (parseFloat(item.Netwr || 0) - discountAmount);
  }, 0);

  
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

  const formatCurrency = (value) => {
    const numericValue = parseFloat(value);
    return isNaN(numericValue) ? '0.00' : numericValue.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
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

  
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#059B9A]"></div>
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

      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-[#059B9A]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Invoice Value</p>
              <p className="text-2xl font-bold text-[#059B9A]">{formatCurrency(totalInvoiceValue)}</p>
            </div>
            <IndianRupee className="w-8 h-8 text-[#059B9A]" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-[#059B9A]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Net Value After Discounts</p>
              <p className="text-2xl font-bold text-[#059B9A]">{formatCurrency(totalDiscountedValue)}</p>
            </div>
            <Calculator className="w-8 h-8 text-[#059B9A]" />
          </div>
        </div>
      </div>


      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full">
          <thead>
            <tr className="bg-[#059B9A] text-white">
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Select
              </th>
              <th
                onClick={() => handleSort('Vbeln')}
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer"
              >
                <div className="flex items-center space-x-1">
                  <span>Sales Order</span>
                  {getSortIndicator('Vbeln')}
                </div>
              </th>
              <th
                onClick={() => handleSort('Auart')}
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer"
              >
                <div className="flex items-center space-x-1">
                  <span>Order Type</span>
                  {getSortIndicator('Auart')}
                </div>
              </th>
              <th
                onClick={() => handleSort('Netwr')}
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer"
              >
                <div className="flex items-center space-x-1">
                  <span>Net Value</span>
                  {getSortIndicator('Netwr')}
                </div>
              </th>
              <th
                onClick={() => handleSort('Kunnr')}
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer"
              >
                <div className="flex items-center space-x-1">
                  <span>Customer</span>
                  {getSortIndicator('Kunnr')}
                </div>
              </th>
              <th 
                onClick={() => handleSort('Discount')}
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Discount %
              </th>
              <th
                onClick={() => handleSort('DiscountAmount')} 
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Discount Amount
              </th>
              <th
                onClick={() => handleSort('FinalValue')} 
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
              Final Value
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Actions
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {sortedData.slice((page - 1) * rowsPerPage, page * rowsPerPage).map((item) => {
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
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
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
                      className="px-3 py-1 bg-[#059B9A] text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#048786]"
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
          className="px-4 py-2 bg-[#059B9A] text-white rounded-lg disabled:opacity-50 hover:bg-[#059B9A]"
          onClick={handlePrevious}
          disabled={page === 1}
        >
          Previous
        </button>
        <span className="px-4 py-2">
          Page {page} of {Math.ceil(data.length / rowsPerPage)}
        </span>
        <button
          className="px-4 py-2 bg-[#059B9A] text-white rounded-lg disabled:opacity-50 hover:bg-[#059B9A]"
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