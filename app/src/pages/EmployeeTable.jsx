import { useState, useEffect } from 'react';
import { Trash2, Plus } from 'lucide-react';

const Employee = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = '/api/http/sapEmp';

  const credentials = {
    username: "sb-4296f727-af6d-490d-af58-04e8ba9b54da!b346287|it-rt-ffbe0cc5trial!b55215",
    password: "89bb41df-35b1-4f8a-b3bd-bc5e48e72ff4$K6cH1ODWwjbZIpFFr339e23iOHKxVAOShKUghBKePog=",
  };

  const fetchData = async () => {
    try {
      const response = await fetch(API_URL, {
        method: 'GET',
        headers: {
          'Authorization': 'Basic ' + btoa(`${credentials.username}:${credentials.password}`),
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const jsonData = await response.json();
      console.log('Raw API Response:', jsonData);

      if (jsonData.employees && Array.isArray(jsonData.employees)) {
        setData(jsonData.employees);
      } else {
        setData([]);
        console.warn('No employees array found in response');
      }
      setLoading(false);

    } catch (err) {
      console.error('Fetch error:', err);
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      fetchData();
    }
    return () => {
      isMounted = false;
    };
  }, []);

  const handleDelete = async (empNo, Empname) => {
    try {
      const response = await fetch(`${API_URL}(Empno=${empNo},Empname='${Empname}')`, {
        method: 'DELETE',
        headers: {
          'Authorization': 'Basic ' + btoa(`${credentials.username}:${credentials.password}`),
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Refresh the data after successful deletion
      fetchData();
    } catch (err) {
      console.error('Delete error:', err);
      setError('Failed to delete employee');
    }
  };

  const handleAddNew = () => {
    // Navigate to add employee form or open modal
    console.log('Add new employee clicked');
    // You can implement your own navigation or modal logic here
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl text-red-600">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Employee Details ({data.length} employees)</h2>
        <button
          onClick={handleAddNew}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <Plus size={20} />
          Add New Employee
        </button>
      </div>
      <div className="overflow-x-auto">
        {data.length > 0 ? (
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Employee No
                </th>
                <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Designation
                </th>
                <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Department No
                </th>
                <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {data.map((employee) => (
                <tr key={employee.Empno} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {employee.Empno}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {employee.Empname}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {employee.Emdesign}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {employee.Depno}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {employee.EmpLo}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <button
                      onClick={() => handleDelete(employee.Empno, employee.Empname)}
                      className="text-red-600 hover:text-red-800 transition-colors"
                      title="Delete Employee"
                    >
                      <Trash2 size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center text-gray-600">No employee data available.</div>
        )}
      </div>
    </div>
  );
};

export default Employee;