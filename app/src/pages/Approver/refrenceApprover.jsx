// import { useState, useEffect } from 'react';
// import { Check, X } from 'lucide-react';
// import { useLocation, Link } from 'react-router-dom';

// export const ApproverInterface = () => {
//   const [requests, setRequests] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedRequests, setSelectedRequests] = useState({});
//   const location = useLocation();

//   // Determine the status filter based on URL
//   const getStatusFromPath = () => {
//     if (location.pathname.includes('/approved')) return 'APPROVED';
//     if (location.pathname.includes('/rejected')) return 'REJECTED';
//     return 'PENDING_APPROVAL';
//   };

//   const status = getStatusFromPath();

//   useEffect(() => {
//     fetchRequests();
//   }, [location.pathname]);

//   const fetchRequests = async () => {
//     try {
//       const response = await fetch(`http://localhost:5000/api/discount-requests?status=${status}`);
//       const data = await response.json();
//       setRequests(data);
//     } catch (error) {
//       console.error('Error fetching requests:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleStatusUpdate = async (requestId, status, rejectionReason = '') => {
//     try {
//       const response = await fetch(`http://localhost:5000/api/discount-requests/${requestId}`, {
//         method: 'PATCH',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           status,
//           approvedBy: 'current_approver_email', // Replace with actual approver email
//           rejectionReason
//         }),
//       });

//       if (!response.ok) throw new Error('Failed to update status');
//       fetchRequests();
//     } catch (error) {
//       console.error('Error updating status:', error);
//     }
//   };

//   const getStatusBadgeColor = (status) => {
//     switch (status) {
//       case 'APPROVED': return 'bg-green-100 text-green-800';
//       case 'REJECTED': return 'bg-red-100 text-red-800';
//       default: return 'bg-yellow-100 text-yellow-800';
//     }
//   };

//   if (loading) {
//     return <div className="p-6">Loading...</div>;
//   }

//   return (
//     <div className="p-6">
//       <div className="mb-6">
//         <h1 className="text-2xl font-bold mb-4">Discount Approval Dashboard</h1>
//         <div className="flex space-x-4">
//           <Link
//             to="/approver/discount"
//             className={`px-4 py-2 rounded ${status === 'PENDING_APPROVAL' ? 'bg-[#059B9A] text-white' : 'bg-gray-100'}`}
//           >
//             Pending
//           </Link>
//           <Link
//             to="/approver/discount/approved"
//             className={`px-4 py-2 rounded ${status === 'APPROVED' ? 'bg-[#059B9A] text-white' : 'bg-gray-100'}`}
//           >
//             Approved
//           </Link>
//           <Link
//             to="/approver/discount/rejected"
//             className={`px-4 py-2 rounded ${status === 'REJECTED' ? 'bg-[#059B9A] text-white' : 'bg-gray-100'}`}
//           >
//             Rejected
//           </Link>
//         </div>
//       </div>
      
//       <div className="overflow-x-auto bg-white rounded-lg shadow">
//         <table className="min-w-full">
//           <thead>
//             <tr className="bg-[#059B9A] text-white">
//               {status === 'PENDING_APPROVAL' && (
//                 <th className="px-6 py-3 text-left">Select</th>
//               )}
//               <th className="px-6 py-3 text-left">Sales Order</th>
//               <th className="px-6 py-3 text-left">Order Type</th>
//               <th className="px-6 py-3 text-left">Net Value</th>
//               <th className="px-6 py-3 text-left">Customer</th>
//               <th className="px-6 py-3 text-left">Discount %</th>
//               <th className="px-6 py-3 text-left">Discount Amount</th>
//               <th className="px-6 py-3 text-left">Final Value</th>
//               <th className="px-6 py-3 text-left">Requested By</th>
//               {status === 'APPROVED' && (
//                 <>
//                   <th className="px-6 py-3 text-left">Approved By</th>
//                   <th className="px-6 py-3 text-left">Approval Date</th>
//                 </>
//               )}
//               {status === 'REJECTED' && (
//                 <>
//                   <th className="px-6 py-3 text-left">Rejected By</th>
//                   <th className="px-6 py-3 text-left">Rejection Date</th>
//                   <th className="px-6 py-3 text-left">Reason</th>
//                 </>
//               )}
//               {status === 'PENDING_APPROVAL' && (
//                 <th className="px-6 py-3 text-left">Actions</th>
//               )}
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-200">
//             {requests.map((request) => (
//               <tr key={request._id}>
//                 {status === 'PENDING_APPROVAL' && (
//                   <td className="px-6 py-4">
//                     <input
//                       type="checkbox"
//                       checked={selectedRequests[request._id] || false}
//                       onChange={() => setSelectedRequests(prev => ({
//                         ...prev,
//                         [request._id]: !prev[request._id]
//                       }))}
//                       className="rounded border-gray-300"
//                     />
//                   </td>
//                 )}
//                 <td className="px-6 py-4">{request.salesOrder}</td>
//                 <td className="px-6 py-4">{request.orderType}</td>
//                 <td className="px-6 py-4">{(request.netValue || 0).toLocaleString()}</td>
//                 <td className="px-6 py-4">{request.customer}</td>
//                 <td className="px-6 py-4">{request.discountPercentage}%</td>
//                 <td className="px-6 py-4">{(request.discountAmount || 0).toLocaleString()}</td>
//                 <td className="px-6 py-4">{(request.finalValue || 0).toLocaleString()}</td>
//                 <td className="px-6 py-4">{request.requestedBy}</td>
//                 {status === 'APPROVED' && (
//                   <>
//                     <td className="px-6 py-4">{request.approvedBy}</td>
//                     <td className="px-6 py-4">
//                       {new Date(request.approvalDate).toLocaleString()}
//                     </td>
//                   </>
//                 )}
//                 {status === 'REJECTED' && (
//                   <>
//                     <td className="px-6 py-4">{request.approvedBy}</td>
//                     <td className="px-6 py-4">
//                       {new Date(request.approvalDate).toLocaleString()}
//                     </td>
//                     <td className="px-6 py-4">{request.rejectionReason}</td>
//                   </>
//                 )}
//                 {status === 'PENDING_APPROVAL' && (
//                   <td className="px-6 py-4">
//                     <div className="flex space-x-2">
//                       <button
//                         onClick={() => handleStatusUpdate(request._id, 'APPROVED')}
//                         className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600"
//                         title="Approve"
//                       >
//                         <Check className="w-4 h-4" />
//                       </button>
//                       <button
//                         onClick={() => {
//                           const reason = prompt('Enter rejection reason:');
//                           if (reason) handleStatusUpdate(request._id, 'REJECTED', reason);
//                         }}
//                         className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
//                         title="Reject"
//                       >
//                         <X className="w-4 h-4" />
//                       </button>
//                     </div>
//                   </td>
//                 )}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default ApproverInterface;