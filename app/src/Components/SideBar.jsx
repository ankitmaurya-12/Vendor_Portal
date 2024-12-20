import Link from 'react-router-dom';
import { Home, Users, Boxes as BoxesIcon, FileText, Settings } from 'lucide-react';


function SideBar() {
  return (
    <div>
       <aside className="w-64 bg-white h-screen shadow pt-6">
          
          <nav className="space-y-2 px-4">
            <Link to="/dashboard" className="flex items-center px-3 py-2 rounded-md text-blue-600 bg-blue-50">
              <Home className="mr-3 h-5 w-5" />
              Dashboard
            </Link>
            <Link to="/people" className="flex items-center px-3 py-2 rounded-md text-gray-600 hover:bg-gray-100">
              <Users className="mr-3 h-5 w-5" />
              People
            </Link>
            <Link to="/vendors" className="flex items-center px-3 py-2 rounded-md text-gray-600 hover:bg-gray-100">
              <Users className="mr-3 h-5 w-5" />
              Vendors
            </Link>
            <Link to="/products" className="flex items-center px-3 py-2 rounded-md text-gray-600 hover:bg-gray-100">
              <BoxesIcon className="mr-3 h-5 w-5" />
              Products
            </Link>
            <Link to="/contracts" className="flex items-center px-3 py-2 rounded-md text-gray-600 hover:bg-gray-100">
              <FileText className="mr-3 h-5 w-5" />
              Contracts
            </Link>
            <Link to="/settings" className="flex items-center px-3 py-2 rounded-md text-gray-600 hover:bg-gray-100">
              <Settings className="mr-3 h-5 w-5" />
              Settings
            </Link>
          </nav>
        </aside>
    </div>
  )
}

export default SideBar
