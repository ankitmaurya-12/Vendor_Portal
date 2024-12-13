import { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash2, UserPlus } from 'lucide-react';
import { Header } from '../Components/Header';

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <Header/>
      <div className="bg-white p-6 rounded-lg shadow-xl">
        <h3 className="text-lg font-semibold mb-4">Confirm Deletion</h3>
        <p className="mb-6">Are you sure you want to delete this employee?</p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

const EmployeeTable = () => {
  const [employees, setEmployees] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [csrfToken, setCsrfToken] = useState('');
  const [deleteModal, setDeleteModal] = useState({ show: false, employeeId: null });
  const [newEmployee, setNewEmployee] = useState({
    Empno: '',
    Empname: '',
    Emdesign: '',
    Depno: '',
    EmpLo: ''
  });

  useEffect(() => {
    fetchCsrfToken();
  }, []);

  const fetchCsrfToken = async () => {
    try {
      const credentials = btoa('iws_consult:Support@123');
      const response = await axios({
        method: 'GET',
        url: '/sap/opu/odata/sap/ZRS_CURD1_SRV_01/EmployeeDetailsSet',
        headers: {
          'X-CSRF-Token': 'Fetch',
          'Authorization': `Basic ${credentials}`,
          'Accept': 'application/json'
        }
      });
      
      const token = response.headers['x-csrf-token'];
      setCsrfToken(token);
      fetchEmployees(token);
    } catch (error) {
      console.error('Error fetching CSRF token:', error);
    }
  };

  const fetchEmployees = async (token) => {
    try {
      const credentials = btoa('iws_consult:Support@123');
      const response = await axios({
        method: 'GET',
        url: '/sap/opu/odata/sap/ZRS_CURD1_SRV_01/EmployeeDetailsSet',
        headers: {
          'X-CSRF-Token': token,
          'Authorization': `Basic ${credentials}`,
          'Accept': 'application/json'
        }
      });
      setEmployees(response.data.d.results);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.type === 'number' ? parseInt(e.target.value) : e.target.value;
    setNewEmployee({
      ...newEmployee,
      [e.target.name]: value
    });
  };

  const handleSubmit = async () => {
    const isDuplicate = employees.some(emp => emp.Empno === parseInt(newEmployee.Empno));
    if (isDuplicate) {
      console.warn('Employee ID already exists');
      return;
    }

    try {
      const credentials = btoa('iws_consult:Support@123');
      const formattedData = {
        Empno: parseInt(newEmployee.Empno),
        Empname: newEmployee.Empname,
        Emdesign: newEmployee.Emdesign,
        Depno: parseInt(newEmployee.Depno),
        EmpLo: newEmployee.EmpLo
      };

      await axios({
        method: 'POST',
        url: '/sap/opu/odata/sap/ZRS_CURD1_SRV_01/EmployeeDetailsSet',
        headers: {
          'X-CSRF-Token': csrfToken,
          'Authorization': `Basic ${credentials}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        data: JSON.stringify(formattedData)
      });
      
      fetchEmployees(csrfToken);
      
      setNewEmployee({
        Empno: '',
        Empname: '',
        Emdesign: '',
        Depno: '',
        EmpLo: ''
      });
      
      setShowAddForm(false);
    } catch (error) {
      console.error('Error adding employee:', error);
    }
  };

  const handleDelete = async (employeeId, employeeName) => {
    try {
      const credentials = btoa('iws_consult:Support@123');
      await axios({
        method: 'DELETE',
        url: `/sap/opu/odata/sap/ZRS_CURD1_SRV_01/EmployeeDetailsSet(Empno=${employeeId},Empname='${employeeName}')`,
        headers: {
          'X-CSRF-Token': csrfToken,
          'Authorization': `Basic ${credentials}`,
        }
      });
      
      fetchEmployees(csrfToken);
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  
  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <button 
            className="flex items-center gap-2 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors mt-12"
            onClick={() => setShowAddForm(true)}
          >
            <UserPlus className="w-5 h-5" />
            Add New Employee
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Employee No</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Designation</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Department No</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Location</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {showAddForm && (
                <tr className="border-t">
                  <td className="px-6 py-4">
                    <input
                      type="number"
                      name="Empno"
                      value={newEmployee.Empno}
                      onChange={handleInputChange}
                      placeholder="Employee No"
                      className="w-full px-3 py-2 border rounded"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <input
                      type="text"
                      name="Empname"
                      value={newEmployee.Empname}
                      onChange={handleInputChange}
                      placeholder="Name"
                      className="w-full px-3 py-2 border rounded"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <input
                      type="text"
                      name="Emdesign"
                      value={newEmployee.Emdesign}
                      onChange={handleInputChange}
                      placeholder="Designation"
                      className="w-full px-3 py-2 border rounded"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <input
                      type="number"
                      name="Depno"
                      value={newEmployee.Depno}
                      onChange={handleInputChange}
                      placeholder="Department No"
                      className="w-full px-3 py-2 border rounded"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <input
                      type="text"
                      name="EmpLo"
                      value={newEmployee.EmpLo}
                      onChange={handleInputChange}
                      placeholder="Location"
                      className="w-full px-3 py-2 border rounded"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <button 
                      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                      onClick={handleSubmit}
                    >
                      Save
                    </button>
                  </td>
                </tr>
              )}
              {employees.map((employee) => (
                <tr key={employee.Empno} className="border-t hover:bg-gray-50">
                  <td className="px-6 py-4">{employee.Empno}</td>
                  <td className="px-6 py-4">{employee.Empname}</td>
                  <td className="px-6 py-4">{employee.Emdesign}</td>
                  <td className="px-6 py-4">{employee.Depno}</td>
                  <td className="px-6 py-4">{employee.EmpLo}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => setDeleteModal({ show: true, employeeId: employee.Empno, employeeName: employee.Empname })}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <DeleteConfirmationModal
          isOpen={deleteModal.show}
          onClose={() => setDeleteModal({ show: false, employeeId: null })}
          onConfirm={() => {
            handleDelete(deleteModal.employeeId, deleteModal.employeeName);
            setDeleteModal({ show: false, employeeId: null });
          }}
        />
      </div>
    </>
  );
};

export default EmployeeTable;