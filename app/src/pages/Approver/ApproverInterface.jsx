
import { useState, useEffect } from 'react';
import { Check, X, ChevronUp, ChevronDown, Search, Filter, Download } from 'lucide-react';
import { useLocation, Link } from 'react-router-dom';

// Constants to avoid magic strings
const STATUS = {
  PENDING: 'PENDING_APPROVAL',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED'
};

const DISCOUNT_RANGES = {
  LOW: { label: 'Low (≤10%)', value: 'low', max: 10 },
  MEDIUM: { label: 'Medium (11-20%)', value: 'medium', min: 10, max: 20 },
  HIGH: { label: 'High (>20%)', value: 'high', min: 20 }
};

export const ApproverInterface = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRequests, setSelectedRequests] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    orderType: '',
    discountRange: '',
    customer: ''
  });
  const [showFilters, setShowFilters] = useState(false);
  const [sortConfig, setSortConfig] = useState({
    key: 'salesOrder',
    direction: 'asc'
  });

  const location = useLocation();

  const getStatusFromPath = () => {
    if (location.pathname.includes('/approved')) return STATUS.APPROVED;
    if (location.pathname.includes('/rejected')) return STATUS.REJECTED;
    return STATUS.PENDING;
  };

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
  const status = getStatusFromPath();

  useEffect(() => {
    fetchRequests();
    setSelectedRequests({});
  }, [location.pathname]);

  const fetchRequests = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/api/discount-requests?status=${status}`);
      if (!response.ok) throw new Error('Failed to fetch requests');
      const data = await response.json();
      setRequests(data);
    } catch (error) {
      setError(error.message);
      console.error('Error fetching requests:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (newStatus, rejectionReason = '') => {
    const selectedIds = Object.entries(selectedRequests)
      .filter(([_, isSelected]) => isSelected)
      .map(([id]) => id);

    if (selectedIds.length === 0) {
      alert('Please select at least one request to process');
      return;
    }

    try {
      await Promise.all(selectedIds.map(requestId => 
        fetch(`${API_URL}/api/discount-requests/${requestId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            status: newStatus,
            approvedBy: 'current_approver_email', // Should come from auth context
            rejectionReason
          }),
        })
      ));

      fetchRequests();
      setSelectedRequests({});
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Failed to update requests: ' + error.message);
    }
  };

  const handleSort = (key) => {
    setSortConfig(prevConfig => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const sortedRequests = [...requests].sort((a, b) => {
    if (!a[sortConfig.key] || !b[sortConfig.key]) return 0;

    const compareValue = (aVal, bVal) => {
      if (typeof aVal === 'number') return aVal - bVal;
      if (aVal instanceof Date) return aVal.getTime() - bVal.getTime();
      return String(aVal).localeCompare(String(bVal));
    };

    const comparison = compareValue(a[sortConfig.key], b[sortConfig.key]);
    return sortConfig.direction === 'asc' ? comparison : -comparison;
  });

  const SortIcon = ({ columnKey }) => {
    if (sortConfig.key !== columnKey) return null;
    return sortConfig.direction === 'asc' ? 
      <ChevronUp className="inline w-4 h-4" /> : 
      <ChevronDown className="inline w-4 h-4" />;
  };

  const handleSelectAll = (checked) => {
    const newSelected = Object.fromEntries(
      requests.map(request => [request._id, checked])
    );
    setSelectedRequests(newSelected);
  };

  const filterRequests = (data) => {
    return data.filter(request => {
      const searchFields = [
        request.salesOrder,
        request.customer,
        request.orderType
      ].map(field => String(field).toLowerCase());
      
      const matchesSearch = searchTerm === '' || 
        searchFields.some(field => field.includes(searchTerm.toLowerCase()));

      const matchesOrderType = !filters.orderType || request.orderType === filters.orderType;
      
      const matchesDiscountRange = !filters.discountRange || (() => {
        const discount = request.discountPercentage;
        const range = DISCOUNT_RANGES[filters.discountRange.toUpperCase()];
        if (!range) return true;
        if (range.min && range.max) return discount > range.min && discount <= range.max;
        if (range.max) return discount <= range.max;
        return discount > range.min;
      })();

      const matchesCustomer = !filters.customer || request.customer === filters.customer;

      return matchesSearch && matchesOrderType && matchesDiscountRange && matchesCustomer;
    });
  };

  const getUniqueValues = (field) => {
    return [...new Set(requests.map(request => request[field]))].filter(Boolean);
  };

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">Error: {error}</div>;
  }

  const filteredRequests = filterRequests(sortedRequests);
  const selectedCount = Object.values(selectedRequests).filter(Boolean).length;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-4 sm:mb-0">
              Discount Approval Dashboard
            </h1>
            <div className="flex flex-wrap gap-2">
              {/* <button
                onClick={() => { Export logic }}
                className="inline-flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg"
              >
                <Download className="w-4 h-4 mr-2" />
                Export
              </button>  */}
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
            <Link
              to="/approver/discount"
              className={`flex-1 text-center px-4 py-2 rounded-md transition-colors ${
                status === STATUS.PENDING 
                  ? 'bg-[#059B9A] text-white shadow-sm' 
                  : 'hover:bg-gray-200'
              }`}
            >
              Pending
            </Link>
            <Link
              to="/approver/discount/approved"
              className={`flex-1 text-center px-4 py-2 rounded-md transition-colors ${
                status === STATUS.APPROVED 
                  ? 'bg-[#059B9A] text-white shadow-sm' 
                  : 'hover:bg-gray-200'
              }`}
            >
              Approved
            </Link>
            <Link
              to="/approver/discount/rejected"
              className={`flex-1 text-center px-4 py-2 rounded-md transition-colors ${
                status === STATUS.REJECTED 
                  ? 'bg-[#059B9A] text-white shadow-sm' 
                  : 'hover:bg-gray-200'
              }`}
            >
              Rejected
            </Link>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by order, customer, or type..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#059B9A] focus:border-transparent"
                />
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
              </div>
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </button>
          </div>

          {/* Expandable Filters */}
          {showFilters && (
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <select
                value={filters.orderType}
                onChange={(e) => setFilters(prev => ({ ...prev, orderType: e.target.value }))}
                className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#059B9A]"
              >
                <option value="">All Order Types</option>
                {getUniqueValues('orderType').map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              
              <select
                value={filters.discountRange}
                onChange={(e) => setFilters(prev => ({ ...prev, discountRange: e.target.value }))}
                className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#059B9A]"
              >
                <option value="">All Discount Ranges</option>
                {Object.values(DISCOUNT_RANGES).map(range => (
                  <option key={range.value} value={range.value}>{range.label}</option>
                ))}
              </select>

              <select
                value={filters.customer}
                onChange={(e) => setFilters(prev => ({ ...prev, customer: e.target.value }))}
                className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#059B9A]"
              >
                <option value="">All Customers</option>
                {getUniqueValues('customer').map(customer => (
                  <option key={customer} value={customer}>{customer}</option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Action Buttons - Only show for pending requests */}
        {status === STATUS.PENDING && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-600">
                {selectedCount} requests selected
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={() => handleStatusUpdate(STATUS.APPROVED)}
                  disabled={!selectedCount}
                  className={`px-6 py-2 rounded-lg transition-colors ${
                    selectedCount
                      ? 'bg-green-500 hover:bg-green-600 text-white' 
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  } flex items-center`}
                >
                  <Check className="w-4 h-4 mr-2" />
                  Approve Selected
                </button>
                <button
                  onClick={() => {
                    const reason = prompt('Enter rejection reason for selected requests:');
                    if (reason) handleStatusUpdate(STATUS.REJECTED, reason);
                  }}
                  disabled={!selectedCount}
                  className={`px-6 py-2 rounded-lg transition-colors ${
                    selectedCount
                      ? 'bg-red-500 hover:bg-red-600 text-white' 
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  } flex items-center`}
                >
                  <X className="w-4 h-4 mr-2" />
                  Reject Selected
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Table Section */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <table className="min-w-full">
            <thead>
              <tr className="bg-[#059B9A] text-white">
                {status === STATUS.PENDING && (
                  <th className="px-6 py-3 text-left">
                    <input
                      type="checkbox"
                      onChange={(e) => handleSelectAll(e.target.checked)}
                      className="rounded border-gray-300"
                    />
                  </th>
                )}
                <th 
                  className="px-6 py-3 text-left cursor-pointer hover:bg-[#048786]"
                  onClick={() => handleSort('salesOrder')}
                >
                  Sales Order <SortIcon columnKey="salesOrder" />
                </th>
                <th 
                  className="px-6 py-3 text-left cursor-pointer hover:bg-[#048786]"
                  onClick={() => handleSort('orderType')}
                >
                  Order Type <SortIcon columnKey="orderType" />
                </th>
                <th 
                  className="px-6 py-3 text-left cursor-pointer hover:bg-[#048786]"
                  onClick={() => handleSort('netValue')}
                >
                  Net Value <SortIcon columnKey="netValue" />
                </th>
                <th 
                  className="px-6 py-3 text-left cursor-pointer hover:bg-[#048786]"
                  onClick={() => handleSort('customer')}
                >
                  Customer <SortIcon columnKey="customer" />
                </th>
                <th 
                  className="px-6 py-3 text-left cursor-pointer hover:bg-[#048786]"
                  onClick={() => handleSort('discountPercentage')}
                >
                  Discount % <SortIcon columnKey="discountPercentage" />
                </th>
                <th 
                  className="px-6 py-3 text-left cursor-pointer hover:bg-[#048786]"
                  onClick={() => handleSort('discountAmount')}
                >
                  Discount Amount <SortIcon columnKey="discountAmount" />
                </th>
                <th 
                  className="px-6 py-3 text-left cursor-pointer hover:bg-[#048786]"
                  onClick={() => handleSort('finalValue')}
                >
                  Final Value <SortIcon columnKey="finalValue" />
                </th>
                <th 
                  className="px-6 py-3 text-left cursor-pointer hover:bg-[#048786]"
                  onClick={() => handleSort('requestedBy')}
                >
                  Requested By <SortIcon columnKey="requestedBy" />
                </th>
                {status === STATUS.APPROVED && (
                  <>
                    <th 
                      className="px-6 py-3 text-left cursor-pointer hover:bg-[#048786]"
                      onClick={() => handleSort('approvedBy')}
                    >
                      Approved By <SortIcon columnKey="approvedBy" />
                    </th>
                    <th 
                      className="px-6 py-3 text-left cursor-pointer hover:bg-[#048786]"
                      onClick={() => handleSort('approvalDate')}
                    >
                      Approval Date <SortIcon columnKey="approvalDate" />
                    </th>
                  </>
                )}
                {status === STATUS.REJECTED && (
                  <>
                    <th 
                      className="px-6 py-3 text-left cursor-pointer hover:bg-[#048786]"
                      onClick={() => handleSort('approvedBy')}
                    >
                      Rejected By <SortIcon columnKey="approvedBy" />
                    </th>
                    <th 
                      className="px-6 py-3 text-left cursor-pointer hover:bg-[#048786]"
                      onClick={() => handleSort('approvalDate')}
                    >
                      Rejection Date <SortIcon columnKey="approvalDate" />
                    </th>
                    <th 
                      className="px-6 py-3 text-left cursor-pointer hover:bg-[#048786]"
                      onClick={() => handleSort('rejectionReason')}
                    >
                      Reason <SortIcon columnKey="rejectionReason" />
                    </th>
                  </>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredRequests.length === 0 ? (
                <tr>
                  <td 
                    colSpan={status === STATUS.PENDING ? 9 : status === STATUS.APPROVED ? 10 : 11} 
                    className="px-6 py-8 text-center text-gray-500"
                  >
                    No requests found matching your criteria
                  </td>
                </tr>
              ) : (
                filteredRequests.map((request) => (
                  <tr key={request._id} className="hover:bg-gray-50">
                    {status === STATUS.PENDING && (
                      <td className="px-6 py-4">
                        <input
                          type="checkbox"
                          checked={selectedRequests[request._id] || false}
                          onChange={() => setSelectedRequests(prev => ({
                            ...prev,
                            [request._id]: !prev[request._id]
                          }))}
                          className="rounded border-gray-300"
                        />
                      </td>
                    )}
                    <td className="px-6 py-4">{request.salesOrder}</td>
                    <td className="px-6 py-4">{request.orderType}</td>
                    <td className="px-6 py-4">{(request.netValue || 0).toLocaleString()}</td>
                    <td className="px-6 py-4">{request.customer}</td>
                    <td className="px-6 py-4">{request.discountPercentage}%</td>
                    <td className="px-6 py-4">{(request.discountAmount || 0).toLocaleString()}</td>
                    <td className="px-6 py-4">{(request.finalValue || 0).toLocaleString()}</td>
                    <td className="px-6 py-4">{request.requestedBy}</td>
                    {status === STATUS.APPROVED && (
                      <>
                        <td className="px-6 py-4">{request.approvedBy}</td>
                        <td className="px-6 py-4">
                          {new Date(request.approvalDate).toLocaleString()}
                        </td>
                      </>
                    )}
                    {status === STATUS.REJECTED && (
                      <>
                        <td className="px-6 py-4">{request.approvedBy}</td>
                        <td className="px-6 py-4">
                          {new Date(request.approvalDate).toLocaleString()}
                        </td>
                        <td className="px-6 py-4">{request.rejectionReason}</td>
                      </>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ApproverInterface;